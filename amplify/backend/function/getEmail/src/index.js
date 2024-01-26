/* Amplify Params - DO NOT EDIT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/* eslint-disable import/no-extraneous-dependencies */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
  const { sub } = event.queryStringParameters;
  try {
    const user = await cognito.adminGetUser({
      Username: sub,
      UserPoolId: process.env.AUTH_HFHAPP_USERPOOLID,
    });

    const { Value: email } = user.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'email'
    );

    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({ email }),
    };
  } catch {
    return {
      statusCode: 500,
      //  Uncomment below to enable CORS requests
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify(`Error ocurred while retrieving user's email.`),
    };
  }
};
