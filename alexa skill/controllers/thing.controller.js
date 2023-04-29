const aws = require("aws-sdk");

module.exports = (params) => {
    var lambda = new aws.Lambda({
        region: process.env.REGION
    });

    try {
        console.log("calling lambda function")

        lambda.invoke({
            FunctionName: process.env.FUNCTION_NAME,
            InvocationType: "Event",
            Payload: JSON.stringify(params, null, 2) // Params
        }, function (error, data) {
            console.log("lambda function responded.")
            if (error) {
                console.log('error', error);
            }
            if (data.Payload) {
                console.log(data.Payload);
            }
        });

        console.log("continuing");

    } catch (err) {
        console.log("error : " + err);
    }
}