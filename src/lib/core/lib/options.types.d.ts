import { WalletSelectorParams } from "./wallet-selector.types";
export declare type NetworkId = "mainnet" | "testnet" | "betanet";
export interface Network {
    networkId: string;
    nodeUrl: string;
    helperUrl: string;
    explorerUrl: string;
}
export declare type Options = Pick<WalletSelectorParams, "contractId" | "methodNames"> & {
    network: Network;
    debug: boolean;
};
