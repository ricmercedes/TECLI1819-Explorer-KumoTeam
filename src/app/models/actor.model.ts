import { Entity } from './entity.model';

export class Actor extends Entity {
    name: string;
    surname: string;
    email: string;
    address: string;
    preferredLanguage: string;
    phone: string;
    password: string;
    role: string; //['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSORSHIP'];
    banned: boolean;
    flatPaid: boolean;
    created: string;
}