const client = require('../index.js')
const config = require('../config.json')
const wait = require('timers/promises').setTimeout

const { bold, inlineCode } = require('@discordjs/builders')

// Helper functions
const reactMessage = require('../functions/core/reactMessage')
const getChannels = require('../functions/core/getChannels')
const scheduledMessage = require('../functions/core/scheduledMessage')
const setCodeUses = require('../functions/core/setCodeUses')
const setCommandPermissions = require('../functions/core/setCommandPermissions')
const {
    sendEmbeddedMessage,
    sendContentMessage,
} = require('../functions/core/sendMessage')
const contractListener = require('../functions/sales/contractListener')

// Embeds
const {
    sendWelcome,
    sendFAQ,
    sendLinks,
    sendRoadmap,
    sendCommands,
    sendLore,
    sendFusion,
    sendWhitelist,
    sendSafety,
    sendTerminology,
    sendTech,
} = require('../embeds/embedInfos')

client.on('ready', async () => {
    await wait(2000)

    console.log(`${client.user.username} is online`)
    client.user.setActivity('🌠🌠🌠', { type: 'WATCHING' })

    // await setCodeUses()
    await getChannels()
    // await setCommandPermissions()
    // contractListener()

    scheduledMessage(config.channel.testID, '*/29 * * * *', 'Ping!')

    // sendEmbeddedMessage(
    //     config.channel.sensitive.eventRolesID,
    //     `React with " 🎲 " to be a part of our gaming events.\nReact with " 🐤 " to be a part of our Twitter events.`
    // )

    // sendWelcome(config.channel.sensitive.welcomeID, true)
    // sendFAQ(config.channel.sensitive.faqID, true)
    // sendRoadmap(config.channel.sensitive.roadmapID, true)
    // sendFusion(config.channel.sensitive.fusionID, true)
    // sendCommands(config.channel.sensitive.commandsInfoID, true)
    // sendWhitelist(config.channel.sensitive.whitelistID, true)
    // sendSafety(config.channel.sensitive.safetyID, true)
    // sendTerminology(config.channel.sensitive.terminologyID, true)
    // sendTech(config.channel.sensitive.techID, true)
    // sendLore(config.channel.sensitive.loreID, true)
    // sendLinks(config.channel.sensitive.linksID, true)
})
