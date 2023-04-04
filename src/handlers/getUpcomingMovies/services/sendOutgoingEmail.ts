import { SendEmailCommand } from '@aws-sdk/client-ses';

import { sesClient } from '../libs/sesClient';

const { SOURCE_EMAIL } = process.env;

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
