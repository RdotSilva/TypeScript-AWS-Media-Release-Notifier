import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

import { sesClient } from '../libs/sesClient';

const { SOURCE_EMAIL } = process.env;

const generateEmailCommand = (email: string, subject: string, body: string): SendEmailCommandInput => {
    const params = {
        Destination: {
            ToAddresses: [email],
        },
        // Interpolate the data in the strings to send
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: { Data: subject },
        },
        Source: SOURCE_EMAIL,
    };

    return params;
};

const params = generateEmailCommand('todo@todo.com', 'New Release Subject', 'New Release Body');

/**
 * Send an outgoing email using SES
 */
export const sendOutgoingEmail = async () => {
    const sendCommand = new SendEmailCommand(params);

    try {
        await sesClient.send(sendCommand);
    } catch (error) {
        console.log(`Unable to send email: ${JSON.stringify(error)}`);
    }
};
