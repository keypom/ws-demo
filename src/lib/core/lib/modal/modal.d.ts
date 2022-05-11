import { WalletSelector } from "../wallet-selector.types";
import { WalletSelectorModal, ModalOptions } from "./modal.types";
export declare const setupModal: (selector: Omit<WalletSelector, keyof WalletSelectorModal>, options?: ModalOptions | undefined) => WalletSelectorModal;
