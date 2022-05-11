import { providers } from "near-api-js";
import { EventEmitterService, ProviderService, LoggerService, StorageService } from "../services";
import { Transaction } from "./transactions";
import { Action } from "./actions";
import { Options } from "../options.types";
import { Optional } from "../utils.types";
import { AccountState } from "../store.types";
export interface HardwareWalletConnectParams {
    derivationPath: string;
}
export interface SignAndSendTransactionParams {
    signerId?: string;
    receiverId?: string;
    actions: Array<Action>;
}
export interface SignAndSendTransactionsParams {
    transactions: Array<Optional<Transaction, "signerId">>;
}
export declare type WalletEvents = {
    connected: {
        pending?: boolean;
        accounts?: Array<AccountState>;
    };
    disconnected: null;
    accountsChanged: {
        accounts: Array<AccountState>;
    };
    networkChanged: {
        networkId: string;
    };
};
export interface WalletMetadata<Type extends string = string> {
    id: string;
    name: string;
    description: string | null;
    iconUrl: string;
    type: Type;
}
interface BaseWallet<Type extends string, ExecutionOutcome = providers.FinalExecutionOutcome> extends WalletMetadata<Type> {
    isAvailable(): Promise<boolean>;
    connect(params?: object): Promise<Array<AccountState>>;
    disconnect(): Promise<void>;
    getAccounts(): Promise<Array<AccountState>>;
    signAndSendTransaction(params: SignAndSendTransactionParams): Promise<ExecutionOutcome>;
    signAndSendTransactions(params: SignAndSendTransactionsParams): Promise<ExecutionOutcome extends void ? void : Array<ExecutionOutcome>>;
}
export declare type BrowserWallet = BaseWallet<"browser", void>;
export interface InjectedWallet extends BaseWallet<"injected"> {
    getDownloadUrl(): string;
}
export interface HardwareWallet extends BaseWallet<"hardware"> {
    connect(params?: HardwareWalletConnectParams): Promise<Array<AccountState>>;
}
export declare type BridgeWallet = BaseWallet<"bridge", void>;
export declare type Wallet = BrowserWallet | InjectedWallet | HardwareWallet | BridgeWallet;
export declare type WalletType = Wallet["type"];
export interface WalletOptions<WalletVariation extends Wallet = Wallet> {
    options: Options;
    metadata: WalletMetadata<WalletVariation["type"]>;
    provider: ProviderService;
    emitter: EventEmitterService<WalletEvents>;
    logger: LoggerService;
    storage: StorageService;
}
export declare type WalletBehaviour<WalletVariation extends Wallet = Wallet> = Omit<WalletVariation, keyof WalletMetadata>;
export declare type WalletModule<WalletVariation extends Wallet = Wallet> = WalletMetadata<WalletVariation["type"]> & {
    wallet(options: WalletOptions<WalletVariation>): WalletBehaviour<WalletVariation>;
};
export declare type WalletBehaviourFactory<WalletVariation extends Wallet, ExtraWalletOptions extends object = object> = (options: WalletOptions<WalletVariation> & ExtraWalletOptions) => WalletBehaviour<WalletVariation>;
export {};
