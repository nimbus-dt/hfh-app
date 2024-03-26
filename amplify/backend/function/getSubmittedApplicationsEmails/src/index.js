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
    try {
        const { cycle, status, limit, nextToken } = event.queryStringParameters;
    
        const variables = {
          filter: {
            testcycleID: { eq: cycle },
            type: { eq: "ONLINE" }
          },
          limit: limit || 10000,
        };

        if (status) {
          variables.filter.submissionStatus = { eq: status };
        }

        if (nextToken) {
          variables.nextToken = nextToken;
        }

        const testApplicationsQuery = /* GraphQL */ `
          query MyQuery($filter: ModelTestApplicationFilterInput, $limit: Int, $nextToken: String) {
            listTestApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
              items {
                id
                ownerID
                reviewStatus
                submissionStatus
              }
              nextToken
            }
          }
        `;

        const testApplicationsOptions = {
          method: 'POST',
          headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: testApplicationsQuery, variables })
        };
      
        const testApplicationsRequest = new Request(GRAPHQL_ENDPOINT, testApplicationsOptions);

        const testApplicationsResponse = await fetch(testApplicationsRequest);

        const testApplicationsBody = await testApplicationsResponse.json();

        const formattedApplications = []

        for (const item of testApplicationsBody.data.listTestApplications.items) {
            console.log('item', item)
            const applicantInfoQuery = /* GraphQL */ `
              query GetApplicantInfoQuery {
                listApplicantInfos(filter: {ownerID: {eq: "${item.id}"}}) {
                  items {
                    props
                  }
                }
              }
            `;

            console.log('query', applicantInfoQuery)

            const applicantInfoOptions = {
              method: 'POST',
              headers: {
                'x-api-key': GRAPHQL_API_KEY,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ query: applicantInfoQuery })
            };
          
            const applicantInfoRequest = new Request(GRAPHQL_ENDPOINT, applicantInfoOptions);

            const applicantInfoResponse = await fetch(applicantInfoRequest);

            const applicantInfoBody = await applicantInfoResponse.json();

            console.log('applicantInfoBody', applicantInfoBody)

            const fullName = applicantInfoBody.data.listApplicantInfos.items[0] && JSON.parse(applicantInfoBody.data.listApplicantInfos.items[0]?.props).basicInfo?.fullName;

            const user = await cognito.adminGetUser({
                Username: item.ownerID,
                UserPoolId: process.env.AUTH_HFHAPP_USERPOOLID,
              });
          
            const { Value: email } = user.UserAttributes.find(
                (userAttribute) => userAttribute.Name === 'email'
            );

            formattedApplications.push({email, reviewStatus: item.reviewStatus, submissionStatus: item.submissionStatus, fullName});
        }


        console.log(`EVENT: ${JSON.stringify(event)}`);
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify(formattedApplications),
            nextToken: testApplicationsBody.data.listTestApplications.nextToken
        };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: error.message,
      };
    }
    
};
