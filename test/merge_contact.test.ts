import test from 'ava';
import * as sinon from 'sinon';

import MergeContact from '../src/merge_contact';

test.serial('should successfully merge two contact from example git page', async (t: any): Promise < void > => {
    const data = [{
            "fullname": "Ahmad Bustomi",
            "email": {
                "kantor": "ahmad.b@email.com"
            },
            "phone": {
                "kantor": "0211234678",
                "hp": "082112300676"
            }
        },
        {
            "fullname": "Ahmad Bustomi",
            "email": {
                "personal": "ahmad.b@ahmadbustomi.com"
            },
            "phone": {
                "hp": "082112300676",
                "hp_jadul": "081314735686"
            }
        }
    ];

    const expected = [{
        fullname: 'Ahmad Bustomi',
        address: {},
        email: {
            personal: 'ahmad.b@ahmadbustomi.com',
            kantor: 'ahmad.b@email.com'
        },
        phone: {
            hp: '082112300676',
            hp_jadul: '081314735686',
            kantor: '0211234678'
        },
        other_field: {}
    }];

    await MergeContact(data)
        .then((result): void => {
            t.deepEqual(result, expected);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.serial('should successfully merge two contact with complete attributes', async (t: any): Promise < void > => {
    const data = [{
            "fullname": "Archie Isdiningrat",
            "email": {
                "larisin": "archie.isdiningrat@larisin.id"
            },
            "phone": {
                "hp": "08124242123"
            }
        },
        {
            "fullname": "Archie Isdiningrat",
            "email": {
                "bizzy": "archie.isdiningrat@bizzy.co.id"
            },
            "address": {
                "makassar": "pettarni",
                "jakarta": "blora"
            },
            "hobby": "eating",
            "skills": ["coding", "gaming"],
            "school": {
                "highschool": "smk telkom",
                "university": "telkom univ"
            }
        },
        {
            "fullname": {}
        }
    ];

    const expected = [{
        "fullname": "Archie Isdiningrat",
        "address": {
            "makassar": "pettarni",
            "jakarta": "blora"
        },
        "email": {
            "bizzy": "archie.isdiningrat@bizzy.co.id",
            "larisin": "archie.isdiningrat@larisin.id"
        },
        "phone": {
            "hp": "08124242123"
        },
        "other_field": {
            "hobby": "eating",
            "skills": ["coding", "gaming"],
            "school": {
                "highschool": "smk telkom",
                "university": "telkom univ"
            }
        }
    }];

    await MergeContact(data)
        .then((result): void => {
            t.deepEqual(result, expected);
        })
        .catch((err: any): void => {
            t.fail(err.message);
        });
});

test.beforeEach('Initialize New Sandbox Before Each Test', (t: any): void => {
    t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always('Restore Sandbox and Configuration After Each Test', (t: any): void => {
    t.context.sandbox.restore();
});