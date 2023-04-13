const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
const PR = require('../controllers/progressiveResponse.controller');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TestIntent';
    },
    async handle(handlerInput) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const speakOutput = 'Hola esta es una prueba';
        const pr = new PR(handlerInput);
        try {
            //Call the progressive response service
            await pr.SendSpeech(messages.wait.wait30s)

        } catch (err) {
            // if it failed we can continue, just the user will wait longer for the first response
            console.log("error : " + err);
        }
        await sleep(30000);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt(speakOutput)
            .getResponse();
    }
};


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve(), milliseconds));
}