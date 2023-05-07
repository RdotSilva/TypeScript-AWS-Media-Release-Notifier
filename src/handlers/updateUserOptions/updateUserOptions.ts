import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamo = new AWS.DynamoDB.DocumentClient();

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

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: uuid.v1(),
                name: data.name,
                description: data.description,
            },
        };

        await dynamo.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User options updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating user options' }),
        };
    }
};
