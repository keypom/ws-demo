import React from "react";
import { WalletSelector } from "../../wallet-selector.types";
import { WalletSelectorModal } from "../modal.types";
interface WalletNetworkChangedProps {
    selector: Omit<WalletSelector, keyof WalletSelectorModal>;
    onSwitchWallet: () => void;
    onDismiss: () => void;
}
export declare const WalletNetworkChanged: React.FC<WalletNetworkChangedProps>;
export {};
