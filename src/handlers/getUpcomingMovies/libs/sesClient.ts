import { SESClient } from '@aws-sdk/client-ses';

const region = process.env.REGION;
const sesClient = new SESClient({ region: region });

export { sesClient };
