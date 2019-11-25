"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Bluebird = require("bluebird");
function GroupObject(objects, groupBy) {
    const groupedObject = objects.reduce((group, item) => {
        if (!item[groupBy] || typeof item[groupBy] != 'string') {
            return group;
        }
        const groupName = item[groupBy];
        if (group.hasOwnProperty(groupName)) {
            group[groupName].push(item);
        }
        else {
            group[groupName] = [item];
        }
        return group;
    }, {});
    return groupedObject;
}
function MergeContact(name, contacts) {
    const contact = {
        fullname: name,
        address: {},
        email: {},
        phone: {},
        other_field: {}
    };
    contacts.forEach(itemContact => {
        const itemContactAttribute = Object.keys(itemContact);
        itemContactAttribute.forEach(attrKey => {
            if (attrKey === 'fullname') {
                return true;
            }
            else if (attrKey === 'phone' || attrKey === 'email' || attrKey === 'address') {
                contact[attrKey] = Object.assign({}, itemContact[attrKey], contact[attrKey]);
            }
            else {
                contact.other_field = Object.assign({}, itemContact[attrKey], contact.other_field);
            }
        });
    });
    return contact;
}
function default_1(contacts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const grouped = GroupObject(contacts, 'fullname');
        const contactGroupKeys = Object.keys(grouped);
        const mergedContacts = yield Bluebird.map(contactGroupKeys, (key) => MergeContact(key, grouped[key]), { concurrency: 10 });
        return mergedContacts;
    });
}
exports.default = default_1;
//# sourceMappingURL=merge_contact.js.map