const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
module.exports = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const speakOutput = messages.error.error;
        console.log(`~~~~ Error handled: ${JSON.stringify(error.name)}`);
        console.log(error.message)

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};