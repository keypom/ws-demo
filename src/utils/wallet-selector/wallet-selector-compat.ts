
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupModal } from "@near-wallet-selector/modal-ui";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { nearWalletIcon, senderWalletIcon } from "./assets/icons";
import { setupKeypom } from '../../lib/lib/keypom'

import './modal-ui.css'

const {
	Near, Account,
	keyStores: { BrowserLocalStorageKeyStore }
} = nearAPI

let network, contractId, selector, modal, wallet, init, accountId, near;

const networks = {
	mainnet: {
		networkId: 'mainnet',
		nodeUrl: 'https://rpc.mainnet.near.org',
		walletUrl: 'https://wallet.near.org',
		helperUrl: 'https://helper.mainnet.near.org'
	},
	testnet: {
		networkId: 'testnet',
		nodeUrl: 'https://rpc.testnet.near.org',
		walletUrl: 'https://wallet.testnet.near.org',
		helperUrl: 'https://helper.testnet.near.org'
	}
}

interface WalletMethodArgs {
	signerId?: string;
	contractId?: string;
	methodName?: string;
	args?: any;
	gas?: string | BN;
	attachedDeposit?: string | BN;
}

interface GetWalletSelectorArgs {
	networkId: string,
	contractId: string | null,
	onAccountChange: (accountId: string | null) => void;
}

export const getSelector = async ({
	networkId,
	contractId: _contractId,
	onAccountChange,
}: GetWalletSelectorArgs) => {
	if (init) return selector;
	init = true;

	network = networkId;
	contractId = _contractId;

	selector = await setupWalletSelector({
		network,
		contractId,
		debug: 'true',
		modules: [
			setupMyNearWallet(),
			setupKeypom()
		],
	});

	wallet = await selector.wallet('keypom')

	// await wallet.getAccounts()

	selector.store.observable.subscribe(async (state) => {
		const newAccountId = state.accounts[0]?.accountId
		if (newAccountId && newAccountId !== accountId) {
			accountId = newAccountId
			wallet = await selector.wallet()
			onAccountChange(accountId);
		}
	})

    modal = setupModal(selector, { contractId });

	let defaultAccountId
	try {
		wallet = await selector.wallet()
		defaultAccountId = (await wallet?.getAccounts())?.[0]?.accountId;
	} catch(e) {
		console.warn(e)
		if (!/No wallet/.test(e)) throw e
	}
	if (defaultAccountId) {
		accountId = defaultAccountId;
	}
	await onAccountChange(accountId);

	selector.signIn = () => {
		modal.show()
	}

	selector.signOut = async () => {
		await wallet.signOut().catch((err) => {
			console.log("Failed to disconnect wallet-selector");
			console.error(err);
		});
		window.location.reload()
	}

	return selector;
}

export const getNear = () => {
	if (!near) {
		near = new Near({
			...networks[network],
			deps: { keyStore: new BrowserLocalStorageKeyStore() },
		});
	}
	return near;
};

export const getAccount = async (viewAsAccountId: string | null) => {
	near = getNear();
	return new Account(near.connection, viewAsAccountId || accountId);
};

export const viewFunction = async ({
	contractId: _contractId,
	methodName,
	args = {},
}: WalletMethodArgs) => {
	if (!_contractId && !contractId) {
		throw new Error("viewFunction error: contractId undefined");
	}
	if (!methodName) {
		throw new Error("viewFunction error: methodName undefined");
	}
	const account = await getAccount(network);
	return account.viewFunction(contractId, methodName, args)
};

export const functionCall = async ({
	contractId: _contractId,
	methodName,
	args,
	gas,
	attachedDeposit,
}: WalletMethodArgs) => {
	if (!selector) {
		throw new Error("functionCall error: selector not initialized");
	}
	if (!wallet) {
		throw new Error("functionCall error: no wallet selected");
	}
	if (!_contractId && !contractId) {
		throw new Error("functionCall error: contractId undefined");
	}
	if (!methodName) {
		throw new Error("functionCall error: methodName undefined");
	}

	return wallet.signAndSendTransaction({
		receiverId: _contractId || contractId,
		actions: [
			{
				type: "FunctionCall",
				params: {
					methodName,
					args,
					gas: gas?.toString() || "30000000000000",
					deposit: attachedDeposit?.toString() || "0",
				},
			},
		],
	});
};
