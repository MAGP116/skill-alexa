const openai = require('../config/openai');
const keywords = require('../utils/keywords');
const interactions = require("../utils/actions");

class Story {
    async createByConcept(concept, language, prompt, length = 300) {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": `You are a helpfull assistant that create children's stories with morals, you write your answers in ${language}, and you expect to communicate in ${language}. The stories created are around ${length} words long` },
                { "role": "user", "content": `${prompt} ${concept}` }
            ]
        })

        return completion.status == 200 ?
            this.#join(
                { "usage": JSON.stringify(completion.data["usage"]), "title": concept },
                this.processStory(completion.data["choices"][0]["message"]["content"])) :
            {}
    }

    #join(obj1, obj2) {
        for (const key in obj1) {
            obj2[key] = obj1[key];
        }
        return obj2;
    }

    processStory(story) {
        const charTime = 237.45 / 4069;
        const maxSSML = 5;
        let nodes = [];
        let symbols = [".", ",", " "];
        let curTime = 0.0;
        let audios = [];


        let wordArr = []
        //Iterate over the string
        for (let c of story) {
            curTime += charTime;
            //If the char is a special symbol
            if (symbols.includes(c)) {
                const lower = wordArr.join("").toLocaleLowerCase();
                wordArr.push(c);
                //Insert the text
                nodes.push({ text: wordArr.join(""), type: "speak", duration: curTime });
                curTime = 0.0;
                wordArr = [];

                //Insert the actions
                let steps = keywords[lower]
                if (steps !== undefined) {
                    for (let step of steps) {
                        if (step.type === "audio") {
                            nodes.push({ text: `\n<audio src="${step.url}"/>\n`, type: "speak", duration: step.duration });
                            audios.push(nodes.length - 1);
                        }
                        if (step.type === "action") {
                            nodes.push(step);
                        }
                    }

                }
            }
            else {
                wordArr.push(c);
            }
        }
        //The audio limit in alexa is 5, so balance the audios to be that limit.
        for (let i of this.#balance(audios, maxSSML, nodes.length - 1)) {
            nodes[i] = { text: '', type: "speak", duration: 0.0 }
        }

        let actions = this.#calculateActions(nodes);

        //Join all speak nodes.
        let speakText = nodes.map(e => e.type === "speak" ? e.text : "").join("");

        //Calculate duration of the tale.
        let duration = nodes.reduce((acc, cur) => (cur.type === "speak" ? cur.duration : 0) + acc, 0)
        return { speakText, actions, duration };
    }

    //Given an array, its maxlength, a top value and a bottom value.
    //find what values to remove from the array to get an array of maxlength with the 
    //values separeted as much as possible from themself and the top and bottom
    #balance(arr, maxLength, top, bottom = 0) {
        let ans = []
        while (arr.length > maxLength) {
            let distance = [arr[0] - bottom]
            for (let i = 1; i < arr.length; i++) {
                distance.push(arr[i] - arr[i - 1]);
            }
            distance.push(top - arr[arr.length - 1]);
            let min = 0
            for (let i = 1; i < distance.length; i++) {
                min = distance[i] < distance[min] ? i : min;
            }
            min = min <= (arr.length - 1) ? min : (arr.length - 1);
            ans.push(arr[min]);
            arr.splice(min, 1);
        }
        return ans;
    }

    #calculateActions(nodes) {
        //Set the room light to default at the begining
        let actions = [{ "node": interactions.turn_on_light, "time": 0 }];
        let curTime = 0.0;
        let totalTime = 0.0;
        let componentName = interactions.turn_on_light.component;
        let waits = { componentName: interactions.turn_on_light.duration };
        let waitTime = 0;
        let wasAction = false;

        for (let node of nodes) {
            if (node.type !== "action") {
                if (wasAction) {
                    curTime = 0;
                }
                curTime += node.duration;
                totalTime += node.duration;
                wasAction = false;
            }
            else {
                componentName = node.component;
                waitTime = waits[componentName] || 0;
                let time = totalTime + Math.max((waitTime - curTime), 0.0);
                actions.push({ "node": node, "time": time });
                waits[componentName] = node.duration + Math.max((waitTime - curTime), 0.0);
                wasAction = true;
            }
        }
        actions.push({ "node": interactions.turn_on_light, "time": totalTime });
        actions.push({ "node": interactions.turn_off_switch, "time": totalTime });
        actions.sort((a, b) => a.time - b.time);

        let answer = [];
        let prevAction = { "time": 0.0 };
        for (let action of actions) {
            curTime = action.time - prevAction.time;
            if (curTime > 0) {
                answer.push({ "component": "sleep", "duration": curTime });
            }
            answer.push(action.node);
            prevAction = action;
        }
        console.log(`Actions:\n${JSON.stringify(answer, null, 4)}`);
        return answer;
    }
}

module.exports = new Story();
