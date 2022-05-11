import { __awaiter } from "tslib";
import { transactions as nearTransactions, utils } from "near-api-js";
import isMobile from "is-mobile";
import { transformActions, waitFor, } from "@near-wallet-selector/core";
const isInstalled = () => {
    return waitFor(() => !!window.nearWalletApi).catch(() => false);
};
const setupMathWalletState = (contractId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = window.nearWalletApi;
    // This wallet currently has weird behaviour regarding signer.account.
    // - When you initially sign in, you get a SignedInAccount interface.
    // - When the extension loads after this, you get a PreviouslySignedInAccount interface.
    // This method normalises the behaviour to only return the SignedInAccount interface.
    if (wallet.signer.account && "address" in wallet.signer.account) {
        yield wallet.login({ contractId });
    }
    return {
        wallet,
    };
});
const MathWallet = ({ options, provider, logger, }) => __awaiter(void 0, void 0, void 0, function* () {
    const _state = yield setupMathWalletState(options.contractId);
    const getSignedInAccount = () => {
        if (_state.wallet.signer.account &&
            "accountId" in _state.wallet.signer.account) {
            return _state.wallet.signer.account;
        }
        return null;
    };
    const getAccounts = () => {
        const account = getSignedInAccount();
        if (!account) {
            return [];
        }
        return [{ accountId: account.accountId }];
    };
    return {
        connect() {
            return __awaiter(this, void 0, void 0, function* () {
                const existingAccounts = getAccounts();
                if (existingAccounts.length) {
                    return existingAccounts;
                }
                yield _state.wallet.login({ contractId: options.contractId });
                return getAccounts();
            });
        },
        disconnect() {
            return __awaiter(this, void 0, void 0, function* () {
                // Ignore if unsuccessful (returns false).
                yield _state.wallet.logout();
            });
        },
        getAccounts() {
            return __awaiter(this, void 0, void 0, function* () {
                return getAccounts();
            });
        },
        signAndSendTransaction({ signerId, receiverId = options.contractId, actions, }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("MathWallet:signAndSendTransaction", {
                    signerId,
                    receiverId,
                    actions,
                });
                const account = getSignedInAccount();
                if (!account) {
                    throw new Error("Wallet not connected");
                }
                const { accountId, publicKey } = account;
                const [block, accessKey] = yield Promise.all([
                    provider.block({ finality: "final" }),
                    provider.viewAccessKey({ accountId, publicKey }),
                ]);
                logger.log("MathWallet:signAndSendTransaction:block", block);
                logger.log("MathWallet:signAndSendTransaction:accessKey", accessKey);
                const transaction = nearTransactions.createTransaction(accountId, utils.PublicKey.from(publicKey), receiverId, accessKey.nonce + 1, transformActions(actions), utils.serialize.base_decode(block.header.hash));
                const [hash, signedTx] = yield nearTransactions.signTransaction(transaction, _state.wallet.signer, accountId);
                logger.log("MathWallet:signAndSendTransaction:hash", hash);
                return provider.sendTransaction(signedTx);
            });
        },
        signAndSendTransactions({ transactions }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("MathWallet:signAndSendTransactions", { transactions });
                const account = getSignedInAccount();
                if (!account) {
                    throw new Error("Wallet not connected");
                }
                const { accountId, publicKey } = account;
                const [block, accessKey] = yield Promise.all([
                    provider.block({ finality: "final" }),
                    provider.viewAccessKey({ accountId, publicKey }),
                ]);
                logger.log("MathWallet:signAndSendTransactions:block", block);
                logger.log("MathWallet:signAndSendTransactions:accessKey", accessKey);
                const signedTransactions = [];
                let nonce = accessKey.nonce;
                for (let i = 0; i < transactions.length; i++) {
                    const transaction = nearTransactions.createTransaction(accountId, utils.PublicKey.from(publicKey), transactions[i].receiverId, ++nonce, transformActions(transactions[i].actions), utils.serialize.base_decode(block.header.hash));
                    const [hash, signedTx] = yield nearTransactions.signTransaction(transaction, _state.wallet.signer, accountId);
                    logger.log("MathWallet:signAndSendTransactions:hash", hash);
                    signedTransactions.push(signedTx);
                }
                logger.log("MathWallet:signAndSendTransactions:signedTransactions", signedTransactions);
                return Promise.all(signedTransactions.map((tx) => provider.sendTransaction(tx)));
            });
        },
    };
});
export const setupMathWallet = ({ iconUrl = "./assets/math-wallet-icon.png", } = {}) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        const mobile = isMobile();
        const installed = yield isInstalled();
        if (mobile || !installed) {
            return null;
        }
        return {
            id: "math-wallet",
            type: "injected",
            metadata: {
                name: "Math Wallet",
                description: null,
                iconUrl,
                downloadUrl: "https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc",
            },
            init: MathWallet,
        };
    });
};
//# sourceMappingURL=math-wallet.js.map