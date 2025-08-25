// This is the configurations for the AI wrappers of the project

const config = {

    openai: {
        apiKey: process.env.OPENAI_API_KEY,
        model: 'gpt-4',
        maxTokens: process.env.MAX_TOKENS || 400,
        temperature: process.env.TEMPERATURE || 0.7
    },
    antropic: {
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: 'claude-sonnet-4',
        maxTokens: provess.env.MAX_TOKENS || 400,
        temperature: process.env.TEMPERATURE || 0.7
    },

    defaultProvider: process.env.DEFAULT_AI_PROVIDER || 'openai'
}
module.exports = config;