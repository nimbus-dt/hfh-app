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
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

const GRAPHQL_ENDPOINT = process.env.API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_HFHAPP_GRAPHQLAPIKEYOUTPUT;
const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
    const { cycle } = event.queryStringParameters;
    
    const testApplicationsQuery = /* GraphQL */ `
    query MyQuery {
        listTestApplications(
          filter: {testcycleID: {eq: "${cycle}"}, type: {eq: ONLINE}},
          limit: 10000
        ) {
          items {
            ownerID
            reviewStatus
            submissionStatus
          }
        }
      }      
    `;

    const testApplicationsOptions = {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: testApplicationsQuery })
    };
  
    const testApplicationsRequest = new Request(GRAPHQL_ENDPOINT, testApplicationsOptions);

    const testApplicationsResponse = await fetch(testApplicationsRequest);

    const testApplicationsBody = await testApplicationsResponse.json();

    const formattedApplications = []

    for (const item of testApplicationsBody.data.listTestApplications.items) {
        const user = await cognito.adminGetUser({
            Username: item.ownerID,
            UserPoolId: process.env.AUTH_HFHAPP_USERPOOLID,
          });
      
        const { Value: email } = user.UserAttributes.find(
            (userAttribute) => userAttribute.Name === 'email'
        );

        formattedApplications.push({email, reviewStatus: item.reviewStatus, submissionStatus: item.submissionStatus});
    }


    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(formattedApplications),
    };
};
