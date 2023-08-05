const axios = require('axios');

exports.handler = async (event) => {
    const intent = event.interpretations[0].intent;
    const intentName = intent.name;
    const slots = intent.slots;
    const teamName = slots.teamname;

    const dialogAction = {};

    if (!teamName) {
        dialogAction.type = 'ElicitSlot';
        dialogAction.slotToElicit = 'teamname';  
        dialogAction.intentName = intentName;
        dialogAction.slots = slots;
    } else {
        dialogAction.type = 'Close';
    }

    const intentResponse = {
        name: intentName
    };

    if (!teamName) {
        intentResponse.confirmationState = 'None';
        intentResponse.state = 'InProgress';
    } else {
        intentResponse.confirmationState = 'Confirmed';
        intentResponse.state = 'Fulfilled';
    }

    const messages = [];

    if (!teamName) {
        messages.push({
            contentType: 'PlainText',
            content: 'Please provide the name of the team.'
        });
    } else {
        const teamNameValue = teamName.value.originalValue;

        const response = await axios.post("https://d6x5p3bllk.execute-api.us-east-1.amazonaws.com/prod/createtable", {
            teamname: teamNameValue
        });

        const team = response.data;

        if (!team) {
            messages.push({
                contentType: 'PlainText',
                content: `No scores found for the team.`
            });
        } else {
            var message = `Score for team ${teamNameValue} is ${team.totalScore} points.`;
            messages.push({
                contentType: 'PlainText',
                content: message
            });
        }
    }

    return {
        sessionState: {
            dialogAction,
            intent: intentResponse
        },
        messages: messages
    };
};
