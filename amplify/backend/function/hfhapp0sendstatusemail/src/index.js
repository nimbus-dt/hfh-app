/* eslint-disable import/no-extraneous-dependencies */
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_HFHAPP_GRAPHQLAPIIDOUTPUT
	API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HFHAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_HFHAPP_USERPOOLID
	API_HFHAPP_CONTACTFORMTABLE_NAME
	API_HFHAPP_CONTACTFORMTABLE_ARN
	API_HFHAPP_USERPROPSTABLE_NAME
	API_HFHAPP_USERPROPSTABLE_ARN
	API_HFHAPP_DEBTRECORDTABLE_NAME
	API_HFHAPP_DEBTRECORDTABLE_ARN
	API_HFHAPP_SAVINGRECORDTABLE_NAME
	API_HFHAPP_SAVINGRECORDTABLE_ARN
	API_HFHAPP_INCOMERECORDTABLE_NAME
	API_HFHAPP_INCOMERECORDTABLE_ARN
	API_HFHAPP_HOUSEHOLDMEMBERTABLE_NAME
	API_HFHAPP_HOUSEHOLDMEMBERTABLE_ARN
	API_HFHAPP_APPLICATIONTABLE_NAME
	API_HFHAPP_APPLICATIONTABLE_ARN
	API_HFHAPP_HABITATTABLE_NAME
	API_HFHAPP_HABITATTABLE_ARN
	SES_EMAIL
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require('aws-sdk');

const ses = new aws.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      await ses
        .sendEmail({
          Destination: {
            ToAddresses: ['jgavelarc@gmail.com'],
          },
          Source: process.env.SES_EMAIL,
          Message: {
            Subject: { Data: 'Prescreen Notification' },
            Body: {
              Text: {
                Data: `Hi ,\n\nYour prescreen has been scheduled. Please check your calendar for details.\n\nThanks,\nYour Recruiting Team`,
              },
            },
          },
        })
        .promise();
    }
  }
  return { status: 'done' };
};
