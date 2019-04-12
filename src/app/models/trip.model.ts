import { Entity } from './entity.model';

export class Trip extends Entity {
    ticker: string;
    title: string;
    description: string;
    canceledReason: string;
    dateInit: string;
    dateEnd: string;
    pictures: string;
    stages: {};
    comments: {};
    sponsorShips: {};
    created: string;
    status: string;
}