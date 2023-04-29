const AWS = require('aws-sdk');

class Database{
    #ddb = null;
    constructor(){
        AWS.config.update({region: process.env.REGION});
        this.#ddb = new AWS.DynamoDB({});
    }

    async listTables(){
        try{
            return await this.#ddb.listTables({Limit:10});
        }catch(error){
            console.log("ERROR: "+ error);
        }
        return null;
    }
}

module.exports = Database;