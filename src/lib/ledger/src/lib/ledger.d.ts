import { WalletModuleFactory, HardwareWallet } from "@near-wallet-selector/core";
export interface LedgerParams {
    iconUrl?: string;
}
export declare const LOCAL_STORAGE_AUTH_DATA = "ledger:authData";
export declare function setupLedger({ iconUrl, }?: LedgerParams): WalletModuleFactory<HardwareWallet>;
