import { Movie } from '../../types/movie';

export const filterMoviesByGenre = (genres: number[], movies: Movie[]): any => {
    const moviesByGenre = movies.filter((movie: Movie) => genres.some((genre) => movie.genre_ids.includes(genre)));
    return moviesByGenre;
};

/**
 * Filter movies by future release date based on current date
 * @param movies An array of movies to filter
 * @returns An array of movies releasing in the future
 */
export const filterMoviesByFutureDate = (movies: Movie[]) => {
    const currentDate = new Date();
    const moviesInFuture = movies.filter((movie: Movie) => {
        const givenDate = new Date(movie.release_date);
        const isInFuture = givenDate.getTime() > currentDate.getTime();
        return isInFuture;
    });
    return moviesInFuture;
};
