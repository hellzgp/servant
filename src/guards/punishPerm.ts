/*
 Permissão para banir alguém
*/
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
import type { GuardFunction } from "discordx";

export const PunishPerm: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next,
) => {
    if (
        !interaction.memberPermissions?.has(PermissionFlagsBits.BanMembers) &&
        !interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)
    ) {
        await interaction.reply({
            content: "Você não tem permissões de banir um membro.",
        });
        return;
    }
    await next();
};
