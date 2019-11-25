import * as Inputs from "../sample/contacts.json";
import MergeContact from './merge_contact';

/** Main method */
(async (): Promise<void> => {
    const outputs = await MergeContact(Inputs);
    console.log(outputs);
})();