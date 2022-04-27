const client = require('../index.js')
const config = require('../config.json')
const { naughtyList } = require('../functions/core/createTempData')
const { MessageEmbed } = require('discord.js')

const sensitiveChannels = [
    config.channel.sensitive.welcomeID,
    config.channel.sensitive.faqID,
    config.channel.sensitive.announcementsID,
    config.channel.sensitive.roadmapID,
    config.channel.sensitive.whitelistID,
    config.channel.sensitive.loreID,
    config.channel.sensitive.fusionID,
    config.channel.sensitive.howToPlayID,
    config.channel.sensitive.safetyID,
    config.channel.sensitive.terminologyID,
    config.channel.sensitive.linksID,
    config.channel.sensitive.giveawaysID,
]

async function warn(message) {
    if (message.author.id in naughtyList) {
        if (naughtyList[message.author.id] > 3) {
            try {
                const member = message.guild.members.cache.get(
                    message.author.id
                )

                member.timeout(1 * 60 * 60 * 1000, 'You are on a timeout.')

                delete naughtyList[message.author.id]
            } catch (error) {
                console.log(error)
            }
        } else {
            naughtyList[message.author.id]++
        }
    } else {
        naughtyList[message.author.id] = 1
    }
    message.delete()

    await message.channel.send({
        embeds: [
            new MessageEmbed()
                .setColor(config.embed_color)
                .setDescription(`You can't send a link in this server.`),
        ],
    })
}

client.on('messageCreate', async (message) => {
    try {
        if (
            message.author.id != config.receptionBotID &&
            message.author.id != config.ownerID
        ) {
            if (
                sensitiveChannels.indexOf(message.channelId) !== -1 ||
                message.content.includes('http') ||
                message.webhookId
            ) {
                await warn(message)
            }
        }
    } catch (error) {
        console.log(error)
    }
})

client.on('messageUpdate', async function (oldMessage, newMessage) {
    try {
        if (
            newMessage.author.id != config.receptionBotID &&
            newMessage.author.id != config.ownerID
        ) {
            if (
                sensitiveChannels.indexOf(newMessage.channelId) !== -1 ||
                newMessage.content.includes('http') ||
                newMessage.webhookId
            ) {
                await warn(newMessage)
            }
        }
    } catch (error) {
        console.log(error)
    }
})
