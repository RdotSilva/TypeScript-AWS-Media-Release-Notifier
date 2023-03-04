import axios, { AxiosRequestConfig } from 'axios';

export const getCatData = async () => {
    const baseURL = 'https://cat-fact.herokuapp.com';

    const axiosConfig: AxiosRequestConfig = {
        method: 'get',
        url: `${baseURL}/facts`,
        // url: '/facts',
        // baseURL,
        // headers: {
        //     Authoorization: `${token}`
        // }
    };

    try {
        const { data } = await axios(axiosConfig);
        console.log(`Data from getCatData: ${data}`);
        return data;
    } catch (error: any) {
        console.log(error);
        throw new Error(`Unable to fetch data: ${error}`);
    }
};
