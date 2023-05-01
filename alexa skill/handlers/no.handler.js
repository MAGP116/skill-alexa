const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);

        return handlerInput.responseBuilder
            .speak(messages.quiestion.answerNo)
            .getResponse();
    }
};