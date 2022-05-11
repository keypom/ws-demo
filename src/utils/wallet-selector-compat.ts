import { setupWalletSelector } from "../lib/core";
import { setupNearWallet } from "../lib/near-wallet";
import { setupSender } from "../lib/sender";
import * as nearAPI from "near-api-js";
import BN from "bn.js";
import { nearWalletIcon, senderWalletIcon } from "./assets/icons";
import { setupMetaMask } from './metamask/metamask'

const {
	Near, Account,
	keyStores: { BrowserLocalStorageKeyStore }
} = nearAPI

let network, contractId, selector, wallet, init, accountId, near;

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

	selector.store.observable.subscribe(async (state) => {
		const newAccountId = state.accounts[0]?.accountId
		if (newAccountId && newAccountId !== accountId) {
			accountId = newAccountId
			wallet = await selector.wallet()
			onAccountChange(accountId);
		}
	})

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
		selector.show()
	}

	selector.signOut = async () => {
		await wallet.disconnect().catch((err) => {
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

// export const signAndSendTransactions = async ({
// 	transactions,
// }: WalletMethodArgs) => {
// 	if (!selector) {
// 		throw new Error("functionCall error: selector not initialized");
// 	}
// 	if (!wallet) {
// 		throw new Error("functionCall error: no wallet selected");
// 	}

// 	/// TODO conver transactions to wallet-selector type

// 	return wallet.signAndSendTransactions({
// 		transactions: [
// 			{
// 				receiverId: _contractId || contractId,
// 				actions: [
// 					{
// 						type: "FunctionCall",
// 						params: {
// 							methodName,
// 							args,
// 							gas: gas?.toString() || "30000000000000",
// 							deposit: attachedDeposit?.toString() || "0",
// 						},
// 					},
// 				],
// 			}
// 		]
// 	});
// };


