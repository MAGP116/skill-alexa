const OpenAI = require("openai")

const OPENAI_ORG_ID = process.env.OPENAI_ORG_ID
const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const configuration = new OpenAI.Configuration({
    organization: OPENAI_ORG_ID,
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAI.OpenAIApi(configuration);
module.exports = openai;