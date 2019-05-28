import { Entity } from './entity.model';

export class Trip extends Entity {
    ticker: string;
    title: string;
    description: string;
    canceledReason: string;
    dateInit: string;
    dateEnd: string;
    picture: string;
    price: { type: number, min: 0 };
    //stages: {};
    //sponsorShips: {};
    created: string;
    status: string;
    comment: [{
        commentTitle: string,
        commentText: string,
        commentCreated: Date
    }];
}
