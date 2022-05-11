import { WalletModuleFactory, InjectedWallet } from "@near-wallet-selector/core";
import { InjectedSender } from "./injected-sender";
declare global {
    interface Window {
        near: InjectedSender | undefined;
    }
}
export interface SenderParams {
    iconUrl?: string;
}
export declare function setupSender({ iconUrl, }?: SenderParams): WalletModuleFactory<InjectedWallet>;
