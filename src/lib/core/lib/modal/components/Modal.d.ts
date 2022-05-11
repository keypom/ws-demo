import React from "react";
import { WalletSelectorModal, ModalOptions } from "../modal.types";
import { WalletSelector } from "../../wallet-selector.types";
interface ModalProps {
    selector: Omit<WalletSelector, keyof WalletSelectorModal>;
    options?: ModalOptions;
    visible: boolean;
    hide: () => void;
}
export declare const Modal: React.FC<ModalProps>;
export {};
