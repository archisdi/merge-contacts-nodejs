"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Inputs = require("../sample/contacts.json");
const merge_contact_1 = require("./merge_contact");
(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
    const outputs = yield merge_contact_1.default(Inputs);
    console.log(outputs);
}))();
//# sourceMappingURL=index.js.map