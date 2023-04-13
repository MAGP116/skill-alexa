const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const speakOutput = messages.welcome.launch;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}