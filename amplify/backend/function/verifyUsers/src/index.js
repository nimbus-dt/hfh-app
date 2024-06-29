/* Amplify Params - DO NOT EDIT
	API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HFHAPP_GRAPHQLAPIIDOUTPUT
	API_HFHAPP_GRAPHQLAPIKEYOUTPUT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_HFHAPP_GRAPHQLAPIKEYOUTPUT;

function deepEqual(obj1, obj2) {
  // Base case: If both objects are identical, return true.
  if (obj1 === obj2) {
    return true;
  }
  // Check if both objects are objects and not null.
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }
  // Get the keys of both objects.
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Check if the number of keys is the same.
  if (keys1.length !== keys2.length) {
    return false;
  }
  // Iterate through the keys and compare their values recursively.
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  // If all checks pass, the objects are deep equal.
  return true;
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async event => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  for (const record of event.Records) {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log("DynamoDB Record: %j", record.dynamodb);

    if(record.eventName !== "MODIFY") {
      return Promise.resolve("Record is not a MODIFY event, No action required.");
    }

    const NewImage = record?.dynamodb?.NewImage;
    const OldImage = record?.dynamodb?.OldImage;
    const NewUsers = NewImage?.users?.L;
    const OldUsers = OldImage?.users?.L;

    if (deepEqual(NewUsers, OldUsers)) {
      return Promise.resolve("Users are the same, No action required.");
    }

    for (const user of NewUsers) {
      const userSub = user.S;

      const query = /* GraphQL */ `
        query GetUser($id: ID!) {
          getUser(id: $id) {
            id
            email
          }
        }
      `;

      const variables = { id: userSub };

      const options = {
        method: 'POST',
        headers: {
          'x-api-key': GRAPHQL_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables })
      };

      const request = new Request(GRAPHQL_ENDPOINT, options);

      const response = await fetch(request);

      const body = await response.json();
      console.log(JSON.stringify(body));
    }
  }
  return Promise.resolve('Successfully processed DynamoDB record');
};
