import { Entity } from './entity.model';

export class Application extends Entity {
    status: string;
    dateApplication: string;
    paid: boolean;
    datePayment: string;
    dateCancelation: string;
    comments: string;
    rejectionComment: string;
}