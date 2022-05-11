import { EventEmitter } from "../services";
import { Wallet, WalletModule } from "../wallet";
import { ModuleState, Store } from "../store.types";
import { WalletSelectorEvents } from "../wallet-selector.types";
import { Options } from "../options.types";
interface WalletInstanceParams {
    modules: Array<ModuleState>;
    module: WalletModule;
    store: Store;
    options: Options;
    emitter: EventEmitter<WalletSelectorEvents>;
}
export declare const setupWalletInstance: ({ modules, module, store, options, emitter, }: WalletInstanceParams) => Promise<Wallet>;
export {};
