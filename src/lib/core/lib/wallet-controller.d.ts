import { EventEmitter } from "./services";
import { Wallet, WalletModule } from "./wallet";
import { Store } from "./store.types";
import { Options } from "./options.types";
import { WalletSelectorEvents } from "./wallet-selector.types";
declare class WalletController {
    private options;
    private modules;
    private wallets;
    private store;
    private emitter;
    constructor(options: Options, modules: Array<WalletModule>, store: Store, emitter: EventEmitter<WalletSelectorEvents>);
    private getSelectedWalletId;
    private setSelectedWalletId;
    private removeSelectedWalletId;
    private setupWalletModule;
    private setupWalletModules;
    private handleConnected;
    private handleDisconnected;
    private handleAccountsChanged;
    private handleNetworkChanged;
    init(): Promise<void>;
    getWallet<WalletVariation extends Wallet = Wallet>(walletId?: string): WalletVariation | null;
}
export default WalletController;
