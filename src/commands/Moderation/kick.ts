import { Discord, Slash, SlashOption } from "discordx";
import { Category } from "@discordx/utilities";
import {
    CommandInteraction,
    PermissionFlagsBits,
    GuildMember,
    ApplicationCommandOptionType,
} from "discord.js";

@Discord()
@Category("Moderation")
export default class KickCommand {
    @Slash({
        name: "expulsar",
        description: "expulsar um membro do servidor.",
    })
    async kick(
        @SlashOption({
            name: "member",
            description: "membro para expulsar",
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        })
        member: GuildMember | null,
        @SlashOption({
            name: "reason",
            description: "motivo para a expulsão",
            required: false,
            type: ApplicationCommandOptionType.String,
        })
        reason: string,
        interaction: CommandInteraction,
    ) {
        if (!interaction.guild) return;
        const author = await interaction.guild?.members.fetch(
            interaction.user.id,
        );

        if (!member || member.id == interaction.user.id)
            return interaction.reply(
                `O membro mencionado não pode ser expulso.`,
            );

        const memberRole = member?.roles.highest.position;
        if (!memberRole)
            return interaction.reply(
                `Não foi possível capturar a posição do cargo.`,
            );
        if (!author?.permissions.has(PermissionFlagsBits.KickMembers))
            return interaction.reply(
                `Você não tem permissão para expulsar um membro.`,
            );
        else if (
            !interaction.guild?.members.me?.permissions.has(
                PermissionFlagsBits.KickMembers,
            )
        )
            return interaction.reply(
                `Eu não tenho permissão de expulsar um membro.`,
            );
        else if (interaction.guild.ownerId == member.id)
            return interaction.reply(
                `Você não pode expulsar o dono do servidor.`,
            );
        else if (
            interaction.guild?.members.me?.roles.highest.position <= memberRole
        )
            return interaction.reply(`Não posso expulsar alvos acima de mim.`);
        else if (
            author?.roles.highest.position <= member.roles.highest.position
        )
            return interaction.reply(`Não posso expulsar seu superior.`);

        member.kick(`${author.user.username} | ${reason}`).catch((err) => {
            console.log(err);
            return interaction.reply(`Não foi possível expulsar ${member}`);
        });
        await interaction.reply(`Expulso ${member} por *${reason}*.`);
    }
}
