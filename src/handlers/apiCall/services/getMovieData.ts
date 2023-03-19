import axios, { AxiosRequestConfig } from 'axios';
import { Genres, genreList } from '../data/genres';
import { filterMoviesByGenre } from '../utils/movies/filterMovies';

export const getMovieData = async () => {
    const baseURL = 'https://api.themoviedb.org';

    const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${baseURL}/3/movie/603`,
        params: {
            api_key: process.env.API_KEY,
        },
    };

    try {
        const { data } = await axios(axiosConfig);
        console.log(`Data from getMovieData: ${data}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(`Unable to fetch data: ${error}`);
    }
};

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
        return filteredByGenre;
    } catch (error: any) {
        console.log(error);
        throw new Error(`Unable to fetch data: ${error}`);
    }
};
