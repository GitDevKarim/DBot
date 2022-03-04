const {
    MessageActionRow,
    MessageSelectMenu,
    MessageEmbed,
} = require("discord.js");

module.exports = {
    name: "roles",
    description: "Roles!",

    async execute(message) {
        if (message.content == "+roles") {
            const roles = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("select")
                    .setPlaceholder("Select a role")
                    .setMaxValues(1)
                    .setDisabled(false)
                    .addOptions([
                        {
                            label: "Brevet",
                            value: "Brevet || GR.9",
                            emoji: "9️⃣",
                        },
                        {
                            label: "Secondary",
                            value: "Secondary || GR.10",
                            emoji: "🔟",
                        },
                        {
                            label: "BAC 1",
                            value: "BAC 1 || GR.11",
                            emoji: "🅱️",
                        },
                        {
                            label: "BAC 2",
                            value: "BAC 2 || GR.12",
                            emoji: "🇧",
                        },
                        {
                            label: "University",
                            value: "University",
                            emoji: "🎓",
                        },
                    ])
            );

            const emb = new MessageEmbed()
                .setTitle("Available Roles")
                .setColor("#000000")
                .setAuthor({
                    name: `${message.guild.name}`,
                    iconURL: `${message.guild.iconURL()}`,
                })
                .addFields(
                    { name: "Brevet", value: "GR.9", inline: false },
                    { name: "Secondary", value: "GR.10", inline: false },
                    { name: "BAC 1", value: "SC/ES", inline: false },
                    { name: "BAC 2", value: "GS/LS/ES/HL", inline: false },
                    {
                        name: "University",
                        value: "You're a university student",
                        inline: false,
                    }
                )
                .setTimestamp();

            return await message.reply({
                embeds: [emb],
                components: [roles],
                ephermal: false,
            });
        } else {
            return await message.reply({ content: "Invalid Command!" });
        }
    },
};
    