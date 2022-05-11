import { providers } from "near-api-js";
import { EventEmitterService, LoggerService, ProviderService, StorageService } from "../services";
import { Options } from "../options.types";
import { Transaction, Action } from "./transactions.types";
import { Modify, Optional } from "../utils.types";
interface BaseWalletMetadata {
    name: string;
    description: string | null;
    iconUrl: string;
}
interface BaseWalletBehaviour<ExecutionOutcome> {
    connect(): Promise<Array<Account>>;
    disconnect(): Promise<void>;
    getAccounts(): Promise<Array<Account>>;
    signAndSendTransaction(params: SignAndSendTransactionParams): Promise<ExecutionOutcome>;
    signAndSendTransactions(params: SignAndSendTransactionsParams): Promise<ExecutionOutcome extends void ? void : Array<ExecutionOutcome>>;
}
declare type BaseWallet<Type extends string, Metadata extends BaseWalletMetadata, Behaviour> = {
    id: string;
    type: Type;
    metadata: Metadata;
} & Behaviour;
export interface Account {
    accountId: string;
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
        accounts: Array<Account>;
    };
    disconnected: null;
    accountsChanged: {
        accounts: Array<Account>;
    };
    networkChanged: {
        networkId: string;
    };
};
export declare type BrowserWalletMetadata = BaseWalletMetadata;
export declare type BrowserWalletBehaviour = BaseWalletBehaviour<void>;
export declare type BrowserWallet = BaseWallet<"browser", BrowserWalletMetadata, BrowserWalletBehaviour>;
export declare type InjectedWalletMetadata = BaseWalletMetadata & {
    downloadUrl: string;
};
export declare type InjectedWalletBehaviour = BaseWalletBehaviour<providers.FinalExecutionOutcome>;
export declare type InjectedWallet = BaseWallet<"injected", InjectedWalletMetadata, InjectedWalletBehaviour>;
export declare type HardwareWalletMetadata = BaseWalletMetadata;
export interface HardwareWalletConnectParams {
    derivationPath: string;
}
export declare type HardwareWalletBehaviour = Modify<BaseWalletBehaviour<providers.FinalExecutionOutcome>, {
    connect(params: HardwareWalletConnectParams): Promise<Array<Account>>;
}>;
export declare type HardwareWallet = BaseWallet<"hardware", HardwareWalletMetadata, HardwareWalletBehaviour>;
export declare type BridgeWalletMetadata = BaseWalletMetadata;
export declare type BridgeWalletBehaviour = BaseWalletBehaviour<providers.FinalExecutionOutcome>;
export declare type BridgeWallet = BaseWallet<"bridge", BridgeWalletMetadata, BridgeWalletBehaviour>;
export declare type WalletMetadata = BrowserWalletMetadata | InjectedWalletMetadata | HardwareWalletMetadata | BridgeWalletMetadata;
export declare type Wallet = BrowserWallet | InjectedWallet | HardwareWallet | BridgeWallet;
export declare type WalletType = Wallet["type"];
export interface WalletBehaviourOptions<Variation extends Wallet> {
    id: Variation["id"];
    type: Variation["type"];
    metadata: Variation["metadata"];
    options: Options;
    provider: ProviderService;
    emitter: EventEmitterService<WalletEvents>;
    logger: LoggerService;
    storage: StorageService;
}
export declare type WalletBehaviourFactory<Variation extends Wallet, ExtraOptions extends object = object> = (options: WalletBehaviourOptions<Variation> & ExtraOptions) => Promise<Omit<Variation, "id" | "type" | "metadata">>;
export declare type WalletModule<Variation extends Wallet = Wallet> = {
    id: Variation["id"];
    type: Variation["type"];
    metadata: Variation["metadata"];
    init(options: WalletBehaviourOptions<Variation>): Promise<Omit<Variation, "id" | "type" | "metadata">>;
};
export declare type WalletModuleFactory<Variation extends Wallet = Wallet> = () => Promise<WalletModule<Variation> | null>;
export {};
