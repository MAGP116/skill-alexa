const { DynamoDBClient, ListTablesCommand, ScanCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

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

    async getTales(ownerId) {
        const command = new ScanCommand(inputs.getTales(ownerId));
        const response = await this.#ddb.send(command);
        return response["Items"].map(e => ({
            "title": e["title"]["S"],
            "content": e["content"]["S"],
            "actions": JSON.parse((e["actions"] || {"S":"[]"})["S"])
        }));
    }

    async getTale(ownerId, title) {
        const command = new ScanCommand(inputs.getTale(ownerId, title));
        const response = await this.#ddb.send(command);
        return response["Items"].map(e => ({
            "title": e["title"]["S"],
            "content": e["content"]["S"],
            "actions": JSON.parse((e["actions"] || {"S":"[]"})["S"])
        }));
    }

    async putTale(title, content, ownerid, actions) {
        //console.log(JSON.stringify(actions,null,4))
        const taleid = (await this.#getMaxIdTale()) + 1;
        let input = inputs.putTale(taleid, title, content, ownerid, actions)
        const command = new PutItemCommand(input);
        console.log("saving tale");
        const response = await this.#ddb.send(command);
        console.log(response)
        return response;
    }

    async #getMaxIdTale() {
        const command = new ScanCommand(inputs.getMaxIdTale());
        const response = await this.#ddb.send(command);
        console.log(response);
        return Number(response["Items"][0]["tale_id"]["N"]);
    }
}

module.exports = new Database();

const inputs = {
    getTale: (ownerid, title) => ({
        "TableName": "tale",
        "ExpressionAttributeNames": {
            "#TL": "title",
            "#CT": "content",
            "#AC": "actions"
        },
        "ExpressionAttributeValues": {
            ":ow": { "N": `${ownerid}` },
            ":tl": { "S": `${title}` }
        },
        "FilterExpression": "owner_id = :ow and title = :tl",
        "ProjectionExpression": "#TL, #CT, #AC"
    }),
    getTales: (ownerid) => ({
        "TableName": "tale",
        "ExpressionAttributeNames": {
            "#TL": "title",
            "#CT": "content",
            "#AC": "actions"
        },
        "ExpressionAttributeValues": {
            ":ow": { "N": `${ownerid}` }
        },
        "FilterExpression": "owner_id = :ow",
        "ProjectionExpression": "#TL, #CT, #AC"
    }),
    getMaxIdTale: () => ({
        "TableName": "tale",
        "ExpressionAttributeNames": {
            "#ID": "tale_id",
        },
        "ScanIndexForward": "false",
        "ProjectionExpression": "#ID",
        "Limit": 1
    }),
    putTale: (tale_id, title, content, ownerid, actions) => ({
        "Item": {
            "owner_id": {
                "N": `${ownerid}`
            },
            "content": {
                "S": `${content}`
            },
            "title": {
                "S": `${title}`
            },
            "actions": {
                "S": `${JSON.stringify(actions)}`
            },
            "tale_id": {
                "N": `${tale_id}`
            }
        },
        "ReturnConsumedCapacity": "TOTAL",
        "TableName": "tale"
    })
}