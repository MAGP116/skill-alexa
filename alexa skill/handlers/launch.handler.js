const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const speakOutput = messages.welcome.launch;
        //TODO: GET USER ID FROM DB AND SAVE IT IN ATTRIBUTES
        let attributes = {"user":0};
        handlerInput.attributesManager.setSessionAttributes(attributes);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}