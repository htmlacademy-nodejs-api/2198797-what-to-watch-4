export interface MatchMovieUserInterface {
    matchMovieUser(movieId: string, userId: string): Promise<boolean>;
}
