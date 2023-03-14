import axios, { AxiosRequestConfig } from 'axios';
import { Genres, genres } from '../data/genres';
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

export const getUpcomingMovies = async (genre: any) => {
    const baseURL = 'https://api.themoviedb.org';

    const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${baseURL}/3/movie/upcoming`,
        params: {
            api_key: process.env.API_KEY,
        },
    };

    const genreType: any = genres[genre as keyof Genres];

    try {
        const { data } = await axios(axiosConfig);
        const allUpcomingMovies = data.results;
        const filteredByGenre = filterMoviesByGenre(genreType, allUpcomingMovies);
        return filteredByGenre;
    } catch (error: any) {
        console.log(error);
        throw new Error(`Unable to fetch data: ${error}`);
    }
};
