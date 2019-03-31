import { Reducer, AnyAction } from "redux";
import { ActionCreator } from "typescript-fsa";
import { produce } from "immer";

/**describes action handler function */
type THandler<TState, TPayload> = (state: TState, payload: TPayload) => any;

/**Represents a redux reducer decorated with "case" function that registers action handlers */
interface TImmerReducer<TState> extends Reducer<TState> {
  case<TPayload>(
    action: ActionCreator<TPayload>,
    handler: THandler<TState, TPayload>
  ): TImmerReducer<TState>;
}

/**The reducer builder.
 * Returns a reducer function decorated with "case" function that can be used to register action handlers with fluent syntax.*/
export function immerReducer<TState>(
  initialState: TState
): TImmerReducer<TState> {
  const cases = {};

  const caseHandler = (actionCreator, handler) => {
    const action = actionCreator();
    cases[action.type] = handler;
    return reducer;
  };

  const reducer = (state: TState, action: AnyAction) => {
    if (!state) return initialState;
    let caseEntry = cases[action.type];

    if (caseEntry) {
      let newState = produce(state, draft => {
        caseEntry(draft, action && action.payload);
        return draft;
      });
      return newState;
    }
    return state;
  };

  reducer.case = caseHandler;

  return reducer as TImmerReducer<TState>;
}
