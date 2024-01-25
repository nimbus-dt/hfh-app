/* Amplify Params - DO NOT EDIT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/* eslint-disable import/no-extraneous-dependencies */
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

const ses = new SESClient({ region: 'us-east-1' });
const cognito = new CognitoIdentityProvider();

export const handler = async (event) => {
  const { subject, body, sub } = JSON.parse(event.body);
  try {
    const user = await cognito.adminGetUser({
      Username: sub,
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
          Text: { Data: body },
        },

        Subject: { Data: subject },
      },
      Source: process.env.SES_EMAIL,
    });

    await ses.send(command);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: `Email sended.`,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: `An error occurred while sending the email. Error: ${error}`,
    };
  }
};
