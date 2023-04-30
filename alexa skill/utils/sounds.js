let sounds = {
    wind: { url: "soundbank://soundlibrary/nature/amzn_sfx_strong_wind_whistling_01", duration: 3.77},
    birds: { url: "soundbank://soundlibrary/animals/amzn_sfx_bird_forest_01", duration: 2.99},
    ocean: { url: "soundbank://soundlibrary/nature/amzn_sfx_ocean_wave_1x_01", duration: 2.54},
    water:{url:"soundbank://soundlibrary/water/nature/nature_03", duration: 2.72},
    fireplace: { url: "soundbank://soundlibrary/home/amzn_sfx_fireplace_crackle_01", duration: 4.16},
    run: { url: "soundbank://soundlibrary/human/amzn_sfx_person_running_01", duration: 2.07},
    laugh: { url: "soundbank://soundlibrary/human/amzn_sfx_laughter_giggle_02", duration: 1.43},
    rain: { url: "soundbank://soundlibrary/nature/amzn_sfx_rain_01", duration: 5.24},
    dog: { url: "soundbank://soundlibrary/animals/amzn_sfx_dog_med_bark_2x_01", duration: 1.25},
    cat: { url: "soundbank://soundlibrary/animals/amzn_sfx_cat_meow_1x_02", duration: 1.25},
    wood: { url: "soundbank://soundlibrary/wood/squeaks/squeaks_01", duration: 2.01},
    light: { url: "soundbank://soundlibrary/nature/amzn_sfx_lightning_strike_01", duration: 2.15},
    cooking: { url: "soundbank://soundlibrary/home/amzn_sfx_food_frying_01", duration: 2.07},
    chorus: { url: "soundbank://soundlibrary/voices/chorus/chorus_04", duration: 4.96},
    coins: {url:"soundbank://soundlibrary/cloth_leather_paper/money_coins/money_coins_03", duration:1.78}

}

for (const key in sounds) {
    sounds[key]["type"] = "audio"
}

module.exports = sounds;