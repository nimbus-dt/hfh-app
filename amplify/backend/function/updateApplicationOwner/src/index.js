/* Amplify Params - DO NOT EDIT
	API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HFHAPP_GRAPHQLAPIIDOUTPUT
	API_HFHAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import old_users from './old_users.json' assert { type: "json" };

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const GRAPHQL_ENDPOINT = process.env.API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_HFHAPP_GRAPHQLAPIKEYOUTPUT;
const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
        const testApplicationsQuery = /* GraphQL */ `
          query MyQuery {
            listTestApplications(limit: 10000) {
              items {
                id
                ownerID 
                _version
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

        const testApplications = testApplicationsBody.data.listTestApplications.items;

        for (const testApplication of testApplications) {
            const oldUser = old_users.find(user => user['cognito:username'] === testApplication.ownerID);

            if(oldUser) {
                const listUsers = await cognito.listUsers({
                    AttributesToGet: ['email', 'sub'],
                    'Filter': `"email"="${oldUser.email}"`,
                    'UserPoolId': process.env.AUTH_HFHAPP_USERPOOLID,
                })
    
                const user = listUsers.Users[0]

                console.log('user', user);

                console.log('oldUser', oldUser);

                const updateTestApplicationMutation = `
                    mutation UpdateTestApplicationMutation {
                        updateTestApplication(input: {id: "${testApplication.id}", ownerID: "${user.Username}", _version: ${testApplication._version}}) {
                            id
                            ownerID
                        }
                    }
                
                `
        
                const updateTestApplicationOptions = {
                    method: 'POST',
                    headers: {
                    'x-api-key': GRAPHQL_API_KEY,
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ query: updateTestApplicationMutation })
                };
        
                const updateTestApplicationRequest = new Request(GRAPHQL_ENDPOINT, updateTestApplicationOptions);
        
                const updateTestApplicationResponse = await fetch(updateTestApplicationRequest);
        
                const updateTestApplicationBody = await updateTestApplicationResponse.json();
        
                console.log('===== Updated Test Application =====', updateTestApplicationBody)
            }else{
                console.log('User not found', testApplication.ownerID)
            }

        }

        return {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
            body: JSON.stringify('Update completed successfully.'),
        };
    } catch (error) {
        console.log('error', error)

        return {
            statusCode: 500,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
            body: JSON.stringify({message: 'Internal error', cause: error}),
        };
    }
};
