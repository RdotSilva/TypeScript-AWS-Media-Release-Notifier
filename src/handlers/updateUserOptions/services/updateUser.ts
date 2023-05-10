const AWS = require('aws-sdk');
import { v4 as uuidv4 } from 'uuid';

const dynamo = new AWS.DynamoDB.DocumentClient();

const updateUser = async (data: any) => {
    const userId = data.userId || uuidv4();

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            userId,
        },
    };

    try {
        let result = await dynamo.get(params).promise();

        if (result.Item) {
            // user exists, update record
            const updateParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Key: {
                    userId,
                },
                UpdateExpression: 'set #g = :genres',
                ExpressionAttributeNames: {
                    '#g': 'genres',
                },
                ExpressionAttributeValues: {
                    ':genres': data.genres,
                },
            };

            await dynamo.update(updateParams).promise();
        } else {
            // user doesn't exist, create new record
            const createParams = {
                TableName: process.env.DYNAMODB_TABLE,
                Item: {
                    userId,
                    genres: data.genres,
                },
                ConditionExpression: 'attribute_not_exists(userId)',
            };

            await dynamo.put(createParams).promise();
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User added/updated successfully' }),
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error adding/updating user' }),
        };
    }
};
