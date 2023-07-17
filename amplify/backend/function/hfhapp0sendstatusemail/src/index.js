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

const dynamodb = new aws.DynamoDB.DocumentClient();

const ses = new aws.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'MODIFY') {
      // Get items status parameter
      const { ownerID, submittedStatus } = streamedItem.dynamodb.NewImage;

      if (
        submittedStatus.S === 'ACCEPTED' ||
        submittedStatus.S === 'REJECTED'
      ) {
        // Get UserProp whose ownerID matches the ownerID of the item
        const userProp = await dynamodb
          .get({
            TableName: process.env.API_HFHAPP_USERPROPSTABLE_ARN,
            Key: { ownerID: ownerID.S },
          })
          .promise();

        // Get email from UserProp
        const email = userProp?.email;

        await ses
          .sendEmail({
            Destination: {
              ToAddresses: [email.S],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: 'Prescreen Notification' },
              Body: {
                Text: {
                  Data: `Hi ,\n\nA decision has been made to your Habitat Pre-Screen Form. Please access the login portal to revise your application status.\n\nThanks,\nThe Habitat Team`,
                },
              },
            },
          })
          .promise();
      }
    }
  }
  return { status: 'done' };
};
