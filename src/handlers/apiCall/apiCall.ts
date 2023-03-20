import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getMovieData, getUpcomingMoviesByGenres } from './services/getMovieData';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let genres;

    try {
        if (event.body) {
            let body = JSON.parse(event.body);
            genres = body.genres;
            console.log(`genres from event body: ${JSON.stringify(genres)}`);
        }

        const data = await getUpcomingMoviesByGenres(genres);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: data,
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
