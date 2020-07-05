import {Reducer} from "redux";
import {Action, ActionCreator} from "typescript-fsa";
import {Draft, nothing, produce} from "immer";

/**describes action handler function */
type THandler<TState, TPayload> = (state: Draft<TState>, payload: TPayload) =>
    | void
    | TState
    | Draft<TState>
    | typeof nothing;

/**Represents a redux reducer decorated with "case" function that registers action handlers */
interface TImmerReducer<TState> extends Reducer<TState> {
    case<TPayload>(
        action: ActionCreator<TPayload>,
        handler: THandler<TState, TPayload>
    ): TImmerReducer<TState>;

    caseWithAction<TPayload>(
        actionCreator: ActionCreator<TPayload>,
        handler: THandler<TState, Action<TPayload>>,
    ): TImmerReducer<TState>;

    cases<P1, P2>(
        actionCreators: [ActionCreator<P1>, ActionCreator<P2>],
        handler: THandler<TState, P1 | P2>,
    ): TImmerReducer<TState>;

    cases<P1, P2, P3>(
        actionCreators: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>,
        ],
        handler: THandler<TState, P1 | P2 | P3>,
    ): TImmerReducer<TState>;

    cases<P1, P2, P3, P4>(
        actionCreators: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>,
            ActionCreator<P4>,
        ],
        handler: THandler<TState, P1 | P2 | P3 | P4>,
    ): TImmerReducer<TState>;

    cases<P>(
        actionCreators: ActionCreator<P>[],
        handler: THandler<TState, P>,
    ): TImmerReducer<TState>;

    casesWithAction<P1, P2>(
        actionCreators: [ActionCreator<P1>, ActionCreator<P2>],
        handler: THandler<TState, Action<P1 | P2>>,
    ): TImmerReducer<TState>;

    casesWithAction<P1, P2, P3>(
        actionCreators: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>,
        ],
        handler: THandler<TState, Action<P1 | P2 | P3>>,
    ): TImmerReducer<TState>;

    casesWithAction<P1, P2, P3, P4>(
        actionCreators: [
            ActionCreator<P1>,
            ActionCreator<P2>,
            ActionCreator<P3>,
            ActionCreator<P4>,
        ],
        handler: THandler<TState, Action<P1 | P2 | P3 | P4>>,
    ): TImmerReducer<TState>;

    casesWithAction<P>(
        actionCreators: Array<ActionCreator<P>>,
        handler: THandler<TState, Action<P>>,
    ): TImmerReducer<TState>;
}

/**The reducer builder.
 * Returns a reducer function decorated with "case" function that can be used to register action handlers with fluent syntax.*/
export function immerReducer<TState>(
    initialState: TState
): TImmerReducer<TState> {
    const cases: Record<string, THandler<TState, Action<any>>> = {};

    const caseWithActionHandler = (
        actionCreator: ActionCreator<any>,
        handler: THandler<TState, Action<any>>
    ) => {
        cases[actionCreator.type] = handler;
        return reducer;
    };

    const caseHandler = (
        actionCreator: ActionCreator<any>,
        handler: THandler<TState, any>
    ) => {
        caseWithActionHandler(
            actionCreator,
            (state, action: Action<any>) => {
                return handler(state, action.payload)
            }
        );
        return reducer;
    };

    const casesWithActionHandler = (
        actionCreators: ActionCreator<any>[],
        handler: THandler<TState, Action<any>>
    ) => {
        for (const actionCreator of actionCreators) {
            caseWithActionHandler(actionCreator, handler);
        }
        return reducer;
    };

    const casesHandler = (
        actionCreators: ActionCreator<any>[],
        handler: THandler<TState, any>
    ) => {
        for (const actionCreator of actionCreators) {
            caseHandler(actionCreator, handler);
        }
        return reducer;
    };

    const reducer = (state: TState, action: Action<any>) => {
        if (!state) return initialState;
        let caseEntry = cases[action.type];

        if (caseEntry) {
            return produce(state, draft => {
                return caseEntry(draft, action);
            });
        }
        return state;
    };

    reducer.case = caseHandler;
    reducer.cases = casesHandler;

    reducer.caseWithAction = caseWithActionHandler;
    reducer.casesWithAction = casesWithActionHandler;

    return reducer as TImmerReducer<TState>;
}
