import { SESClient } from '@aws-sdk/client-ses';

const region = process.env.REGION;

/**
 * Client used for AWS SES to send emails
 */
const sesClient = new SESClient({ region: region });

export { sesClient };
