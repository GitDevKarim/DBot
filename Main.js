const {
    Client,
    Intents,
    MessageEmbed,
    Collection,
    MessageActionRow,
    MessageButton,
} = require("discord.js");
const { Token, prefix } = require("./Config.json");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
});

const fs = require("fs");

client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./Command")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./Command/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    client.user.setPresence({
        activities: [{ name: "VSCode", type: "COMPETING" }],
        status: "online",
    });

    client.user.setUsername("Tutor");
    console.log(`Ready! ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.guild) return;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(1).split(/ +/);
        const command = args.shift().toLowerCase();

        if (client.commands.has(command)) {
            try {
                client.commands.get(command).execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply(
                    "There was an error trying to execute that command!"
                );
            }
        }
    }
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isSelectMenu() && interaction.customId === "select") {
        const role = interaction.guild.roles.cache.find(
            (role) => role.name === interaction.values[0]
        );

        await interaction.member.roles.add(role).then(() => {
            interaction.deferUpdate();
            interaction.member.createDM().then(async (dm) => {
                const emb = new MessageEmbed()
                    .setColor("#000000")
                    .setAuthor({
                        name: `${interaction.guild.name}`,
                        iconURL: `${interaction.guild.iconURL()}`,
                    })
                    .setDescription(
                        `You have been given the role **${role.name}**!`
                    );
                return await dm.send({ embeds: [emb] });
            });
        });

        switch (role.name) {
            case "BAC 1 || GR.11":
                interaction.member.createDM().then(async (dm) => {
                    return await dm.send({
                        ephemeral: true,
                        components: [button11],
                        content: `It appears that you're a BAC 1 student. Please select your course of study.`,
                    });
                });
                break;

            case "BAC 2 || GR.12":
                interaction.member.createDM().then(async (dm) => {
                    return await dm.send({
                        ephemeral: true,
                        components: [button12],
                        content: `It appears that you're a BAC 2 student. Please select your course of study.`,
                    });
                });
                break;

            default:
                break;
        }
    } else if (interaction.isButton()) {
        const guil = client.guilds.cache.find(
            (guil) => guil.name === "TestingGrounds"
        );
        const role = guil.roles.cache.find(
            (role) => role.name === interaction.customId
        );
        const mem = guil.members.cache.find(
            (mem) => mem.id === interaction.user.id
        );

        mem.roles.add(role);
        console.log("Success");
    } else {
        return;
    }
});

client.login(Token);

const button11 = new MessageActionRow().addComponents(
    new MessageButton()
        .setCustomId("SC")
        .setLabel("Scientific")
        .setStyle("PRIMARY"),
    new MessageButton()
        .setCustomId("ES")
        .setLabel("Sociology and Economics")
        .setStyle("PRIMARY")
);

const button12 = new MessageActionRow().addComponents(
    new MessageButton()
        .setCustomId("GS")
        .setLabel("General Science")
        .setStyle("PRIMARY"),

    new MessageButton()
        .setCustomId("LS")
        .setLabel("Life Sciences")
        .setStyle("PRIMARY"),

    new MessageButton()
        .setCustomId("SE")
        .setLabel("Sociology and Economics")
        .setStyle("PRIMARY"),

    new MessageButton()
        .setCustomId("HL")
        .setLabel("Humanities and Literature")
        .setStyle("PRIMARY")
);
