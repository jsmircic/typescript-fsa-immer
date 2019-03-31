import { Reducer } from "redux";
import { ActionCreator } from "typescript-fsa";
declare type THandler<TState, TPayload> = (state: TState, payload: TPayload) => any;
interface TImmerReducer<TState> extends Reducer<TState> {
    case<TPayload>(action: ActionCreator<TPayload>, handler: THandler<TState, TPayload>): TImmerReducer<TState>;
}
export declare function immerReducer<TState>(initialState: TState): TImmerReducer<TState>;
export {};
