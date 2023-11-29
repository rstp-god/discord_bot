import { REST, Routes, Client, GatewayIntentBits } from "discord.js";
import * as env from 'dotenv';
import { Axios } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

env.config();

// const commands = [
//     {
//         name: 'ping',
//         description: 'Replies with Pong!',
//     },
// ];
//
// // @ts-ignore
// const rest = new REST({version: "10"}).setToken(process.env.ACCESS_TOKEN)
//
// try {
//     console.log('Started refreshing application (/) commands.');
//
//     // @ts-ignore
//     await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands});
//
//     console.log('Successfully reloaded application (/) commands.');
// } catch (error) {
//     console.error(error);
// }
//
// const client = new Client({intents: [GatewayIntentBits.Guilds]});
//
// client.on('ready', () => {
//     // @ts-ignore
//     console.log(`Logged in as ${client.user.tag}!`);
// });
//
// client.on('interactionCreate', async interaction => {
//     if (!interaction.isChatInputCommand()) return;
//
//     if (interaction.commandName === 'ping') {
//         await interaction.reply('Pong!');
//     }
// });
//
// client.login(process.env.ACCESS_TOKEN);


async function test() {
    await axios.post("", {
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Расскажи анекдот"}],
        temperature: 0.7
    }).then((result) => {
        console.log(result.data.choices[0]);
    }).catch((error) => {
        console.error(error)
    })

}

// test();

