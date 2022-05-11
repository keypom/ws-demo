import { __awaiter } from "tslib";
import isMobile from "is-mobile";
import { waitFor, } from "@near-wallet-selector/core";
const isInstalled = () => {
    return waitFor(() => { var _a; return !!((_a = window.near) === null || _a === void 0 ? void 0 : _a.isSender); }).catch(() => false);
};
const setupSenderState = () => {
    const wallet = window.near;
    return {
        wallet,
    };
};
const Sender = ({ options, metadata, emitter, logger, }) => __awaiter(void 0, void 0, void 0, function* () {
    const _state = setupSenderState();
    const cleanup = () => {
        for (const key in _state.wallet.callbacks) {
            _state.wallet.remove(key);
        }
    };
    const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!_state.wallet.isSignedIn()) {
            return;
        }
        cleanup();
        const res = yield _state.wallet.signOut();
        if (res === true) {
            return;
        }
        const error = new Error(typeof res.error === "string" ? res.error : res.error.type);
        // Prevent disconnecting by throwing.
        if (error.message === "User reject") {
            throw error;
        }
        // Continue disconnecting but log out the issue.
        logger.log("Failed to disconnect");
        logger.error(error);
    });
    const setupEvents = () => {
        _state.wallet.on("accountChanged", (newAccountId) => __awaiter(void 0, void 0, void 0, function* () {
            logger.log("Sender:onAccountChange", newAccountId);
            emitter.emit("disconnected", null);
        }));
        _state.wallet.on("rpcChanged", ({ rpc }) => __awaiter(void 0, void 0, void 0, function* () {
            logger.log("Sender:onNetworkChange", rpc);
            if (options.network.networkId !== rpc.networkId) {
                yield disconnect();
                emitter.emit("disconnected", null);
                emitter.emit("networkChanged", { networkId: rpc.networkId });
            }
        }));
    };
    const getAccounts = () => {
        const accountId = _state.wallet.getAccountId();
        if (!accountId) {
            return [];
        }
        return [{ accountId }];
    };
    const isValidActions = (actions) => {
        return actions.every((x) => x.type === "FunctionCall");
    };
    const transformActions = (actions) => {
        const validActions = isValidActions(actions);
        if (!validActions) {
            throw new Error(`Only 'FunctionCall' actions types are supported by ${metadata.name}`);
        }
        return actions.map((x) => x.params);
    };
    const transformTransactions = (transactions) => {
        return transactions.map((transaction) => {
            return {
                receiverId: transaction.receiverId,
                actions: transformActions(transaction.actions),
            };
        });
    };
    if (_state.wallet.isSignedIn()) {
        setupEvents();
    }
    return {
        connect() {
            return __awaiter(this, void 0, void 0, function* () {
                const existingAccounts = getAccounts();
                if (existingAccounts.length) {
                    return existingAccounts;
                }
                const { accessKey, error } = yield _state.wallet.requestSignIn({
                    contractId: options.contractId,
                    methodNames: options.methodNames,
                });
                if (!accessKey || error) {
                    yield disconnect();
                    throw new Error((typeof error === "string" ? error : error.type) ||
                        "Failed to connect");
                }
                setupEvents();
                return getAccounts();
            });
        },
        disconnect,
        getAccounts() {
            return __awaiter(this, void 0, void 0, function* () {
                return getAccounts();
            });
        },
        signAndSendTransaction({ signerId, receiverId = options.contractId, actions, }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("Sender:signAndSendTransaction", {
                    signerId,
                    receiverId,
                    actions,
                });
                if (!_state.wallet.isSignedIn()) {
                    throw new Error("Wallet not connected");
                }
                return _state.wallet
                    .signAndSendTransaction({
                    receiverId,
                    actions: transformActions(actions),
                })
                    .then((res) => {
                    var _a;
                    if (res.error) {
                        throw new Error(res.error);
                    }
                    // Shouldn't happen but avoids inconsistent responses.
                    if (!((_a = res.response) === null || _a === void 0 ? void 0 : _a.length)) {
                        throw new Error("Invalid response");
                    }
                    return res.response[0];
                });
            });
        },
        signAndSendTransactions({ transactions }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("Sender:signAndSendTransactions", { transactions });
                if (!_state.wallet.isSignedIn()) {
                    throw new Error("Wallet not connected");
                }
                return _state.wallet
                    .requestSignTransactions({
                    transactions: transformTransactions(transactions),
                })
                    .then((res) => {
                    var _a;
                    if (res.error) {
                        throw new Error(res.error);
                    }
                    // Shouldn't happen but avoids inconsistent responses.
                    if (!((_a = res.response) === null || _a === void 0 ? void 0 : _a.length)) {
                        throw new Error("Invalid response");
                    }
                    return res.response;
                });
            });
        },
    };
});
export function setupSender({ iconUrl = "./assets/sender-icon.png", } = {}) {
    return () => __awaiter(this, void 0, void 0, function* () {
        const mobile = isMobile();
        const installed = yield isInstalled();
        if (mobile || !installed) {
            return null;
        }
        // Add extra wait to ensure Sender's sign in status is read from the
        // browser extension background env.
        yield waitFor(() => { var _a; return !!((_a = window.near) === null || _a === void 0 ? void 0 : _a.isSignedIn()); }, { timeout: 300 }).catch(() => false);
        return {
            id: "sender",
            type: "injected",
            metadata: {
                name: "Sender",
                description: null,
                iconUrl,
                downloadUrl: "https://chrome.google.com/webstore/detail/sender-wallet/epapihdplajcdnnkdeiahlgigofloibg",
            },
            init: Sender,
        };
    });
}
//# sourceMappingURL=sender.js.map