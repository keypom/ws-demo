import { __awaiter } from "tslib";
import { WalletConnection, connect, keyStores, utils } from "near-api-js";
import * as nearApi from "near-api-js";
import { transformActions, } from "@near-wallet-selector/core";
const getWalletUrl = (network, walletUrl) => {
    if (walletUrl) {
        return walletUrl;
    }
    switch (network.networkId) {
        case "mainnet":
            return "https://wallet.near.org";
        case "testnet":
            return "https://wallet.testnet.near.org";
        case "betanet":
            return "https://wallet.betanet.near.org";
        default:
            throw new Error("Invalid wallet url");
    }
};
const setupWalletState = (params, network) => __awaiter(void 0, void 0, void 0, function* () {
    const keyStore = new keyStores.BrowserLocalStorageKeyStore();
    const near = yield connect(Object.assign(Object.assign({ keyStore, walletUrl: getWalletUrl(network, params.walletUrl) }, network), { headers: {} }));
    const wallet = new WalletConnection(near, "near_app");
    // Cleanup up any pending keys (cancelled logins).
    if (!wallet.isSignedIn()) {
        yield keyStore.clear();
    }
    return {
        wallet,
        keyStore,
    };
});
const NearWallet = ({ options, params, logger }) => __awaiter(void 0, void 0, void 0, function* () {
    const _state = yield setupWalletState(params, options.network);
    const cleanup = () => {
        _state.keyStore.clear();
    };
    const getAccounts = () => {
        const accountId = _state.wallet.getAccountId();
        if (!accountId) {
            return [];
        }
        return [{ accountId }];
    };
    const transformTransactions = (transactions) => __awaiter(void 0, void 0, void 0, function* () {
        const account = _state.wallet.account();
        const { networkId, signer, provider } = account.connection;
        const localKey = yield signer.getPublicKey(account.accountId, networkId);
        return Promise.all(transactions.map((transaction, index) => __awaiter(void 0, void 0, void 0, function* () {
            const actions = transformActions(transaction.actions);
            const accessKey = yield account.accessKeyForTransaction(transaction.receiverId, actions, localKey);
            if (!accessKey) {
                throw new Error(`Failed to find matching key for transaction sent to ${transaction.receiverId}`);
            }
            const block = yield provider.block({ finality: "final" });
            return nearApi.transactions.createTransaction(account.accountId, utils.PublicKey.from(accessKey.public_key), transaction.receiverId, accessKey.access_key.nonce + index + 1, actions, utils.serialize.base_decode(block.header.hash));
        })));
    });
    return {
        connect() {
            return __awaiter(this, void 0, void 0, function* () {
                const existingAccounts = getAccounts();
                if (existingAccounts.length) {
                    return existingAccounts;
                }
                yield _state.wallet.requestSignIn({
                    contractId: options.contractId,
                    methodNames: options.methodNames,
                });
                return getAccounts();
            });
        },
        disconnect() {
            return __awaiter(this, void 0, void 0, function* () {
                if (_state.wallet.isSignedIn()) {
                    _state.wallet.signOut();
                }
                cleanup();
            });
        },
        getAccounts() {
            return __awaiter(this, void 0, void 0, function* () {
                return getAccounts();
            });
        },
        signAndSendTransaction({ signerId, receiverId = options.contractId, actions, }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("NearWallet:signAndSendTransaction", {
                    signerId,
                    receiverId,
                    actions,
                });
                if (!_state.wallet.isSignedIn()) {
                    throw new Error("Wallet not connected");
                }
                const account = _state.wallet.account();
                return account["signAndSendTransaction"]({
                    receiverId,
                    actions: transformActions(actions),
                }).then(() => {
                    // Suppress response since transactions with deposits won't actually
                    // return FinalExecutionOutcome.
                });
            });
        },
        signAndSendTransactions({ transactions }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("NearWallet:signAndSendTransactions", { transactions });
                if (!_state.wallet.isSignedIn()) {
                    throw new Error("Wallet not connected");
                }
                return _state.wallet.requestSignTransactions({
                    transactions: yield transformTransactions(transactions),
                });
            });
        },
    };
});
export function setupNearWallet({ walletUrl, iconUrl = "./assets/near-wallet-icon.png", } = {}) {
    return () => __awaiter(this, void 0, void 0, function* () {
        return {
            id: "near-wallet",
            type: "browser",
            metadata: {
                name: "NEAR Wallet",
                description: null,
                iconUrl,
            },
            init: (options) => {
                return NearWallet(Object.assign(Object.assign({}, options), { params: {
                        walletUrl,
                    } }));
            },
        };
    });
}
//# sourceMappingURL=near-wallet.js.map