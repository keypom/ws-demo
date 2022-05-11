import { __awaiter } from "tslib";
import Client, { RELAYER_DEFAULT_PROTOCOL, SESSION_EMPTY_PERMISSIONS, SESSION_SIGNAL_METHOD_PAIRING, } from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
class WalletConnectClient {
    init(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = yield Client.init(opts);
        });
    }
    get session() {
        return this.client.session;
    }
    on(event, callback) {
        this.client.on(event, callback);
        return {
            remove: () => this.client.off(event, callback),
        };
    }
    once(event, callback) {
        this.client.once(event, callback);
    }
    connect(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const relay = params.relay || { protocol: RELAYER_DEFAULT_PROTOCOL };
            const timeout = params.timeout || 30 * 1000;
            return new Promise((resolve, reject) => {
                this.once("pairing_proposal", (proposal) => {
                    const { uri } = proposal.signal.params;
                    QRCodeModal.open(uri, () => {
                        reject(new Error("User cancelled pairing"));
                    });
                });
                (() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const pairing = yield this.client.pairing.create({
                            relay,
                            timeout,
                        });
                        const session = this.client.session.create({
                            signal: {
                                method: SESSION_SIGNAL_METHOD_PAIRING,
                                params: { topic: pairing.topic },
                            },
                            relay,
                            timeout,
                            metadata: params.metadata,
                            permissions: Object.assign(Object.assign({}, SESSION_EMPTY_PERMISSIONS), params.permissions),
                        });
                        QRCodeModal.close();
                        return session;
                    }
                    catch (err) {
                        QRCodeModal.close();
                        // WalletConnect sadly throws strings.
                        if (typeof err === "string") {
                            throw new Error(err);
                        }
                        throw err;
                    }
                }))()
                    .then(resolve)
                    .catch(reject);
            });
        });
    }
    request(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.request(params);
        });
    }
    disconnect(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.disconnect(params);
        });
    }
}
export default WalletConnectClient;
//# sourceMappingURL=wallet-connect-client.js.map