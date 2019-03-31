declare type ActionWithPayloadHandlerType<TState, TPayload = any> = (state: TState, payload: TPayload) => any;
export declare function withProduce<TState, TPayload>(handler: ActionWithPayloadHandlerType<TState, TPayload>): ActionWithPayloadHandlerType<TState, TPayload>;
export {};
