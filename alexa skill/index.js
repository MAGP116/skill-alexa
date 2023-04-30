const Alexa = require('ask-sdk');

const LaunchRequestHandler = require('./handlers/launch.handler');
const StoryIntentHandler = require('./handlers/story.handler');
const TestIntentHandler = require('./handlers/test.handler');
const HelpIntentHandler = require('./handlers/help.handler');
const CancelAndStopIntentHandler = require('./handlers/cancel.handler');
const FallbackIntentHandler = require('./handlers/fallback.handler');
const SessionEndedRequestHandler = require('./handlers/sessionEnded.handler');
const IntentReflectorHandler = require('./handlers/intentReflector.handler');
const ErrorHandler = require('./handlers/error.handler');

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        StoryIntentHandler,
        TestIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();