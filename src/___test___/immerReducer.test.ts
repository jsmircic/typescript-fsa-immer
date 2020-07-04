import { immerReducer } from "../immerReducer";
import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

const increment = actionCreator("INCREMENT");
const decrement = actionCreator("DECREMENT");

const initialState = {
  counter: 0
};

const reducer = immerReducer(initialState)
  .case(increment, state => state.counter++)
  .case(decrement, state => state.counter--);

test("increment increments count by one ", () => {
  const result = reducer(initialState, increment());
  expect(result.counter).toBe(1);
});

test("decrement decrements count by one ", () => {
  const testState = { counter: 1 };
  const result = reducer(testState, decrement());
  expect(result.counter).toBe(0);
});

test("reducer result is a different instance", () => {
  const testState = { counter: 1 };
  const result = reducer(testState, decrement());
  expect(result).not.toBe(testState);
});

test("initial state is used if input state is undefined", () => {
  const result = reducer(undefined, decrement());
  expect(result.counter).toBe(-1);
});
