import { transactions } from "near-api-js";
import { Action } from "./transactions.types";
export declare const transformActions: (actions: Array<Action>) => transactions.Action[];
