/* eslint-disable import/no-relative-packages */
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { DataStore } from 'aws-amplify';
import { UserProps } from '../../../../../src/models';

// eslint-disable-next-line import/no-unresolved
const aws = require('aws-sdk');

const ses = new aws.SES({ region: 'us-east-1' });

let userProps;

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      const ownerID = streamedItem.dynamodb.NewImage.ownerID.S;

      try {
        userProps = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(ownerID)
        );
      } catch (error) {
        console.log(`Error sending email: ${error}`);
      }

      await ses
        .sendEmail({
          Destination: {
            ToAddresses: ['jgavelarc@gmail.com'],
          },
          Source: process.env.SENDER_EMAIL,
          Message: {
            Subject: { Data: 'Prescreen Notification' },
            Body: {
              Text: {
                Data: `Hi ${ownerID},\n\nYour prescreen has been scheduled. Please check your calendar for details.\n\nThanks,\nYour Recruiting Team`,
              },
            },
          },
        })
        .promise();
    }
  }
  return { status: 'done' };
};
