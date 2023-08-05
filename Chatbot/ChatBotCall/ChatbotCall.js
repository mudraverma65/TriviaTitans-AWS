const AWS = require('aws-sdk');
const lexClient = new AWS.LexRuntimeV2({ region: 'us-east-1' });

exports.handler = async (event) => {
    const body = event.body ? JSON.parse(event.body) : event;
    const message = body.message;
    const userId = body.userId;

    if (!userId || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid request' }),
        };
    }

    try {
        const lexParams = {
            botAliasId: 'TSTALIASID',
            botId: '5SVLQ9NRNX',
            localeId: 'en_US',
            sessionId: userId,
            text: message,
        };

        const lexResponse = await lexClient.recognizeText(lexParams).promise();
        const botMessage = lexResponse.messages[0].content;

        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*', // Change this to your allowed origin
              "Access-Control-Allow-Headers" : "Content-Type",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: botMessage,
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal server error' }),
        };
    }
};