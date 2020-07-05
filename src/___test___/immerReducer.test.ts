import {immerReducer} from "../immerReducer";
import {actionCreatorFactory} from "typescript-fsa";

const actionCreator = actionCreatorFactory();

const increment = actionCreator("INCREMENT");
const decrement = actionCreator("DECREMENT");

const setDetailsStart = actionCreator<number>("SET_DETAILS_START");
const setDetailsEnd = actionCreator<number>("SET_DETAILS_STOP");

const initialState = {
    counter: 0,
    details: {
        start: 0,
        end: 0,
    }
};

const reducer = immerReducer(initialState)
    .case(increment, state => {
        state.counter++
    })
    .case(decrement, state => {
        state.counter--
    })
    .casesWithAction([
        setDetailsStart,
        setDetailsEnd,
    ], (state, action) => {
        state.details = detailsReducer(state.details, action)
    });

const detailsReducer = immerReducer(initialState.details)
    .caseWithAction(setDetailsStart, (state, action) => {
        state.start = action.payload
    })
    .caseWithAction(setDetailsEnd, (state, action) => {
        state.end = action.payload
    });

test("increment increments count by one ", () => {
    const result = reducer(initialState, increment());
    expect(result.counter).toBe(1);
});

test("decrement decrements count by one ", () => {
    const testState = {counter: 1} as typeof initialState;
    const result = reducer(testState, decrement());
    expect(result.counter).toBe(0);
});

test("reducer result is a different instance", () => {
    const testState = {counter: 1} as typeof initialState;
    const result = reducer(testState, decrement());
    expect(result).not.toBe(testState);
});

test("reducer should delegate actions to detailsReducer", () => {
    const testState = {
        counter: 1,
        details: {
            start: 0,
            end: 0,
        }
    };
    let result = reducer(testState, setDetailsStart(5));
    expect(result.details.start).toBe(5);

    result = reducer(testState, setDetailsEnd(6));
    expect(result.details.end).toBe(6);
});
