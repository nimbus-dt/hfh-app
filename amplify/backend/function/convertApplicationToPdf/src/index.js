/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	API_HFHAPP_GRAPHQLAPIIDOUTPUT
	API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_HFHAPP_GRAPHQLAPIKEYOUTPUT
	PROD_DOMAIN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
import { default as fetch, Request } from 'node-fetch';
import _ from 'lodash';
import Chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

const GRAPHQL_ENDPOINT = process.env.API_HFHAPP_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_HFHAPP_GRAPHQLAPIKEYOUTPUT;
const PROD_DOMAIN = process.env.PROD_DOMAIN;

const getQuery = async (query) => {
    const options = {
        method: 'POST',
        headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
    };
    
    const request = new Request(GRAPHQL_ENDPOINT, options);

    const response = await fetch(request);

    const body = await response.json();

    return body;
}

const getApplication = async (applicationID) => {
    const applicationQuery = /* GraphQL */ `
        query MyQuery {
            getTestApplication(id: "${applicationID}") {
                FormAnswers {
                    items {
                        id
                        page
                        values
                    }
                }
                id
                testcycleID
            }
        }
    `;

    const applicationBody = await getQuery(applicationQuery);

    return applicationBody.data.getTestApplication;
}

const getCycle = async (cycleId) => {
    const cycleQuery = /* GraphQL */ `
        query MyQuery {
            getTestCycle(id: "${cycleId}") {
                id
                formUrl
            }
        }
    `;

    const cycleBody = await getQuery(cycleQuery);

    return cycleBody.data.getTestCycle;
}

export const generateSubmission = (formAnswers) => {
    const submissionData = {};
  
    for (const formAnswer of formAnswers) {
      if (formAnswer.page && formAnswer.values) {
        const jsonValues = JSON.parse(formAnswer.values);
        submissionData[formAnswer.page] = _.cloneDeep(jsonValues);
      }
    }
  
    const submission = {
      data: submissionData,
    };
  
    return submission;
};

async function getPDF(formUrl, submission, language) {
    const browser = await puppeteer.launch({
        args: Chromium.args,
        executablePath: await Chromium.executablePath(),
        headless: Chromium.headless
    });

    const page = await browser.newPage();

    await page.setCacheEnabled(false);

    const url = `${PROD_DOMAIN}/print?formUrl=${formUrl}${language ? `&language=${language}` : ''}`;

    await page.goto(url);

    await page.waitForSelector('.formio-form', {
        timeout: 300_000
    })

    await page.waitForFunction(() => window.hfhSetSubmission, {
        timeout: 120_000
    })

    await page.evaluate((submission) => window.hfhSetSubmission(submission), submission);

    await page.waitForSelector('a[href^="https://formio-bucket.s3.amazonaws.com/"]', {
        timeout: 300_000,
        hidden: true
    })

    const pdf = await page.pdf({ 
        format: 'A4', 
        margin: { top: 36, right: 48, bottom: 36, left: 48 },
        waitForFonts: true,
        printBackground: true,
    });
  
    await browser.close();

    return pdf
};  

export const handler = async (event) => {
    try {
        const { applicationId, language = 'en' } = event.queryStringParameters;
    
        const application = await getApplication(applicationId);
    
        const cycle = await getCycle(application.testcycleID);
    
        const formUrl = cycle.formUrl;
    
        const submission = generateSubmission(application.FormAnswers.items);
    
        const pdf = await getPDF(formUrl, submission, language);

        const base64Body = Buffer.from(pdf).toString('base64');
    
        console.log(`EVENT: ${JSON.stringify(event)}`);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                'Content-Type': 'application/pdf',
                'Content-Length': pdf.length,
            },
            body: base64Body,
            isBase64Encoded: true,
        };
    } catch (error) {
        console.log('=== ERROR ===', error)
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: "Error converting application to pdf.",
        };
    }
};
