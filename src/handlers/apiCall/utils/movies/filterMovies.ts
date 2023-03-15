export const filterMoviesByGenre = (genres: number[], movies: any): any => {
    // let arr1 = [1, 2, 3];
    // let arr2 = [2, 3];

    // let isFounded = arr1.some((ai) => arr2.includes(ai));
    // const found = arr1.some((r) => arr2.includes(r));

    const moviesByGenre = movies.filter((movie: any) => genres.some((genre) => movie.genre_ids.includes(genre)));
    return moviesByGenre;
};
