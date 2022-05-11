import { WalletModuleFactory, InjectedWallet } from "@near-wallet-selector/core";
import { InjectedMathWallet } from "./injected-math-wallet";
declare global {
    interface Window {
        nearWalletApi: InjectedMathWallet | undefined;
    }
}
export interface MathWalletParams {
    iconUrl?: string;
}
export declare const setupMathWallet: ({ iconUrl, }?: MathWalletParams) => WalletModuleFactory<InjectedWallet>;
