import { Options } from "../options.types";
import { Store } from "../store.types";
import { EventEmitter } from "../services";
import { WalletSelectorEvents } from "../wallet-selector.types";
import { WalletModuleFactory, Wallet } from "../wallet";
interface WalletModulesParams {
    factories: Array<WalletModuleFactory>;
    options: Options;
    store: Store;
    emitter: EventEmitter<WalletSelectorEvents>;
}
export declare const setupWalletModules: ({ factories, options, store, emitter, }: WalletModulesParams) => Promise<{
    getWallet: <Variation extends Wallet = Wallet>(id: string | null) => Promise<Variation | null>;
}>;
export {};
