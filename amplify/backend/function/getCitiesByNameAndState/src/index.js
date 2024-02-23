

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import cities from './assets/cities.json' assert { type: "json" };

export const handler = async (event) => {
    const { cityNameQuery, state } = event.queryStringParameters;
    
    const filteredCities = [];
    
    for(const city of cities){
        const cityName = city.city.toLowerCase();
        if(cityName.includes(cityNameQuery.toLowerCase()) && city.state_id === state){
            filteredCities.push(city);
            
            if(filteredCities.length >= 16){
                break;
            }
        }
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(filteredCities),
    };
};
