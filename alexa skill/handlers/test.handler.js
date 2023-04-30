const Alexa = require('ask-sdk');
const thing = require('../controllers/thing.controller');
const Messages = require('../utils/messages');
const PR = require('../controllers/progressiveResponse.controller');
const story = require('../controllers/story.controller');

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TestIntent';
    },
    async handle(handlerInput) {
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const speakOutput = messages.test.answer;
        const pr = new PR(handlerInput);

        try {
            //Call the progressive response service
            await pr.SendSpeech(messages.wait.wait10s)

        } catch (err) {
            // if it failed we can continue, just the user will wait longer for the first response
            console.log("error : " + err);
        }
        let response = story.processStory(messages.test.tale);
        thing({ "actions": response.actions, "type": "test", "user": 0 });
        await sleep(10000);

        return handlerInput.responseBuilder
            .speak(response.speakText)
            //.reprompt(speakOutput)
            .getResponse();
    }
};


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve(), milliseconds));
}