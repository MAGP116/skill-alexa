const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
const db = require("../controllers/database.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListStoryIntent';
    },
    async handle(handlerInput) {
        return await (isAuthenticated(handler, handlerInput))();
    }
};

async function handler(handlerInput) {
    const messages = Messages(handlerInput.requestEnvelope.request.locale);
    let attributes = handlerInput.attributesManager.getSessionAttributes();

    let tales = (await db.getTales(attributes.user)) || [];

    if (tales.length === 0) {
        return handlerInput.responseBuilder
            .speak(messages.list.noStories)
            .getResponse();
    }
    let text = tales.map(e => e.title).join(", ");

    attributes.tales = tales;
    attributes.lastIntent = "listStory"
    handlerInput.attributesManager.setSessionAttributes(attributes);

    return handlerInput.responseBuilder
        .speak(messages.list.countStories(tales.length, text))
        .getResponse();
}