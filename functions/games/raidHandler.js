const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { bold, inlineCode } = require('@discordjs/builders')
const config = require('../../config.json')

const randomNumberInRange = require('../helpers/randomNumberInRange')

const { tempRaidData } = require('../core/createTempData')

module.exports = async function raidHandler(interaction) {
    try {
        const { generatedRandomXP, fetchedUser, fetchedFaction } =
            tempRaidData[interaction.user.id]

        if (interaction.customId === 'raid-accept') {
            await interaction.update({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(`You can dismiss this message.`)
                        .setTimestamp(),
                ],
                components: [],
            })

            const description = `<@${interaction.user.id}> used ${inlineCode(
                '/raid'
            )}.\n\nThey decided to take ${bold(
                generatedRandomXP
            )} XP and return.`

            await interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(description)
                        .setTimestamp(),
                ],
            })

            fetchedUser.xp += generatedRandomXP
            await fetchedUser.save()
        } else {
            let image
            const generatedDice = await randomNumberInRange(1, 8)

            if (generatedDice > 5) {
                image =
                    'https://user-images.githubusercontent.com/45223699/159438209-427b0ac9-ea1d-4a3e-885b-e9d6b8ec38cc.jpg'
                await interaction.update({
                    embeds: [
                        new MessageEmbed()
                            .setColor(config.embed_color)
                            .setDescription(`Your venture ended...`)
                            .setTimestamp(),
                    ],
                    components: [],
                })

                const description = `<@${
                    interaction.user.id
                }> used ${inlineCode(
                    '/raid'
                )}.\n\nThey fell into Sentries' ambush and lost all ${inlineCode(
                    generatedRandomXP
                )} gathered XP.`

                await interaction.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(config.embed_color)
                            .setImage(image ? image : '')
                            .setDescription(description)
                            .setTimestamp(),
                    ],
                })
            } else {
                const generatedNewXP =
                    generatedRandomXP +
                    Math.floor(
                        (await randomNumberInRange(50, 125)) *
                            (Math.random() * (2.6 - 1.2) + 1.2)
                    )

                await interaction.update({
                    embeds: [
                        new MessageEmbed()
                            .setColor(config.embed_color)
                            .setDescription(
                                `You venture deeper into the depths of the Crypt...\n\nYou can take ${bold(
                                    generatedNewXP
                                )} XP. Do you go deeper or return with what you've found?`
                            )
                            .setTimestamp(),
                    ],
                    components: [
                        new MessageActionRow().addComponents(
                            new MessageButton()
                                .setCustomId('raid-accept')
                                .setLabel('RETURN')
                                .setStyle('SECONDARY'),
                            new MessageButton()
                                .setCustomId('raid-next')
                                .setLabel('DEEPER!')
                                .setStyle('DANGER')
                        ),
                    ],
                })

                tempRaidData[interaction.user.id] = {
                    generatedRandomXP: generatedNewXP,
                    fetchedUser,
                    fetchedFaction,
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
}
