/**
 * This is the shape of the Movie that comes in from TMDB API
 */
export interface Movie {
    adult: string;
    backdrop_path: string;
    genre_ids: [];
    id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
