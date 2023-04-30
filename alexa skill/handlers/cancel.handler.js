const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const speakOutput = messages.cancel;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};