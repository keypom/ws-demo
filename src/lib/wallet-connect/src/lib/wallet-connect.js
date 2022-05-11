import { __awaiter } from "tslib";
import WalletConnectClient from "./wallet-connect-client";
const setupWalletConnectState = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new WalletConnectClient();
    let session = null;
    yield client.init(params);
    if (client.session.topics.length) {
        session = yield client.session.get(client.session.topics[0]);
    }
    return {
        client,
        session,
        subscriptions: [],
    };
});
const WalletConnect = ({ options, params, emitter, logger }) => __awaiter(void 0, void 0, void 0, function* () {
    const _state = yield setupWalletConnectState(params);
    const getChainId = () => {
        if (params.chainId) {
            return params.chainId;
        }
        const { networkId } = options.network;
        if (["mainnet", "testnet", "betanet"].includes(networkId)) {
            return `near:${networkId}`;
        }
        throw new Error("Invalid chain id");
    };
    const getAccounts = () => {
        if (!_state.session) {
            return [];
        }
        return _state.session.state.accounts.map((wcAccountId) => ({
            accountId: wcAccountId.split(":")[2],
        }));
    };
    const cleanup = () => {
        _state.subscriptions.forEach((subscription) => subscription.remove());
        _state.subscriptions = [];
        _state.session = null;
    };
    const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (_state.session) {
            yield _state.client.disconnect({
                topic: _state.session.topic,
                reason: {
                    code: 5900,
                    message: "User disconnected",
                },
            });
        }
        cleanup();
    });
    const setupEvents = () => {
        _state.subscriptions.push(_state.client.on("pairing_created", (pairing) => {
            logger.log("Pairing Created", pairing);
        }));
        _state.subscriptions.push(_state.client.on("session_updated", (updatedSession) => {
            var _a;
            logger.log("Session Updated", updatedSession);
            if (updatedSession.topic === ((_a = _state.session) === null || _a === void 0 ? void 0 : _a.topic)) {
                _state.session = updatedSession;
                emitter.emit("accountsChanged", { accounts: getAccounts() });
            }
        }));
        _state.subscriptions.push(_state.client.on("session_deleted", (deletedSession) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            logger.log("Session Deleted", deletedSession);
            if (deletedSession.topic === ((_a = _state.session) === null || _a === void 0 ? void 0 : _a.topic)) {
                yield disconnect();
            }
        })));
    };
    if (_state.session) {
        setupEvents();
    }
    return {
        connect() {
            return __awaiter(this, void 0, void 0, function* () {
                const existingAccounts = getAccounts();
                if (existingAccounts.length) {
                    return existingAccounts;
                }
                try {
                    _state.session = yield _state.client.connect({
                        metadata: params.metadata,
                        timeout: 30 * 1000,
                        permissions: {
                            blockchain: {
                                chains: [getChainId()],
                            },
                            jsonrpc: {
                                methods: [
                                    "near_signAndSendTransaction",
                                    "near_signAndSendTransactions",
                                ],
                            },
                        },
                    });
                    setupEvents();
                    return getAccounts();
                }
                catch (err) {
                    yield disconnect();
                    throw err;
                }
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
                logger.log("WalletConnect:signAndSendTransaction", {
                    signerId,
                    receiverId,
                    actions,
                });
                if (!_state.session) {
                    throw new Error("Wallet not connected");
                }
                return _state.client.request({
                    timeout: 30 * 1000,
                    topic: _state.session.topic,
                    chainId: getChainId(),
                    request: {
                        method: "near_signAndSendTransaction",
                        params: {
                            signerId,
                            receiverId,
                            actions,
                        },
                    },
                });
            });
        },
        signAndSendTransactions({ transactions }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("WalletConnect:signAndSendTransactions", { transactions });
                if (!_state.session) {
                    throw new Error("Wallet not connected");
                }
                return _state.client.request({
                    timeout: 30 * 1000,
                    topic: _state.session.topic,
                    chainId: getChainId(),
                    request: {
                        method: "near_signAndSendTransactions",
                        params: { transactions },
                    },
                });
            });
        },
    };
});
export function setupWalletConnect({ projectId, metadata, chainId, relayUrl = "wss://relay.walletconnect.com", iconUrl = "./assets/wallet-connect-icon.png", }) {
    return () => __awaiter(this, void 0, void 0, function* () {
        return {
            id: "wallet-connect",
            type: "bridge",
            metadata: {
                name: "WalletConnect",
                description: null,
                iconUrl,
            },
            init: (options) => {
                return WalletConnect(Object.assign(Object.assign({}, options), { params: {
                        projectId,
                        metadata,
                        relayUrl,
                        chainId,
                    } }));
            },
        };
    });
}
//# sourceMappingURL=wallet-connect.js.map