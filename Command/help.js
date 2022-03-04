const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "List all commands or info about a specific command.",

    async execute(message) {
        if (message.content == "+help") {
            const embed = new MessageEmbed()
                .setColor("#000000")
                .setTitle("Available Commands")
                .setAuthor({
                    name: "TutorBot",
                    iconURL: `${message.author.displayAvatarURL()}`,
                })
                .addFields(
                    {
                        name: "+help",
                        value: "List all commands.",
                        inline: true,
                    },
                    {
                        name: "+ping",
                        value: "Displays your ping.",
                        inline: true,
                    },
                    {
                        name: "+roles",
                        value: "Displays all available roles.",
                        inline: true,
                    }
                )
                .setTimestamp();

            return await message.reply({ embeds: [embed] });
        } else {
            return await message.reply({ content: "Invalid command." });
        }
    },
};
