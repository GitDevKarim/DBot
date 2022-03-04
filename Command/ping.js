const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping!",

    async execute(message) {
        if (message.content == "+ping") {
            const emb = new MessageEmbed()
                .setTitle("Pong!")
                .setColor("#000000")
                .setDescription(`${(Date.now() - message.createdTimestamp)} ms`)
                .setAuthor({
                    name: `${message.author.username}`,
                    iconURL: `${message.author.displayAvatarURL()}`,
                })
                .setTimestamp();

            return await message.reply({ embeds: [emb] });
        } else {
            return await message.reply({ content: "Invalid Command!" });
        }
    },
};
