let colors = require("./colors");

let components = {
    colored_light: "HOME_COLORED_LIGHT",
    switch: "HOME_SWITCH",
}

let actions = {
    //Switch components
    turn_on_switch: { component: components.switch, value: true },
    turn_off_switch: { component: components.switch, value: false },

    wind: { component: components.switch, value: true, duration: 3.0 },

    //Change colored light
    turn_on_light: { component: components.colored_light, value: colors.default },
    turn_off_light: { component: components.colored_light, value: colors.off },

    //change color (colored light)
    forest: { component: components.colored_light, value: colors.green_forest },
    white_thunder_on: { component: components.colored_light, value: colors.white_thunder_on, duration: 1.0 },
    white_thunder_off: { component: components.colored_light, value: colors.white_thunder_off },
    yellow_thunder_on: { component: components.colored_light, value: colors.yellow_thunder_on, duration: 1.0 },
    yellow_thunder_off: { component: components.colored_light, value: colors.yellow_thunder_off },
    ocean_day: { component: components.colored_light, value: colors.dark_blue_high },
    ocean_night: { component: components.colored_light, value: colors.dark_blue_soft },
    rain: { component: components.colored_light, value: colors.rain },
    gold: { component: components.colored_light, value: colors.gold },
    fire: { component: components.colored_light, value: colors.fire },
    day: { component: components.colored_light, value: colors.light_blue_high },
    dark: { component: components.colored_light, value: colors.dark },
    ocean: { component: components.colored_light, value: colors.ocean },
    beach: { component: components.colored_light, value: colors.sun_day },


}

for (const key in actions) {
    actions[key]["type"] = "action"
    if (!actions[key]["duration"]) {
        actions[key]["duration"] = 0.0
    }
}

module.exports = actions;