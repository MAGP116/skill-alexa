const Alexa = require('ask-sdk');
const PR = require('../controllers/progressiveResponse.controller');
const Messages = require('../utils/messages');
const story = require('../controllers/story.controller');
const thing = require("../controllers/thing.controller");

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'StoryIntent';
    },
    async handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const messages = Messages(handlerInput.requestEnvelope.request.locale);
        const pr = new PR(handlerInput);
        const {concept} = handlerInput.requestEnvelope.request.intent.slots;

        try {
            //Call the progressive response service
            await pr.SendSpeech(messages.wait.wait10s)

        } catch (err) {
            // if it failed we can continue, just the user will wait longer for the first response
            console.log("error : " + err);
        }
        try {
            let response = await story.createByConcept(`${concept.value}`, messages.language, messages.prompt);
            console.log(`GPT usage:  ${response.usage}`);

            //Send actions to arduino
            //TODO GET USER FROM LOGIN
            thing({"actions":response.actions, "type": "actions", "user":0});

            //Send response to alexa
            return responseBuilder
                .speak(response.speakText)
                .getResponse();

        } catch (err) {
            console.log(`Error processing events request: ${err}`);
            return responseBuilder
                .speak('error')
                .getResponse();
        }
    }
};