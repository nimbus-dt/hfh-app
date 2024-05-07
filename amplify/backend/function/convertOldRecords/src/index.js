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

const convertTestCycles = async () => {
    const getTestCyclesQuery = `
        query GetTestCyclesQuery {
            listTestCycles(filter: {closedCycleMessage: {attributeExists: false}}) {
                items {
                    id
                    closedCycleMessage
                }
            }
        }
    `

    const getTestCyclesOptions = {
        method: 'POST',
        headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query: getTestCyclesQuery })
    };

    const getTestCyclesRequest = new Request(GRAPHQL_ENDPOINT, getTestCyclesOptions);

    const getTestCyclesResponse = await fetch(getTestCyclesRequest);

    const getTestCyclesBody = await getTestCyclesResponse.json();

    const testCycles = getTestCyclesBody.data.listTestCycles.items;

    for (const testCycle of testCycles) {
        const updateTestCycleQuery = `
            mutation UpdateTestCycleMutation {
                updateTestCycle(input: {id: "${testCycle.id}", closedCycleMessage: "Cycle closed."}) {
                    id
                    closedCycleMessage
                }
            }
        
        `

        const updateTestCycleOptions = {
            method: 'POST',
            headers: {
            'x-api-key': GRAPHQL_API_KEY,
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: updateTestCycleQuery })
        };

        const updateTestCycleRequest = new Request(GRAPHQL_ENDPOINT, updateTestCycleOptions);

        const updateTestCycleResponse = await fetch(updateTestCycleRequest);

        const updateTestCycleBody = await updateTestCycleResponse.json();

        console.log('===== Updated Test Cycle =====', updateTestCycleBody)
    }
}

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        await convertTestCycles();

        return {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
            body: "Records Converted Successfully!",
        };    
    } catch (error) {
        console.log('===== Error Ocurred =====', error)
        return {
            statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
            body: "An error ocurred while converting the records.",
        };    
    }
    
};
