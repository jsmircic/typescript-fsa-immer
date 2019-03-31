"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immer_1 = tslib_1.__importDefault(require("immer"));
function withProduce(handler) {
    return function (state, payload) {
        return immer_1.default(state, function (draft) { return handler(draft, payload); });
    };
}
exports.withProduce = withProduce;
//# sourceMappingURL=withProduce.js.map