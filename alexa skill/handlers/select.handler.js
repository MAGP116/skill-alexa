const Alexa = require('ask-sdk');
const Messages = require('../utils/messages');
const {isAuthenticated} = require("../middlewares/auth.middleware");
const thing = require("../controllers/thing.controller");

module.exports = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.SelectIntent';
    },
    async handle(handlerInput) {
        return await (isAuthenticated(handler, handlerInput))();
    }
};

async function handler(handlerInput) {
    const messages = Messages(handlerInput.requestEnvelope.request.locale);
    let attributes = handlerInput.attributesManager.getSessionAttributes();
    const {ListPosition} = handlerInput.requestEnvelope.request.intent.slots;
    console.log(`Selecting item ${ListPosition.value - 1}`)
    
    if(!attributes.tales || !ListPosition ||attributes.tales.length < ListPosition.value){
        Console.log("select item failed");
        return handlerInput.responseBuilder
        .speak(messages.error.notFoundList)
        .getResponse();
    }

    let tale = attributes.tales[ListPosition.value - 1];

    attributes.lastIntent = "select";
    handlerInput.attributesManager.setSessionAttributes(attributes);

    //Send actions to arduino
    thing({"actions":tale.actions || [], "type": "actions", "user":attributes.user});

    return handlerInput.responseBuilder
        .speak(tale.content)
        .getResponse();
}