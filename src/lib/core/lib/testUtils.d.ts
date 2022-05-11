import { WalletModuleFactory, Wallet, WalletEvents } from "./wallet";
import { Options } from "./options.types";
import { ProviderService, EventEmitterService, LoggerService, StorageService } from "./services";
export interface MockWalletDependencies {
    options?: Options;
    provider?: ProviderService;
    emitter?: EventEmitterService<WalletEvents>;
    logger?: LoggerService;
    storage?: StorageService;
}
export declare const mockWallet: <Variation extends Wallet>(factory: WalletModuleFactory, deps?: MockWalletDependencies) => Promise<Variation | null>;
