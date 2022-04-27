const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const { bold, inlineCode } = require('@discordjs/builders')
const config = require('../../config.json')

const randomNumberInRange = require('../helpers/randomNumberInRange')
const checkRole = require('../core/checkRole')

const { tempInfiltrateData } = require('../core/createTempData')

module.exports = async function infiltrateHandler(interaction) {
    try {
        const {
            chances,
            generatedTeammates,
            fetchedUser,
            fetchedFaction,
            fetchedRivalFaction,
        } = tempInfiltrateData[interaction.user.id]

        if (interaction.customId === 'infiltrate-accept') {
            let description, image

            const generatedDice = await randomNumberInRange(
                4,
                generatedTeammates
            )

            const isReapers = await checkRole(interaction, 'Reapers')

            if (generatedDice > (isReapers ? 7 : 7)) {
                image =
                    'https://user-images.githubusercontent.com/45223699/159432247-1e4c3eea-9f70-4f74-afe7-ca980f57742e.jpg'
                const generatedXP = await randomNumberInRange(1000, 2500)

                fetchedUser.xp += generatedXP
                await fetchedUser.save()

                fetchedFaction.spots++
                await fetchedFaction.save()

                fetchedRivalFaction.spots--
                await fetchedRivalFaction.save()

                description = `<@${interaction.user.id}> used ${inlineCode(
                    '/infiltrate'
                )}.\n\nThey decided to infiltrate with ${inlineCode(
                    generatedTeammates
                )} teammates and they ${inlineCode(
                    'WON'
                )}.\n\nThey took a WL spot from ${
                    fetchedUser.faction == 'Reapers'
                        ? `<@&${config.role.trickstersID}>`
                        : `<@&${config.role.reapersID}>`
                } and are rewarded ${inlineCode(generatedXP)} XP!`
            } else {
                description = `<@${interaction.user.id}> used ${inlineCode(
                    '/infiltrate'
                )}.\n\nThey decided to infiltrate with ${inlineCode(
                    generatedTeammates
                )} teammates and they ${inlineCode('LOST')}.`
            }

            await interaction.update({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(`You can dismiss this message.`)
                        .setTimestamp(),
                ],
                components: [],
            })

            await interaction.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(description)
                        .setImage(image ? image : '')
                        .setTimestamp(),
                ],
            })
        } else {
            const newGeneratedTeammates = await randomNumberInRange(4, 11)

            newChances = chances - 1

            const description =
                newChances != 0
                    ? `You have ${inlineCode(
                          newGeneratedTeammates
                      )} teammates willing to infiltrate ${
                          fetchedUser.faction == 'Reapers'
                              ? `<@&${config.role.trickstersID}>`
                              : `<@&${config.role.reapersID}>`
                      } with you. Do you attack with teammates you have or wait to gather more? Teammates you currently have may leave!`
                    : `Your teammates are angry! 😡 This is your last chance! You have ${inlineCode(
                          newGeneratedTeammates
                      )} teammates willing to infiltrate ${
                          fetchedUser.faction == 'Reapers'
                              ? `<@&${config.role.trickstersID}>`
                              : `<@&${config.role.reapersID}>`
                      } with you.`

            tempInfiltrateData[interaction.user.id] = {
                chances: newChances,
                generatedTeammates: newGeneratedTeammates,
                fetchedUser,
                fetchedFaction,
                fetchedRivalFaction,
            }

            await interaction.update({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(description)
                        .setTimestamp(),
                ],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('infiltrate-accept')
                            .setLabel('INFILTRATE')
                            .setStyle('SECONDARY'),
                        new MessageButton()
                            .setCustomId('infiltrate-next')
                            .setLabel('WAIT!')
                            .setDisabled(newChances == 0 ? true : false)
                            .setStyle('DANGER')
                    ),
                ],
                ephemeral: false,
            })
        }
    } catch (error) {
        console.log(error)
    }
}
