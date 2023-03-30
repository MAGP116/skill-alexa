module.exports = class {
    constructor(handlerInput){
        this.directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();
        const requestEnvelope = handlerInput.requestEnvelope;
        this.requestId = requestEnvelope.request.requestId;
        this.endpoint = requestEnvelope.context.System.apiEndpoint;
        this.token = requestEnvelope.context.System.apiAccessToken;
    }

    _Send(content){
        let message = {
            "header": {
              "requestId": this.requestId,
            },
            "directive": content,
          };
        return this.directiveServiceClient.enqueue(message, this.endpoint, this.token);
    }

    SendSpeech(speech){
        return this._Send({ 
            "type":"VoicePlayer.Speak",
            "speech":speech
        })
    }
}