const Thing = require("./controllers/thing.controller");
const db = require("./controllers/database.controller");
const { setTimeout } = require("timers/promises");

let components = {
    colored_light: "HOME_COLORED_LIGHT",
    switch: "HOME_SWITCH",
    sleep: "sleep"
}

let types = {
    actions: processActions,
    test: test

}

exports.handler = async (event) => {
    let action = types[event.type] || null;

    if (!action) {
        return {
            statusCode: 400,
            body: JSON.stringify('Bar Request'),
        };
    }

    await action(event);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
    return response;
};

async function processActions(event) {
    let {actions, user} = event;
    console.log(actions);

    const keys = (await db.getThings(user))[0];

    const device = (await db.getDevices(keys.thing_id))[0];

    const thing = new Thing(keys.id, keys.secret);

    const properties = await thing.findProperties(device.name, [components.colored_light, components.switch]);
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

async function test(event) {
    console.log("running test");

    const keys = (await db.getThings("0"))[0];
    const device = (await db.getDevices(keys.thing_id))[0];
    console.log(JSON.stringify(device, null, 4));

    const thing = new Thing(keys.id, keys.secret);
    const properties = await thing.findProperties(device.name, [components.colored_light, components.switch]);
    console.log(JSON.stringify(properties, null, 4));

    const tales = await db.getTales(0);
    console.log(JSON.stringify(tales,null,4));
}

async function sleep(seconds) {
    console.log(`sleeping ${seconds} seconds`);
    let milliseconds = Math.trunc(seconds * 1000);
    await setTimeout(milliseconds);
    console.log("waking up");
}
