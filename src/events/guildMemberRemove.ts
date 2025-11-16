import { type ArgsOf, Discord, On } from "discordx";
import {Events} from "discord.js";

@Discord()
export default class GuildMemberRemove{
    @On({ event: Events.GuildMemberRemove })
    async onGuildMemberRemove([member]: ArgsOf<"guildMemberRemove">) {
	const channel = member.guild.systemChannel;
	await channel?.send(`${member} saiu do servidor.`);
    }
}
