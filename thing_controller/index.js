const Thing = require("./controllers/thing.controller");
const Database = require("./controllers/database.controller");
const { setTimeout } = require("timers/promises");

let components = {
    colored_light: "HOME_COLORED_LIGHT",
    switch: "HOME_SWITCH",
    sleep: "sleep"
}

let types = {
    actions: {
        "method": processActions,
        "key": "actions"
    },
    test: {
        "method": test,
        "key": "actions"
    }
}

exports.handler = async (event) => {
    let action = types[event.type] || null;

    if (!action) {
        return {
            statusCode: 400,
            body: JSON.stringify('Bar Request'),
        };
    }

    await action["method"](event[action["key"]]);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
    return response;
};

async function processActions(actions) {
    console.log(actions);

    //TODO, chnage this to get the user from dynamodb
    const thing = new Thing(process.env.ARDUINO_ID, process.env.ARDUINO_SECRET);
    //TODO: CHANGE THIS TO GET IT FROM DYNAMODB, also ids
    const NAME = "Untitled"

    const properties = await thing.findProperties(NAME, [components.colored_light, components.switch]);
    for (let action of actions || []) {
        if (action.component === components.sleep) {
            await sleep(action.duration);
        }
        else {
            let actuators = properties[action.component] || [];
            console.log(`Updating values for actuator '${action.component}' to value '${action.value}'`);
            for (const actuator of actuators) {
                await thing.updateProperty(actuator.thingId, actuator.id, action.value);
            }
        }
    }
}

async function test(actions) {
    let db = Database();
    console.log(await db.listTables());
}

async function sleep(seconds) {
    console.log(`sleeping ${seconds} seconds`);
    let milliseconds = Math.trunc(seconds * 1000);
    await setTimeout(milliseconds);
    console.log("waking up");
}
