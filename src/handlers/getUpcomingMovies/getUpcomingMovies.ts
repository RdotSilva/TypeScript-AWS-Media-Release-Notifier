import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUpcomingMoviesByGenres } from './services/getUpcomingMovies';
import { CloneReceiptRuleSetCommand, SendEmailCommand } from '@aws-sdk/client-ses';

import { sesClient } from './libs/sesClient';

const { SOURCE_EMAIL } = process.env;

/**
 * Fetch upcoming movies based on genres
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let genres;

    // SES logic
    const params = {
        Destination: {
            ToAddresses: ['todo@todo.com'],
        },
        // Interpolate the data in the strings to send
        Message: {
            Body: {
                Text: {
                    Data: `New Release Data Goes Here`,
                },
            },
            Subject: { Data: `Release Notifier - New Release Found!` },
        },
        Source: SOURCE_EMAIL,
    };

    const sendCommand = new SendEmailCommand(params);

    try {
        await sesClient.send(sendCommand);
    } catch (error) {
        console.log(`Unable to send email: ${JSON.stringify(error)}`);
    }

    try {
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
