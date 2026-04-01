import { type ArgsOf, Client, Discord, On } from "discordx";

@Discord()
export default class MessageCreateEvent {
    @On({ event: "messageCreate" })
    async onMessage([message]: ArgsOf<"messageCreate">, _client: Client) {
        if (!Client || !_client) return; // só para o LINT não encher o saco
        if (message.content.toLowerCase() == "kaznir")
            return message.reply("O Kaznir é um membro vergonhoso!");
    }
}
