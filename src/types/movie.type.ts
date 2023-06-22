import { User } from './user.type';

export type Movie = {
    name: string;
    description: string;
    premiereDate: Date;
    genre: string[];
    released: number;
    rating: number;
    previewVideoLink: string;
    videoLink: string;
    starring: string[];
    director: string;
    runTime: number;
    posterImage: string;
    backgroundImage: string;
    backgroundColor: string;
    user: User;
}
