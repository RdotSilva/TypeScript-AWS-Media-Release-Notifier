export const filterMoviesByGenre = (genre: string, movies: any): any => {
    const moviesByGenre = movies.filter((movie: any) => movie.genre_ids.includes(genre));
    return moviesByGenre;
};
