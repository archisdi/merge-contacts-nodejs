declare module "*.json" {
    const value: any;
    export default value;
}

export interface AnyObject<Type = any> {
    [s: string]: Type
}

export interface Contact {
    fullname: string;
    email?: {
        [s: string]: string
    };
    phone?: {
        [s: string]: string
    };
    address?: {
        [s: string]: string
    };
    other_field?: {
        [s: string]: string
    };
}

export interface RawContact extends Omit<Contact, 'other_field'> {
    [s: string]: any
}