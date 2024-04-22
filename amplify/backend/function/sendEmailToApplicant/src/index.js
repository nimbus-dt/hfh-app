/* Amplify Params - DO NOT EDIT
	AUTH_HFHAPP_USERPOOLID
	ENV
	REGION
	STORAGE_S3HFHAPPSTORAGEBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT */

/* eslint-disable import/no-extraneous-dependencies */
// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import * as aws from '@aws-sdk/client-ses';
import { S3Client, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { defaultProvider } from '@aws-sdk/credential-provider-node'
import nodemailer from 'nodemailer'
import { v4 } from 'uuid';

const ses = new aws.SES({ region: 'us-east-1', defaultProvider });
const s3 = new S3Client({});
const cognito = new CognitoIdentityProvider();

const replaceBase64WithCID = async (htmlString) => {
  let newHtmlString = htmlString;

  const attachments = [];

  const imgRegex = /<img([\w\W]+?)[/]?>/g;

  const foundImgElements = htmlString.match(imgRegex);

  if (foundImgElements) {
    for (const imgString of foundImgElements) {
      const base64Regex = /(?<=src=")(.*?)(?=")/g;

      const blobSrcs = imgString.match(base64Regex);

      if (blobSrcs) {
        const imgSrc = blobSrcs[0];

        if(imgSrc.startsWith('data:')){
          const dataNameRegex = /(?<=data-name=")(.*?)(?=")/g;
  
          const name = imgString.match(dataNameRegex)[0];

          const uuid = v4();

          const cid = `cid:${uuid}`;
  
          newHtmlString = newHtmlString.replace(imgSrc, cid);

          attachments.push({
            filename: name,
            path: imgSrc,
            cid: uuid
          })
        }

      }
    }
  }

  return [newHtmlString, attachments];
};

const deleteFilesFromKeys = async (keys) => {
  const promisesArr = keys.map((key) =>
      s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.STORAGE_S3HFHAPPSTORAGEBUCKET_BUCKETNAME,
          Key: key,
        })
      )
    );

  const results = await Promise.all(promisesArr);

  return results;
}

const getFilesFromKeys = async (keys) => {
  const promisesArr = keys.map((key) =>
      s3.send(
        new GetObjectCommand({
          Bucket: process.env.STORAGE_S3HFHAPPSTORAGEBUCKET_BUCKETNAME,
          Key: key,
        })
      )
    );

  const results = await Promise.all(promisesArr);

  return results;
}

export const handler = async (event) => {
  const { subject, body, keys, sub, habitat } = JSON.parse(event.body);
  try {
    const user = await cognito.adminGetUser({
      Username: sub,
      UserPoolId: process.env.AUTH_HFHAPP_USERPOOLID,
    });

    const { Value: email } = user.UserAttributes.find(
      (userAttribute) => userAttribute.Name === 'email'
    );

    const s3files = await getFilesFromKeys(keys || []);

    const [newHtml, attachments] = await replaceBase64WithCID(body);

    const mailOptions = {
        from: process.env.SES_EMAIL,
        subject: subject,
        html: `<div>${newHtml}<br/><span>${habitat}</span></div>`,
        to: email,
        attachments: [...s3files.map((s3file, index) => {
          const keyArr = keys[index].split('/');
          const filename = keyArr[keyArr.length - 1];
          return ({
          filename,
          content: s3file.Body
        })}), ...attachments]
    };

    console.log('Creating SES transporter');
    // create Nodemailer SES transporter
    var transporter = nodemailer.createTransport({
        SES: { ses, aws }
    });

    // send email
    const info = await transporter.sendMail(mailOptions);

    console.log('nodemailer info:', info.messageId);

    if(keys){
      await deleteFilesFromKeys(keys);
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: 'Email sended.',
    };
  } catch (error) {
    console.log('=== Error ===', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
      body: `An error occurred while sending the email.`,
    };
  }
};
