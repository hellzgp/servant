/**
 * Servant, um bom simples de moderação
 * Nosso foco é entregar recursos e comandos personalizados, e isso reflete ao nosso código.
 *
 * Nosso servidor: /qTgfcN6ct7
 * Por: Alfheim Team
 */
import "reflect-metadata";
import "dotenv/config";
import { container } from "tsyringe";
import { Client, DIService, tsyringeDependencyRegistryEngine } from "discordx";
import { importx, dirname } from "@discordx/importer";
import { GatewayIntentBits } from "discord.js";
import { DrizzleConnection } from "./repositories/BaseRepository.js";
import { drizzle } from "drizzle-orm/libsql";
import { UsersRepository } from "./repositories/UsersRepository.js";
import { usersTable } from "./db/schema.js";

DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

const BOT_ID = process.env.BOT_ID!;
const GUILD_ID = process.env.GUILD_ID;
const BOT_TOKEN = process.env.BOT_TOKEN!;

const DATABASE_URL =
    process.env.NODE_ENV! === "test" ? ":memory:" : process.env.DB_FILE_NAME!;

container.register<DrizzleConnection>("drizzleConnection", {
    useValue: drizzle(DATABASE_URL, { logger: true }),
});

container.register<UsersRepository>(UsersRepository, {
    useValue: new UsersRepository(usersTable),
});

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
