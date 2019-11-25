import * as Bluebird from 'bluebird';
import { Contact, AnyObject, RawContact } from './typings/common';

/**
 * 
 * @param objects 
 * @param groupBy 
 * @description returns grouped contact by parameter
 */
 function GroupObject<Output = any>(objects: AnyObject[], groupBy: string): AnyObject<Output[]> {

    const groupedObject = objects.reduce((group, item) => {
        /** will skip object if groupBy key not found */
        if (!item[groupBy] || typeof item[groupBy] != 'string') {
            return group;
        }
        
        const groupName = item[groupBy];
        if (group.hasOwnProperty(groupName)){
            group[groupName].push(item)
        } else {
            group[groupName] = [item]
        }

        return group;
    }, {});

    
    
    return groupedObject;
}

function MergeContact(name: string, contacts: RawContact[]): Contact {
    const contact: Contact = { 
        fullname: name, 
        address: {}, 
        email: {}, 
        phone: {}, 
        other_field: {} 
    }    

    contacts.forEach(itemContact => {
        const itemContactAttribute = Object.keys(itemContact);
        itemContactAttribute.forEach(attrKey => {
            if (attrKey === 'fullname'){
                return true;
            } 
            else if (attrKey === 'phone' || attrKey === 'email' || attrKey === 'address'){
                contact[attrKey] = {
                    ...itemContact[attrKey],
                    ...contact[attrKey]
                }
            } 
            else {
                contact.other_field = {
                    ...itemContact[attrKey],
                    ...contact.other_field
                }
            }             
        });
    })

    return contact;
}

export default async function(contacts: AnyObject[]): Promise<Contact[]> {
    const grouped = GroupObject<RawContact>(
        contacts,   // list of contacts to group
        'fullname'  // key to group contact with
    );
    
    /** merge contacts concurrently */
    const contactGroupKeys = Object.keys(grouped);
    const mergedContacts = await Bluebird.map(
        contactGroupKeys, 
        (key) => MergeContact(key, grouped[key]), 
        { concurrency: 10 }
    );

    return mergedContacts;
}