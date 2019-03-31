import produce from "immer";

declare type ActionWithPayloadHandlerType<TState, TPayload = any> = (
  state: TState,
  payload: TPayload
) => any;

/**decorate reducer function with Immer produce.
 * Returns new reducer function invoked inside immer produce callback.*/
export function withProduce<TState, TPayload>(
  handler: ActionWithPayloadHandlerType<TState, TPayload>
): ActionWithPayloadHandlerType<TState, TPayload> {
  return (state: TState, payload: TPayload) => {
    return produce(state, draft => handler(draft as any, payload));
  };
}
