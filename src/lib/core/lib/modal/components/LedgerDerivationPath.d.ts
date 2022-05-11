import React from "react";
import { WalletSelectorModal } from "../modal.types";
import { WalletSelector } from "../../wallet-selector.types";
interface LedgerDerivationPathProps {
    selector: Omit<WalletSelector, keyof WalletSelectorModal>;
    onBack: () => void;
    onConnected: () => void;
}
export declare const LedgerDerivationPath: React.FC<LedgerDerivationPathProps>;
export {};
