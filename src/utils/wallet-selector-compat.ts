import { setupWalletSelector } from "../../../near-wallet-selector/dist/packages/core";
import { setupNearWallet } from "../../../near-wallet-selector/dist/packages/near-wallet";
import { setupSender } from "../../../near-wallet-selector/dist/packages/sender";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { nearWalletIcon, senderWalletIcon } from "./assets/icons";
import { setupMetaMask } from './metamask/metamask'

const {
	Near, Account,
	keyStores: { BrowserLocalStorageKeyStore }
} = nearAPI

let network, contractId, selector, init, accountId, near;

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
		wallets: [
			setupNearWallet({
				iconUrl: nearWalletIcon,
			}),
			setupSender({
				iconUrl: senderWalletIcon,
			}),
			setupMetaMask({
				iconUrl: nearWalletIcon
			})
		],
	});

	selector.on("accountsChanged", (e) => {
		accountId = e.accounts[0]?.accountId;
		if (accountId) {
			onAccountChange(accountId);
		}
	});

	const defaultAccountId = (await selector.getAccounts())?.[0]?.accountId;
	if (defaultAccountId) accountId = defaultAccountId;

	await onAccountChange(accountId);

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
	contractId,
	methodName,
	args = {},
}: WalletMethodArgs) => {
	if (!contractId) {
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
		throw new Error("selector not initialized");
	}
	if (!_contractId && !contractId) {
		throw new Error("functionCall error: contractId undefined");
	}
	if (!methodName) {
		throw new Error("functionCall error: methodName undefined");
	}

	return selector.signAndSendTransaction({
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
