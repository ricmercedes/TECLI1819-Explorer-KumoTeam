import { Trip } from './trip.model';

export class Comment extends Trip {
    title: string;
    commentText: string[];
    commentCreated: {
        type: boolean
        default: null
    };
}
