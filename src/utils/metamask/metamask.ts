import isMobile from "is-mobile";
import {
	WalletModule,
	InjectedWallet,
	Action,
	Optional,
	Transaction,
	FunctionCallAction,
	WalletBehaviourFactory,
} from "../../../../near-wallet-selector/dist/packages/core";
import { getNear, signIn, signOut } from "./neth";

declare global {
	interface Window {
		ethereum: { chainId: string };
	}
}

export interface MetaMaskParams {
	iconUrl?: string;
}

const MetaMask: WalletBehaviourFactory<InjectedWallet> = ({
	options,
	metadata,
	emitter,
	logger,
}) => {

	const isInstalled = () => {
		return !!window.ethereum;
	};

	const timeout = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const isValidActions = (
		actions: Array<Action>
	): actions is Array<FunctionCallAction> => {
		return actions.every((x) => x.type === "FunctionCall");
	};

	const transformActions = (actions: Array<Action>) => {
		const validActions = isValidActions(actions);

		if (!validActions) {
			throw new Error(
				`Only 'FunctionCall' actions types are supported by ${metadata.name}`
			);
		}

		return actions.map((x) => x.params);
	};

	const transformTransactions = (
		transactions: Array<Optional<Transaction, "signerId">>
	) => {
		return transactions.map((transaction) => {
			return {
				receiverId: transaction.receiverId,
				actions: transformActions(transaction.actions),
			};
		});
	};

	// return the wallet interface for wallet-selector

	return {
		getDownloadUrl() {
			return "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";
		},

		async isAvailable() {
			return isInstalled() && !isMobile();
		},

		async connect() {
			await timeout(200);

			if (!isInstalled()) {
				throw new Error("Wallet not installed");
			}

			const existingAccounts = await signIn();

			if (existingAccounts.length) {
				emitter.emit("connected", { accounts: existingAccounts });
				return existingAccounts;
			}

			// const { keyPair: accessKey, error } = await signIn();

			// if (!accessKey || error) {
			// 	await disconnect();

			// 	throw new Error(
			// 		(typeof error === "string" ? error : error.type) ||
			// 		"Failed to connect"
			// 	);
			// }

			// const newAccounts = getAccounts();
			// emitter.emit("connected", { accounts: newAccounts });

			return existingAccounts;
		},

		async disconnect() {
			await signOut()
		},

		async getAccounts() {
			const { accountId } = await getNear();
			return [accountId]
		},

		async signAndSendTransaction({
			signerId,
			receiverId = options.contractId,
			actions,
		}) {
			logger.log("MetaMask:signAndSendTransaction", {
				signerId,
				receiverId,
				actions,
			});

			const wallet = getNear();

			return wallet
				.signAndSendTransaction({
					receiverId,
					actions: transformActions(actions),
				})
				.then((res) => {
					if (res.error) {
						throw new Error(res.error);
					}

					// Shouldn't happen but avoids inconsistent responses.
					if (!res.response?.length) {
						throw new Error("Invalid response");
					}

					return res.response[0];
				});
		},

		async signAndSendTransactions({ transactions }) {
			logger.log("MetaMask:signAndSendTransactions", { transactions });

			const wallet = getNear();

			return wallet
				.requestSignTransactions({
					transactions: transformTransactions(transactions),
				})
				.then((res) => {
					if (res.error) {
						throw new Error(res.error);
					}

					// Shouldn't happen but avoids inconsistent responses.
					if (!res.response?.length) {
						throw new Error("Invalid response");
					}

					return res.response;
				});
		},
	};
};

export function setupMetaMask({
	iconUrl = "./assets/sender-icon.png",
}: MetaMaskParams = {}): WalletModule<InjectedWallet> {
	return {
		id: "metamask",
		type: "injected",
		name: "Sender",
		description: null,
		iconUrl,
		wallet: MetaMask,
	};
}