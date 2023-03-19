export const filterMoviesByGenre = (genres: number[], movies: any): any => {
    const moviesByGenre = movies.filter((movie: any) => genres.some((genre) => movie.genre_ids.includes(genre)));
    return moviesByGenre;
};

export const filterMoviesByFutureDate = (movieDate: any) => {
    const givenDate = new Date(movieDate);
    const currentDate = new Date();
    return givenDate.getTime() > currentDate.getTime();
};
