/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	ADMIN_EMAIL
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const ses = new SESClient({ region: 'us-east-1' });

export const handler = async (event) => {
    const { subject, body } = JSON.parse(event.body);
  try {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [process.env.ADMIN_EMAIL],

      },
      Message: {
        Body: {
          Html: {
            Data: body,
          },
        },

        Subject: { Data: subject },
      },
      Source: process.env.SES_EMAIL,
    });

    await ses.send(command);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: `Email sended.`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: `An error occurred while sending the email. Error: ${error}`,
    };
  }
};
