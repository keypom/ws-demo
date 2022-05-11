import React from "react";
import { WalletSelector } from "../../wallet-selector.types";
import { ModalOptions, WalletSelectorModal } from "../modal.types";
interface WalletOptionsProps {
    selector: Omit<WalletSelector, keyof WalletSelectorModal>;
    options?: ModalOptions;
    onConnectHardwareWallet: () => void;
    onConnected: () => void;
    onError: (error: Error) => void;
}
export declare const WalletOptions: React.FC<WalletOptionsProps>;
export {};
