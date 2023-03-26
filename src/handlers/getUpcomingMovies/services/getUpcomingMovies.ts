import axios, { AxiosRequestConfig } from 'axios';
import { Genres, genreList } from '../data/genres';
import { filterMoviesByFutureDate, filterMoviesByGenre } from '../utils/movies/filterMovies';

/**
 * Get a list of upcoming movies filtered by specific genres
 * @param incomingGenres The genres you want to filter
 * @returns All upcoming movies filtered by genres
 */
export const getUpcomingMoviesByGenres = async (incomingGenres: []) => {
    const baseURL = 'https://api.themoviedb.org';

    const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${baseURL}/3/movie/upcoming`,
        params: {
            api_key: process.env.API_KEY,
        },
    };

    const genreCodes = incomingGenres.map((genreName: string) => genreList[genreName as keyof Genres]);

    try {
        const { data } = await axios(axiosConfig);
        const allUpcomingMovies = data.results;
        const filteredByGenre = filterMoviesByGenre(genreCodes, allUpcomingMovies);
        const filteredByReleaseDate = filterMoviesByFutureDate(filteredByGenre);
        return filteredByReleaseDate;
    } catch (error: any) {
        console.log(error);
        throw new Error(`Unable to fetch data: ${error}`);
    }
};