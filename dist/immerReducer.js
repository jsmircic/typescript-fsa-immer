"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = require("immer");
function immerReducer(initialState) {
    var cases = {};
    var caseHandler = function (actionCreator, handler) {
        var action = actionCreator();
        cases[action.type] = handler;
        return reducer;
    };
    var reducer = function (state, action) {
        if (!state)
            return initialState;
        var caseEntry = cases[action.type];
        if (caseEntry) {
            var newState = immer_1.produce(state, function (draft) {
                caseEntry(draft, action && action.payload);
                return draft;
            });
            return newState;
        }
        return state;
    };
    reducer.case = caseHandler;
    return reducer;
}
exports.immerReducer = immerReducer;
//# sourceMappingURL=immerReducer.js.map