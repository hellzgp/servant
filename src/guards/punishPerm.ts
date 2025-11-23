/*
 Permissão para banir alguém
*/
import { CommandInteraction, PermissionFlagsBits } from "discord.js";
import type { GuardFunction } from "discordx";

export const BanPerm: GuardFunction<CommandInteraction> = async (
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
export const KickPerm: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next,
) => {
    if (
        !interaction.memberPermissions?.has(PermissionFlagsBits.KickMembers) &&
        !interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)
    ) {
        await interaction.reply({
            content: "Você não tem permissões de expulsar um membro.",
        });
        return;
    }
    await next();
};
export const TimeoutPerm: GuardFunction<CommandInteraction> = async (
    interaction,
    client,
    next,
) => {
    if (
        !interaction.memberPermissions?.has(
            PermissionFlagsBits.ModerateMembers,
        ) &&
        !interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)
    ) {
        await interaction.reply({
            content: "Você não tem permissões de castigar um membro.",
        });
        return;
    }
    await next();
};
