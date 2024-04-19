/* Amplify Params - DO NOT EDIT
	API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HFHAPP_GRAPHQLAPIIDOUTPUT
	API_HFHAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const GRAPHQL_ENDPOINT = process.env.API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_HFHAPP_GRAPHQLAPIKEYOUTPUT;

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const getOnlineTestApplicationsQuery = `
        query GetOnlineTestApplicationsQuery {
            listTestApplications(filter: {type: {eq: ONLINE}}) {
                items {
                    id
                    ownerID
                }
            }
        }
    `

    const getOnlineTestApplicationsOptions = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: getOnlineTestApplicationsQuery })
      };

    const getOnlineTestApplicationsRequest = new Request(GRAPHQL_ENDPOINT, getOnlineTestApplicationsOptions);

    const getOnlineTestApplicationsResponse = await fetch(getOnlineTestApplicationsRequest);

    const getOnlineTestApplicationsBody = await getOnlineTestApplicationsResponse.json();

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(getOnlineTestApplicationsBody),
    };
};
