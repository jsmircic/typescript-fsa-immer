## typescript-fsa-immer

Redux reducer wrapped with immer produce for immutability.

### Introduction

Built on top of excellent [typescript-fsa](https://github.com/aikoven/typescript-fsa), fantastic [immer](https://github.com/mweststrate/immer), and inspired by the [typescript-fsa-reducers](https://github.com/dphilipson/typescript-fsa-reducers) library. With a goal to provide a fluent syntax for defining redux reducers with an "in the box" immutability provided by the immer "produce" function.

The classic approach to write a reducer with immer for immutability would look something like this:

```typescript
import {produce} from 'immer'

const reducer = (state,action)=>{
    switch(action.type){
        case 'INCREMENT'
            return produce(state,draft=>draft.counter++)
        case 'SET_VALUE'
            return produce(state,draft=>draft.counter=action.payload)
    }
}
```

Using this library, redux reducer is defined like this:

```typescript
import { immerReducer } from "typescript-fsa-immer";
import { actionCreatorFactory, Action } from "typescript-fsa";

const actionCreator = actionCreatorFactory("COUNTER");

/*action creators*/
const increment = actionCreator("INCREMENT");
const decrement = actionCreator("DECREMENT");
const reset = actionCreator("RESET");
const setCounter = actionCreator<number>("SET_VALUE");

type State = {
  counter: number
}

/*case handlers, the state here can be mutated safely! */
const onIncrement = (state: State) => { state.counter++ };
const onDecrement = (state: State) => { state.counter-- };
const onReset = (state: State, action: Action) => { 
  console.log(`counter has been refreshed by ${action.meta}`)
  state.counter = 0 
};

/*the payload for this action creator is strongly typed, must be a number or TS will complain*/
const onSetCounter = (state: State, payload: number) => { state.counter = payload };

/* Compose the reducer, define case handler for every action creator.
 * Everything is strongly typed and typesafe!
 */
const reducer = immerReducer(initialState)
  .case(increment, onIncrement)
  .case(decrement, onDecrement)
  .caseWithAction(reset, onReset)
  .case(setCounter, onSetCounter);
```

Reducer case handlers are wrapped with a immer "produce". The state object passed to the case handler is an immer "draft". The original state object is never mutated.

## Installation

    yarn add typescript-fsa-immer immer typescript-fsa

or

    npm install typescript-fsa-immer immer typescript-fsa --save
