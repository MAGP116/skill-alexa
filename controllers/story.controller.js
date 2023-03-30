const openai = require('../config/openai');
const https = require('https');

class Story {
    async createByConceptSpanish(concept) {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpfull assistant that create children's stories with morals, you write your answers in spanish, and you expect to communicate in spanish" },
                { "role": "user", "content": `cuentame una cuento sobre ${concept}` }
            ]
        })

        return completion.status == 200 ?
            { "usage": completion.data["usage"], "content": completion.data["choices"][0]["message"]["content"] } :
            {}
    }

    async createByConcept(concept) {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpfull assistant that create children's stories with morals. The stories created are around 100 words long" },
                { "role": "user", "content": `tell me a tale about ${concept}` }
            ]
        })

        return completion.status == 200 ?
            { "usage": completion.data["usage"], "content": completion.data["choices"][0]["message"]["content"] } :
            {}
    }

    async create(concept) {
        return new Promise(function (resolve, reject) {
            let stringbuilder = [];
            let answer = "";

            const req = https.request({
                hostname: "api.openai.com",
                port: 443,
                path: "/v1/chat/completions",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + process.env.OPENAI_API_KEY
                }
            }, function (res) {
                res.on('data', (chunk) => {
                    chunk.toString().split('data: ').slice(1).forEach(element => {
                        if (!element.includes("[DONE]")) {
                            let data = JSON.parse(element);
                            let content = data["choices"][0]["delta"]["content"];
                            if (content) {
                                stringbuilder.push(content);
                                console.log(".")
                            }
                        }
                    });


                });
                res.on('end', () => {
                    console.log('No more data in response.');
                    answer = stringbuilder.join('');
                    resolve(answer)
                    //cb(answer)
                });
            })
            const body = JSON.stringify({
                model: "gpt-3.5-turbo",
                "messages": [
                    { "role": "system", "content": "You are a helpfull assistant that create children's stories with morals. The stories created are around 50 words long" },
                    { "role": "user", "content": `tell me a tale about ${concept}` }
                ],
                stream: true
            })

            req.on('error', (e) => {
                console.error("problem with request:" + e.message);
                reject();
            });

            req.write(body)

            req.end()

        })
    }
}

module.exports = new Story();
