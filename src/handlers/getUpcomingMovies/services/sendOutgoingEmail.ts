import { SendEmailCommand, SendEmailCommandInput } from '@aws-sdk/client-ses';

import { sesClient } from '../libs/sesClient';
import { emailSubject } from '../constants';

const { SOURCE_EMAIL } = process.env;

const generateEmailCommand = (email: string, body: string): SendEmailCommandInput => {
    const params = {
        Destination: {
            ToAddresses: [SOURCE_EMAIL!],
        },
        // Interpolate the data in the strings to send
        Message: {
            Body: {
                Text: {
                    Data: body,
                },
            },
            Subject: { Data: emailSubject },
        },
        Source: email,
    };

    return params;
};

const params = generateEmailCommand('todo@todo.com', 'New Release Body');

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
