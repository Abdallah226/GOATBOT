const axios = require("axios");

module.exports = {
  config: {
    name: "ai",
    version: "1.0",
    author: "TonNom",
    role: 0,
    shortDescription: "Discuter avec une IA (ChatGPT)",
    longDescription: "Pose une question à ChatGPT et reçois une réponse intelligente",
    category: "utils",
    usages: ["ai [question]"],
    cooldowns: 5,
  },

  onStart: async function ({ event, api, args }) {
    const question = args.join(" ");
    if (!question) {
      return api.sendMessage("Utilisation : ai [ta question]\nExemple : ai Quelle est la capitale de la France ?", event.threadID, event.messageID);
    }

    const apiKey = "";

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
          temperature: 0.7
        },
        {
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      const reply = res.data.choices[0].message.content.trim();
      return api.sendMessage(reply, event.threadID, event.messageID);

    } catch (error) {
      console.error(error.response?.data || error.message);
      return api.sendMessage("Erreur lors de la communication avec l'IA. Vérifie ta clé API ou ta connexion Internet.", event.threadID, event.messageID);
    }
  }
};
