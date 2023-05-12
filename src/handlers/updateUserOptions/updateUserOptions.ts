import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { updateUser } from './services/updateUser';

const AWS = require('aws-sdk');

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let data;

    if (event.body) {
        data = JSON.parse(event.body);
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'No Body' }),
        };
    }

    const res = await updateUser(data);

    return {
        statusCode: 200,
        body: res.body,
    };
};
