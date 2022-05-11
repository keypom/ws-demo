import { __awaiter } from "tslib";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";
import { utils } from "near-api-js";
// Further reading regarding APDU Ledger API:
// - https://gist.github.com/Wollac/49f0c4e318e42f463b8306298dfb4f4a
// - https://github.com/LedgerHQ/app-near/blob/master/workdir/app-near/src/constants.h
export const CLA = 0x80; // Always the same for Ledger.
export const INS_SIGN = 0x02; // Sign
export const INS_GET_PUBLIC_KEY = 0x04; // Get Public Key
export const INS_GET_APP_VERSION = 0x06; // Get App Version
export const P1_LAST = 0x80; // End of Bytes to Sign (finalize)
export const P1_MORE = 0x00; // More bytes coming
export const P1_IGNORE = 0x00;
export const P2_IGNORE = 0x00;
// Converts BIP32-compliant derivation path to a Buffer.
// More info here: https://github.com/LedgerHQ/ledger-live-common/blob/master/docs/derivation.md
export function parseDerivationPath(derivationPath) {
    const parts = derivationPath.split("/");
    return Buffer.concat(parts
        .map((part) => {
        return part.endsWith(`'`)
            ? Math.abs(parseInt(part.slice(0, -1))) | 0x80000000
            : Math.abs(parseInt(part));
    })
        .map((i32) => {
        return Buffer.from([
            (i32 >> 24) & 0xff,
            (i32 >> 16) & 0xff,
            (i32 >> 8) & 0xff,
            i32 & 0xff,
        ]);
    }));
}
// TODO: Understand what this is exactly. What's so special about 87?
export const networkId = "W".charCodeAt(0);
// Not using TransportWebHID.isSupported as it's chosen to use a Promise...
export const isLedgerSupported = () => {
    var _a;
    return !!((_a = window.navigator) === null || _a === void 0 ? void 0 : _a.hid);
};
export class LedgerClient {
    constructor() {
        this.transport = null;
        this.isConnected = () => {
            return Boolean(this.transport);
        };
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            this.transport = yield TransportWebHID.create();
            const handleDisconnect = () => {
                var _a;
                (_a = this.transport) === null || _a === void 0 ? void 0 : _a.off("disconnect", handleDisconnect);
                this.transport = null;
            };
            this.transport.on("disconnect", handleDisconnect);
        });
        this.disconnect = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            yield this.transport.close();
            this.transport = null;
        });
        this.setScrambleKey = (key) => {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            this.transport.setScrambleKey(key);
        };
        this.on = (event, callback) => {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            this.transport.on(event, callback);
            return {
                remove: () => { var _a; return (_a = this.transport) === null || _a === void 0 ? void 0 : _a.off(event, callback); },
            };
        };
        this.off = (event, callback) => {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            this.transport.off(event, callback);
        };
        this.getVersion = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            const res = yield this.transport.send(CLA, INS_GET_APP_VERSION, P1_IGNORE, P2_IGNORE);
            const [major, minor, patch] = Array.from(res);
            return `${major}.${minor}.${patch}`;
        });
        this.getPublicKey = ({ derivationPath }) => __awaiter(this, void 0, void 0, function* () {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            const res = yield this.transport.send(CLA, INS_GET_PUBLIC_KEY, P2_IGNORE, networkId, parseDerivationPath(derivationPath));
            return utils.serialize.base_encode(res.subarray(0, -2));
        });
        this.sign = ({ data, derivationPath }) => __awaiter(this, void 0, void 0, function* () {
            if (!this.transport) {
                throw new Error("Device not connected");
            }
            // NOTE: getVersion call resets state to avoid starting from partially filled buffer
            yield this.getVersion();
            // 128 - 5 service bytes
            const CHUNK_SIZE = 123;
            const allData = Buffer.concat([
                parseDerivationPath(derivationPath),
                Buffer.from(data),
            ]);
            for (let offset = 0; offset < allData.length; offset += CHUNK_SIZE) {
                const isLastChunk = offset + CHUNK_SIZE >= allData.length;
                const response = yield this.transport.send(CLA, INS_SIGN, isLastChunk ? P1_LAST : P1_MORE, P2_IGNORE, Buffer.from(allData.subarray(offset, offset + CHUNK_SIZE)));
                if (isLastChunk) {
                    return Buffer.from(response.subarray(0, -2));
                }
            }
            throw new Error("Invalid data or derivation path");
        });
    }
}
//# sourceMappingURL=ledger-client.js.map