import {
    REST,
    Routes,
    Client,
    GatewayIntentBits,
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandStringOption
} from "discord.js";
import * as env from 'dotenv';
import { ChatApi } from "./service";

env.config();

const api = new ChatApi();

const data = new SlashCommandBuilder()
    .setName("ask")
    .setDescription("AskGpt")
    .addStringOption((option: SlashCommandStringOption) =>
        option
            .setName("input")
            .setDescription("Your question")
            .setRequired(true))

const commands = [];

commands.push(data);

// @ts-ignore
const rest = new REST({version: "10"}).setToken(process.env.ACCESS_TOKEN)

try {
    console.log('Started refreshing application (/) commands.');

    // @ts-ignore
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands});

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.on('ready', () => {
    // @ts-ignore
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ask') {
        await interaction.deferReply();
        await api.getGptAnswer(
            String(interaction.options.data[0].value)
        ).then(async (result) => {
            await interaction.editReply(result);
        });
    }
});

client.login(process.env.ACCESS_TOKEN);

