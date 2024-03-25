/* Amplify Params - DO NOT EDIT
	API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HFHAPP_GRAPHQLAPIIDOUTPUT
	API_HFHAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { default as fetch, Request } from 'node-fetch';


const GRAPHQL_ENDPOINT = process.env.API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_HFHAPP_GRAPHQLAPIKEYOUTPUT;
const ses = new SESClient({ region: 'us-east-1' });
const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
  
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    const dynamoRecord = record.dynamodb;
    console.log('DynamoDB Record: %j', dynamoRecord);
    if(record.eventName === "MODIFY" && dynamoRecord.NewImage.submissionStatus.S === "SUBMITTED" && dynamoRecord.OldImage.submissionStatus.S !== dynamoRecord.NewImage.submissionStatus.S){
      console.log("Application was submitted.")
      try {
        const cycleQuery = /* GraphQL */ `
          query GET_CYCLE {
            getTestCycle(id: "${dynamoRecord.NewImage.testcycleID.S}") {
              habitatID
            }
          }
        `;

        const cycleOptions = {
          method: 'POST',
          headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: cycleQuery })
        };
      
        const cycleRequest = new Request(GRAPHQL_ENDPOINT, cycleOptions);

        const cycleResponse = await fetch(cycleRequest);

        const cycleBody = await cycleResponse.json();

        const habitatQuery = /* GraphQL */ `
          query GET_HABITAT {
            getHabitat(id: "${cycleBody.data.getTestCycle.habitatID}") {
              name
            }
          }
        `;

        const habitatOptions = {
          method: 'POST',
          headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: habitatQuery })
        };
      
        const habitatRequest = new Request(GRAPHQL_ENDPOINT, habitatOptions);

        const habitatResponse = await fetch(habitatRequest);

        const habitatBody = await habitatResponse.json();
    
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
                Data: `<div><span>Hello,</span><br/><p>Your submission for your Habitat for Humanity application was uploaded succesfully.</p><span>Thanks,</span><br/><span>${habitatBody.data.getHabitat.name}</span></div>`,
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
