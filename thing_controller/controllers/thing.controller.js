var IotApi = require('@arduino/arduino-iot-client');
var axios = require('axios');

class Thing {
    #client = null;
    #clientid = null;
    #secret = null;

    constructor(clientid, secret) {
        this.#clientid = clientid;
        this.#secret = secret

    }

    async #getToken() {
        try {
            console.log("getting access token")
            const response = await axios.post("https://api2.arduino.cc/iot/v1/clients/token", {
                grant_type: 'client_credentials',
                client_id: this.#clientid,
                client_secret: this.#secret,
                audience: 'https://api2.arduino.cc/iot'

            },
                {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                })
            console.log("Access token got successfully")
            return response["data"]['access_token'];
        }
        catch (error) {
            console.error("Failed getting an access token: " + error)
        }
        return null;
    }

    async #getClient() {
        if (this.#client) {
            return this.#client;
        }
        this.#client = IotApi.ApiClient.instance;
        // Configure OAuth2 access token for authorization: oauth2
        var oauth2 = this.#client.authentications['oauth2'];
        oauth2.accessToken = await this.#getToken();
        return this.#client;
    }

    async listProperties(thingId) {
        var api = new IotApi.PropertiesV2Api(await this.#getClient())
        var opts = {
            'showDeleted': false // {Boolean} If true, shows the soft deleted properties
        };

        try {
            console.log("Getting list of properties");
            const data = await api.propertiesV2List(thingId, opts);
            console.log('API called successfully.');
            return data;
        }
        catch (error) {
            console.log(`Failed getting property list for thing ${thingId}: ${error}`)
        }
        return [];
    }

    async listThings() {
        var api = new IotApi.ThingsV2Api(await this.#getClient());
        var opts = {
            'showDeleted': false, // {Boolean} If true, shows the soft deleted things
            'showProperties': true, // {Boolean} If true, returns things with their properties, and last values
        };
        try {
            console.log("Getting list of things");
            let things = await api.thingsV2List(opts);
            console.log('API called successfully.');
            return things;
        }
        catch (error) {
            console.log(`Failed getting list of things: ${error}`)
        }
        return [];
    }

    async updateProperty(thingId, propertyId, value) {
        var api = new IotApi.PropertiesV2Api(await this.#getClient());
        var propertyValue = { "value": value }; // {PropertyValue} 
        try {
            console.log("updating property");
            await api.propertiesV2Publish(thingId, propertyId, propertyValue);
            console.log('API called successfully.');
        } catch (error) {
            console.log(`Failed updating  thing "${thingId}" properties' "${propertyId}": ${error}`)
        }
    }

    async findThing(thingName){
        let things = await this.listThings();
        for(let thing of things){
            if(thing.name === thingName){
                return thing;
            }
        }
        return null;
    }

    async findProperties(thingName, typeList){
        let properties = {}
        let thing = await this.findThing(thingName);
        if(!thing){
            return null;
        }

        for(let property of thing.properties){
            if(typeList.includes(property.type)){
                if(!properties[property.type]){
                    properties[property.type] = [];
                }
                properties[property.type].push({
                    id: property.id,
                    thingId: property.thing_id
                })
            }
        }
        return properties;
        
    }
}

module.exports = Thing;