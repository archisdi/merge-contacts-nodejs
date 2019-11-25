"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Inputs = require("../sample/contacts-01.json");
const merge_contact_1 = require("./merge_contact");
(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const outputs = yield merge_contact_1.default(Inputs);
    console.log(outputs);
}))();
