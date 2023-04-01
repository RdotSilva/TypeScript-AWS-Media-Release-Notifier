import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUpcomingMoviesByGenres } from './services/getUpcomingMovies';
import { sendOutgoingEmail } from './services/sendOutgoingEmail';

/**
 * Fetch upcoming movies based on genres
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let genres;

    try {
        // Send email test
        await sendOutgoingEmail();

        if (event.body) {
            let body = JSON.parse(event.body);
            genres = body.genres;
        }

        const data = await getUpcomingMoviesByGenres(genres);

        // TODO: Send email containing data

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
