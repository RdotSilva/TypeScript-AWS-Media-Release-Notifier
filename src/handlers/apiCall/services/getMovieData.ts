import axios, { AxiosRequestConfig } from 'axios';

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
