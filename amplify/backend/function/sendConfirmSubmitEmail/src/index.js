/* Amplify Params - DO NOT EDIT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

const ses = new SESClient({ region: 'us-east-1' });
const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
  
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    const dynamoRecord = record.dynamodb;
    console.log('DynamoDB Record: %j', dynamoRecord);
    if(dynamoRecord.OldImage.submissionStatus.S !== dynamoRecord.NewImage.submissionStatus.S && dynamoRecord.NewImage.submissionStatus.S === "SUBMITTED"){
      console.log("Application was submitted.")
      try {
        const userSub = dynamoRecord.NewImage.ownerID.S;

        const user = await cognito.adminGetUser({
          Username: userSub,
          UserPoolId: process.env.AUTH_HFHAPP_USERPOOLID,
        });
    
        const { Value: email } = user.UserAttributes.find(
          (userAttribute) => userAttribute.Name === 'email'
        );
    
        const command = new SendEmailCommand({
          Destination: {
            ToAddresses: [email],
          },
          Message: {
            Body: {
              Html: {
                Data: `<div><span>Hello,</span><br/><p>Your submission for your Habitat for Humanity application was uploaded succesfully.</p><br/><span>Thanks,</span><br/><span>Habitat name</span></div>`,
              },
            },
    
            Subject: { Data: "Habitat for Humanity Application Submitted" },
          },
          Source: process.env.SES_EMAIL,
        });
    
        await ses.send(command);
    
        console.log("Email successfuly sended.")
      } catch (error) {
        console.log("Error while sending confirmation email:", error)
      }
    }
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
