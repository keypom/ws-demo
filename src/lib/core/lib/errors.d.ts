import { WalletMetadata } from "./wallet";
declare enum ErrorCodes {
    WalletNotInstalled = "WalletNotInstalled"
}
declare class WalletSelectorError extends Error {
    constructor(name: ErrorCodes, message: string);
}
export declare const errors: {
    isWalletNotInstalledError: (err: unknown) => boolean;
    createWalletNotInstalledError: (metadata: WalletMetadata) => WalletSelectorError;
};
export {};
