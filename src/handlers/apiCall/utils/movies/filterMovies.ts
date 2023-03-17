export const filterMoviesByGenre = (genres: number[], movies: any): any => {
    const moviesByGenre = movies.filter((movie: any) => genres.some((genre) => movie.genre_ids.includes(genre)));
    return moviesByGenre;
};
