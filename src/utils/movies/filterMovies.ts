const filterMoviesByGenre = (genre: string, movies: any): any => {
    const moviesByGenre = movies.filter((movie: any) => movie.genre === genre);
    return moviesByGenre;
};
