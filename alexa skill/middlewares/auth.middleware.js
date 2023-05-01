function isAuthenticated(handler, handlerInput){
    return ()=>{
        let attributes = handlerInput.attributesManager.getSessionAttributes();

        console.log("verifiying autentication");
        
        if(!attributes || (attributes && attributes.user === undefined)){
            return handlerInput.responseBuilder
            .speak(messages.error.noLogged)
            .getResponse();
        }
        return handler(handlerInput);
    }
}

module.exports = {isAuthenticated};