import { WalletModuleFactory, BrowserWallet } from "@near-wallet-selector/core";
export interface NearWalletParams {
    walletUrl?: string;
    iconUrl?: string;
}
export declare function setupNearWallet({ walletUrl, iconUrl, }?: NearWalletParams): WalletModuleFactory<BrowserWallet>;
