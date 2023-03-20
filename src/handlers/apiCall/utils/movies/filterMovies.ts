export const filterMoviesByGenre = (genres: number[], movies: any): any => {
    const moviesByGenre = movies.filter((movie: any) => genres.some((genre) => movie.genre_ids.includes(genre)));
    return moviesByGenre;
};

export const filterMoviesByFutureDate = (movies: any) => {
    const currentDate = new Date();
    const moviesInFuture = movies.filter((movie: any) => {
        const givenDate = new Date(movie.release_date);
        const isInFuture = givenDate.getTime() > currentDate.getTime();
        return isInFuture;
    });
    return moviesInFuture;
};
