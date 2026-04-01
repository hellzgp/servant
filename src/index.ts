/**
 * Servant, um bom simples de moderação
 * Nosso foco é entregar recursos e comandos personalizados, e isso reflete ao nosso código.
 *
 * Nosso servidor: /aqNVrABPeW
 * Por: Aeternus team
 */
import "reflect-metadata";
import "dotenv/config";
import { container } from "tsyringe";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { GatewayIntentBits } from "discord.js";

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

const BOT_ID = process.env.BOT_ID!;
const GUILD_ID = process.env.GUILD_ID;
const BOT_TOKEN = process.env.BOT_TOKEN!;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    botId: BOT_ID,
    silent: false,
    botGuilds: GUILD_ID ? [GUILD_ID] : [],
});

async function main() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    await client.login(BOT_TOKEN);
}

main();
