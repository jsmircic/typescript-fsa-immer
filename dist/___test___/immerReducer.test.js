"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immerReducer_1 = require("../immerReducer");
var typescript_fsa_1 = require("typescript-fsa");
var actionCreator = typescript_fsa_1.actionCreatorFactory();
var increment = actionCreator("INCREMENT");
var decrement = actionCreator("DECREMENT");
var initialState = {
    counter: 0
};
var reducer = immerReducer_1.immerReducer(initialState)
    .case(increment, function (state) { return state.counter++; })
    .case(decrement, function (state) { return state.counter--; });
test("increment increments count by one ", function () {
    var result = reducer(initialState, increment());
    expect(result.counter).toBe(1);
});
test("decrement decrements count by one ", function () {
    var testState = { counter: 1 };
    var result = reducer(testState, decrement());
    expect(result.counter).toBe(0);
});
test("reducer result is a different instance", function () {
    var testState = { counter: 1 };
    var result = reducer(testState, decrement());
    expect(result).not.toBe(testState);
});
//# sourceMappingURL=immerReducer.test.js.map