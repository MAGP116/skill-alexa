const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
const db = require("../controllers/database.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    async handle(handlerInput) {
        return await(isAuthenticated(handler, handlerInput))();
    }
};

async function handler(handlerInput) {
    const messages = Messages(handlerInput.requestEnvelope.request.locale);
    let attributes = handlerInput.attributesManager.getSessionAttributes();
    console.log("running yes handler")

    //Right now there is only one type of question, but if in the future there are multiple questions change next line
    if (!attributes.lastIntent || attributes.lastIntent !== "story") {
        return handlerInput.responseBuilder
            .speak(messages.error.error)
            .getResponse();
    }
    let { title, speakText, actions } = attributes.tale;
    await db.putTale(title, speakText, attributes.user, actions);

    return handlerInput.responseBuilder
        .speak(messages.question.answerYes)
        .getResponse();
}