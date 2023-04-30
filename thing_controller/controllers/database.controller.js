const { DynamoDBClient, ListTablesCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
var CryptoJS = require("crypto-js");

class Database {
    #ddb = null;
    constructor() {
        console.log("Getting database")
        this.#ddb = new DynamoDBClient({ region: process.env.REGION });
    }

    async listTables() {
        try {
            console.log("getting list of tables");
            const command = new ListTablesCommand({ Limit: 10 });
            const response = await this.#ddb.send(command)
            console.log(JSON.stringify(response, null, 4))
            return response["TableNames"] || [];
        } catch (error) {
            console.log("ERROR: " + error);
        }
        return [];
    }

    async getThings(ownerId) {
        const command = new ScanCommand(inputs.getThings(ownerId));
        const response = await this.#ddb.send(command);
        return response["Items"].map(e => ({
            "id": `${this.#decrypt(e["cloud_id"]["S"])}`,
            "secret": `${this.#decrypt(e["cloud_secret"]["S"])}`,
            "thing_id": e["thing_id"]["N"]
        }));
    }

    async getDevices(thingId) {
        const command = new ScanCommand(inputs.getDevices(thingId));
        const response = await this.#ddb.send(command);
        return response["Items"].map(e => ({
            "name": e["name"]["S"]
        }));
    }
    
    async getTales(ownerId){
        const command = new ScanCommand(inputs.getTales(ownerId));
        const response = await this.#ddb.send(command);
        return response["Items"].map(e => ({
            "title": e["title"]["S"],
            "content": e["content"]["S"]
        }));
    }

    async getTale(ownerId, title) {
        const command = new ScanCommand(inputs.getTale(ownerId, title));
        const response = await this.#ddb.send(command);
        return response["Items"].map(e => ({
            "title": e["title"]["S"],
            "content": e["content"]["S"]
        }));
    }

    #decrypt(ciphertext) {
        const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    #encrypt(plainText) {
        return CryptoJS.AES.encrypt(plainText, process.env.SECRET).toString();
    }
}

module.exports = new Database();

const inputs = {
    getThings: (ownerid) => ({
        "TableName": "things",
        "ExpressionAttributeNames": {
            "#CS": "cloud_secret",
            "#CI": "cloud_id",
            "#TI": "thing_id"
        },
        "ExpressionAttributeValues": {
            ":a": { "N": `${ownerid}` }
        },
        "FilterExpression": "owner_id = :a",
        "ProjectionExpression": "#CS, #CI, #TI"
    }),
    getDevices: (thingid) => ({
        "TableName": "devices",
        "ExpressionAttributeNames": {
            "#NM": "name"
        },
        "ExpressionAttributeValues": {
            ":a": { "N": `${thingid}` }
        },
        "FilterExpression": "thing_id = :a",
        "ProjectionExpression": "#NM"
    }),
    getTale: (ownerid, title) => ({
        "TableName": "tale",
        "ExpressionAttributeNames": {
            "#TL": "title",
            "#CT": "content"
        },
        "ExpressionAttributeValues": {
            ":ow": { "N": `${ownerid}` },
            ":tl": { "S": `${title}` }
        },
        "FilterExpression": "owner_id = :ow and title = :tl",
        "ProjectionExpression": "#TL, #CT"
    }),
    getTales: (ownerid) => ({
        "TableName": "tale",
        "ExpressionAttributeNames": {
            "#TL": "title",
            "#CT": "content"
        },
        "ExpressionAttributeValues": {
            ":ow": { "N": `${ownerid}` }
        },
        "FilterExpression": "owner_id = :ow",
        "ProjectionExpression": "#TL, #CT"
    })
}