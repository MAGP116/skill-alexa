const Alexa = require('ask-sdk');
const PR = require('../controllers/progressiveResponse.controller');
const messages = require('../utils/messages');
const story = require('../controllers/story.controller');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StoryIntent';
    },
    async handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const pr = new PR(handlerInput);

        try {
            //Call the progressive response service
            await pr.SendSpeech(messages.wait.wait30s)

        } catch (err) {
            // if it failed we can continue, just the user will wait longer for the first response
            console.log("error : " + err);
        }
        try {
            let response = await story.createByConcept('oranges');
            console.log(`GPT usage:  ${response.usage}`);

            return responseBuilder
                .speak(response.content)
                .getResponse();

        } catch (err) {
            console.log(`Error processing events request: ${err}`);
            return responseBuilder
                .speak('error')
                .getResponse();
        }
    }
};

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve(), milliseconds));
}