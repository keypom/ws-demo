import React from "react";
import { Wallet } from "../../wallet";
interface WalletNotInstalledProps {
    notInstalledWallet: Wallet;
    onBack: () => void;
}
export declare const WalletNotInstalled: React.FC<WalletNotInstalledProps>;
export {};
