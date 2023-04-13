const openai = require('../config/openai');

class Story {
    async createByConceptSpanish(concept) {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpfull assistant that create children's stories with morals, you write your answers in spanish, and you expect to communicate in spanish. The stories created are around 300 words long" },
                { "role": "user", "content": `cuentame una cuento sobre ${concept}` }
            ]
        })

        return completion.status == 200 ?
            { "usage": JSON.stringify(completion.data["usage"]), "content": completion.data["choices"][0]["message"]["content"] } :
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
            { "usage": JSON.stringify(completion.data["usage"]), "content": completion.data["choices"][0]["message"]["content"] } :
            {}
    }
    
}

module.exports = new Story();
