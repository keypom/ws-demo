import { __awaiter } from "tslib";
import { transactions as nearTransactions, utils } from "near-api-js";
import { TypedError } from "near-api-js/lib/utils/errors";
import isMobile from "is-mobile";
import { transformActions, } from "@near-wallet-selector/core";
import { isLedgerSupported, LedgerClient } from "./ledger-client";
export const LOCAL_STORAGE_AUTH_DATA = `ledger:authData`;
const setupLedgerState = (storage) => {
    return {
        client: new LedgerClient(),
        subscriptions: [],
        authData: storage.getItem(LOCAL_STORAGE_AUTH_DATA),
    };
};
const Ledger = ({ options, metadata, provider, logger, storage, }) => __awaiter(void 0, void 0, void 0, function* () {
    const _state = setupLedgerState(storage);
    const getAccounts = (authData = _state.authData) => {
        const accountId = authData === null || authData === void 0 ? void 0 : authData.accountId;
        if (!accountId) {
            return [];
        }
        return [{ accountId }];
    };
    const cleanup = () => {
        _state.subscriptions.forEach((subscription) => subscription.remove());
        _state.subscriptions = [];
        _state.authData = null;
        storage.removeItem(LOCAL_STORAGE_AUTH_DATA);
    };
    const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
        if (_state.client.isConnected()) {
            yield _state.client.disconnect().catch((err) => {
                logger.log("Failed to disconnect");
                logger.error(err);
            });
        }
        cleanup();
    });
    const connectLedgerDevice = () => __awaiter(void 0, void 0, void 0, function* () {
        if (_state.client.isConnected()) {
            return;
        }
        yield _state.client.connect();
    });
    const validateAccessKey = ({ accountId, publicKey, }) => {
        logger.log("Ledger:validateAccessKey", { accountId, publicKey });
        return provider.viewAccessKey({ accountId, publicKey }).then((accessKey) => {
            logger.log("Ledger:validateAccessKey:accessKey", { accessKey });
            if (accessKey.permission !== "FullAccess") {
                throw new Error("Public key requires 'FullAccess' permission");
            }
            return accessKey;
        }, (err) => {
            if (err instanceof TypedError && err.type === "AccessKeyDoesNotExist") {
                return null;
            }
            throw err;
        });
    };
    const getAccountIdFromPublicKey = ({ publicKey, }) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield fetch(`${options.network.helperUrl}/publicKey/ed25519:${publicKey}/accounts`);
        if (!response.ok) {
            throw new Error("Failed to get account id from public key");
        }
        const accountIds = yield response.json();
        if (!Array.isArray(accountIds) || !accountIds.length) {
            throw new Error("Failed to find account linked to public key");
        }
        return accountIds[0];
    });
    const signTransactions = (transactions) => __awaiter(void 0, void 0, void 0, function* () {
        if (!_state.authData) {
            throw new Error(`${metadata.name} not connected`);
        }
        const { accountId, derivationPath, publicKey } = _state.authData;
        const [block, accessKey] = yield Promise.all([
            provider.block({ finality: "final" }),
            provider.viewAccessKey({ accountId, publicKey }),
        ]);
        const signedTransactions = [];
        for (let i = 0; i < transactions.length; i++) {
            const actions = transformActions(transactions[i].actions);
            const transaction = nearTransactions.createTransaction(accountId, utils.PublicKey.from(publicKey), transactions[i].receiverId, accessKey.nonce + i + 1, actions, utils.serialize.base_decode(block.header.hash));
            const serializedTx = utils.serialize.serialize(nearTransactions.SCHEMA, transaction);
            const signature = yield _state.client.sign({
                data: serializedTx,
                derivationPath,
            });
            const signedTx = new nearTransactions.SignedTransaction({
                transaction,
                signature: new nearTransactions.Signature({
                    keyType: transaction.publicKey.keyType,
                    data: signature,
                }),
            });
            signedTransactions.push(signedTx);
        }
        return signedTransactions;
    });
    return {
        connect({ derivationPath }) {
            return __awaiter(this, void 0, void 0, function* () {
                const existingAccounts = getAccounts();
                if (existingAccounts.length) {
                    return existingAccounts;
                }
                if (!derivationPath) {
                    throw new Error("Invalid derivation path");
                }
                // Note: Connection must be triggered by user interaction.
                yield connectLedgerDevice();
                const publicKey = yield _state.client.getPublicKey({ derivationPath });
                const accountId = yield getAccountIdFromPublicKey({ publicKey });
                return validateAccessKey({ accountId, publicKey })
                    .then((accessKey) => {
                    if (!accessKey) {
                        throw new Error(`Public key is not registered with the account '${accountId}'.`);
                    }
                    const authData = {
                        accountId,
                        derivationPath,
                        publicKey,
                    };
                    storage.setItem(LOCAL_STORAGE_AUTH_DATA, authData);
                    _state.authData = authData;
                    return getAccounts();
                })
                    .catch((err) => __awaiter(this, void 0, void 0, function* () {
                    yield disconnect();
                    throw err;
                }));
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
                logger.log("Ledger:signAndSendTransaction", {
                    signerId,
                    receiverId,
                    actions,
                });
                if (!_state.authData) {
                    throw new Error("Wallet not connected");
                }
                // Note: Connection must be triggered by user interaction.
                yield connectLedgerDevice();
                const [signedTx] = yield signTransactions([
                    {
                        receiverId,
                        actions,
                    },
                ]);
                return provider.sendTransaction(signedTx);
            });
        },
        signAndSendTransactions({ transactions }) {
            return __awaiter(this, void 0, void 0, function* () {
                logger.log("Ledger:signAndSendTransactions", { transactions });
                if (!_state.authData) {
                    throw new Error("Wallet not connected");
                }
                // Note: Connection must be triggered by user interaction.
                yield connectLedgerDevice();
                const signedTransactions = yield signTransactions(transactions);
                return Promise.all(signedTransactions.map((signedTx) => provider.sendTransaction(signedTx)));
            });
        },
    };
});
export function setupLedger({ iconUrl = "./assets/ledger-icon.png", } = {}) {
    return () => __awaiter(this, void 0, void 0, function* () {
        const mobile = isMobile();
        const supported = isLedgerSupported();
        if (mobile || !supported) {
            return null;
        }
        return {
            id: "ledger",
            type: "hardware",
            metadata: {
                name: "Ledger",
                description: null,
                iconUrl,
            },
            init: Ledger,
        };
    });
}
//# sourceMappingURL=ledger.js.map