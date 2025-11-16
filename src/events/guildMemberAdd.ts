import { type ArgsOf, Discord, On } from "discordx";
import {Events} from "discord.js";

@Discord()
export default class GuildMemberAdd{
    @On({ event: Events.GuildMemberAdd })
    async onGuildMemberAdd([member]: ArgsOf<"guildMemberAdd">) {
	const channel = member.guild.systemChannel;
	await channel?.send(`${member} entrou no servidor.`);
    }
}
