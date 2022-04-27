const client = require('..')
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageAttachment,
} = require('discord.js')
const {
    bold,
    underscore,
    italic,
    spoiler,
    hyperlink,
    inlineCode,
    codeBlock,
    blockQuote,
} = require('@discordjs/builders')
const config = require('../config.json')
const path = require('path')

module.exports = {
    sendWelcome: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)

                        .setDescription(
                            `Welcome! 🥂 Get access to this server by getting to know the basics of our project!\n\nYou can proceed by clicking on the button below.`
                        ),
                ],
                components: [
                    new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId('welcome-button')
                            .setLabel(`LET'S GO!`)
                            .setStyle('PRIMARY')
                    ),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendFAQ: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                'What is Titanbornes?': `Free-to-mint experimental NFT collection trying to do things a little differently. What if your NFT ${bold(
                    'EVOLVED'
                )} in each transaction? What if a collection's supply ${bold(
                    'DECREMENTED'
                )} after every transaction?`,
                'How does this 👆 work?': `Each single sale in this collection can trigger a ${bold(
                    'FUSION'
                )}, evolving the buyer's NFT & burning the sold NFT. This decreases the entire supply of the collection and raises the rarity of all NFTs still in circulation. This is deflationary-supply taken to the extreme!`,
                'What is the total supply?': `1,000.`,
                'What is the minting price?': `The mint will be ${bold(
                    'FREE'
                )}!`,
                'How many can I mint?': `One.`,
                'When can I mint?': `TBA.`,
                'What blockchain?': `Ethereum.`,
                'What are the whitelist & public sale allocations?': `All 1,000 tokens will be available to mint by <@&${config.role.whitelistID}> members in a 24h window. The is no public mint allocation.`,
                'How do I earn a whitelist position?': `Check-out <#${config.channel.sensitive.whitelistID}> to learn how to become <@&${config.role.whitelistID}>.`,
                'Will my NFT have the same faction as my Discord role?': `Yes, but only if you're <@&${config.role.whitelistID}> and mint in the 24h presale window.`,
                'What are the commercial rights?': `CC0. No rights reserved 🤘`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendRoadmap: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                'Chapter 01: Genesis': `• Fair-launch of Titanborne NFTs, top members in our Discord game mint our NFTs for ${bold(
                    'FREE'
                )}. A ${bold(
                    'TRUE COMMUNITY'
                )} will shape itself around a tangibly refreshing idea that fairly distributes value to those who genuinely want to be a part of it.\n\n• Our ${underscore(
                    '1st. experiment'
                )} begins. How many <@&${
                    config.role.titanbornesID
                }> will survive? What will the highest fusion count be? What can we possibly have in mind for your NFT's fusion count in the next chapters?`,
                'Chapter 02: Ascension': `Time for the ${underscore(
                    '2nd. experiment'
                )}. How about we escalate everything and hand you the Helm? We'll gradually give more details on this after we execute on our original promises.`,
                'Chapter 03: Prophecy': `${italic('The Grand Finale...')}`,
                'Chapter 04: Epilogue': `${underscore(
                    'Final Experiment'
                )} over. It's time to craft a well-oiled machine to continuously incubate those who deserve to experiment to find new utilities in NFTs and attract lasting community members who know where true value in NFTs will exist.`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                    inline: false,
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendFusion: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                'FUSION?': `Fusion ( in NFT terms ) is ${italic(
                    'usually'
                )} a process of merging 2 NFTs belonging to the same collection, keeping their best traits in one, generating an upgraded artwork for it and finally burning the extra NFT.`,
                'How to trigger a FUSION?': `You can trigger a fusion each time you purchase a <@&${config.role.titanbornesID}> NFT from a secondary market while you are holding one in your wallet. We have this fusion system already implemented in the Smart-Contract ready to use as soon as the minting starts.`,
                'What exactly happens within a FUSION?': `\n\n${bold(
                    '1st.'
                )} The NFT belonging to the buyer automatically upgrades its artwork and increments its FUSION COUNT. This process happens automatically without the need for you to do any extra transactions or pay extra gas fees!\n${bold(
                    '2nd.'
                )} The NFT belonging to the seller is burned, completely and irretrievably removed from circulation.`,
                'So my NFT gets an upgraded artwork on each FUSION?': `Yup. You just need to click on the refresh metadata button on your NFT's marketplace page and wait for the marketplace to fetch the new artwork.`,
                'Do I need to do something extra to make the FUSION work?': `No. Fusions happen automatically on basic token transfers ( when you purchase an NFT on a secondary market for example ) without the need for you to do any extra steps or pay fees for an extra transaction.`,
                'An example with numbers?': `You own an NFT with 3 fusions, you buy an NFT with 5 fusions from a secondary market, the NFT with 5 fusions is burned and the token you originally owned EVOLVES 5 times, turning to an NFT with 8 fusions and MASSIVELY upgrades its artwork.`,
                'So theoretically, the entire supply can drop to single-digits?': `Yup, It's sweet right?`,
                'Is there a caviat to this effortlessness?': `Yes. Each Ethereum wallet can hold only one token from this collection at a time.`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendWhitelist: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                'How does the whitelisting work?': `There are a total of 1,000 whitelist spots but it's not divided by 2 for each faction. Contributions from faction members decide how many spots each faction will have.`,
                'How do I earn a whitelist position?': `You can become <@&${
                    config.role.whitelistID
                }> by ${bold(
                    'CONTRIBUTING'
                )}.\n\n• Contribute to the lore.\n• Share ideas on how our unique fusion system can be utilized.\n• Spread the word on social media.\n• Share your art that shows how our fusion system will look like.\n• Invite friends to join your faction.\n• Help NFT beginners in the server.`,
                'My faction has X number of whitelist spots, how do I make sure I have one of those spots?': `You can check your ranking with the ${inlineCode(
                    '/leaderboard'
                )} command. If your faction has X whitelist spots, your rank needs to be at least X for you to be eligible.`,
                'Can I choose my faction?': `No. Faction roles are assigned randomly by this bot and cannot be changed.`,
                'Are there any other surprises?': `Yes. Top %10 of each faction's leaderboard will be extra happy when they mint their NFT!`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendCommands: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                '/leaderboard': `Get your ranking in your faction's leaderboard... ( 10m Cooldown )`,
                '/infiltrate': `Infiltrate your rival faction & retrieve a WL spot... ( 10m Cooldown )`,
                '/blackjack': `Play cards with an old wandering spirit!.. ( 30s Cooldown )`,
                '/blacksmith': `Visit the blacksmiths in their Realm to earn XP... ( 3m Cooldown )`,
                '/raid': `Go into the depths of the Crypt to earn XP... ( 3m Cooldown )`,
                '/roulette': `Throw a marble with an old wandering spirit...`,
                '/royale-join': `Join the Royale game! Only usable when a game has been initiated by the Mods...`,
                '/trial': `Prove your zeal... ( 15m Cooldown )`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: inlineCode(questions[index]),
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendLore: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            const intro = `This is a community owned project. <@&${config.role.founderID}> pushed it into existence but we will all shape it together with our discussions, interactions, Discord polls and if need be, DAO voting.\n\n`

            const titanbornes = `Titanbornes are a largely forgotten demigod creatures born from and put to a deep slumber by the Titans, buried in a large, undiscovered and beautiful Crypt.\n\nThey divide themselves into ${bold(
                '2'
            )} factions; <@&${config.role.reapersID}> and <@&${
                config.role.trickstersID
            }>. They don't harbor any malice for each other but prefer to stay with their own.`

            const titans = `Titans shaped the world as we know it today. Nobody knows where they came from and where they've gone to. The first and only children they birthed out of their own bodies were the <@&${config.role.nightmaresID}> but they immediately knew what abominations they had created and vowed to never birth children out of their own flesh. They knew they had to contain the evil and imprisoned the Nightmares. They poured their own blood into a mountain and made it flow through a fountain which birthed <@&${config.role.titanbornesID}> to create the only possible being capable of taking on the Nightmares if they ever escaped their captivity.`

            const factions = `<@&${config.role.reapersID}> are more powerful and adept to battle.\n<@&${config.role.trickstersID}> are the smartest and more shrewd.`

            const context = `Titans, Nightmares and Titanbornes have been gone from the face of the earth for millenias but they have left artifacts telling stories of their existence. Z was an archaeologist studying the oldest artifacts known to man who one day found a bizarre artifact that made her come in contact with a voice that introduced themeselves as <@&${config.role.nightmaresID}>. They tell the story of creation to Z, how the Titans created the world and how they birthed their first childs, Nightmares from their own bodies and imprisoned them soon after they were born. How the Titans created the <@&${config.role.titanbornesID}> to destroy their own first childs if they ever escaped their captivity.\n\nNightmares created an amulet just before they were imprisoned, an amulet that holds the power to manipulate Ichor, blood of the Titans that flows inside Titanbornes. Z finds the amulet with their directions.`

            const prologue = `Z activates the amulet & Titanbornes awaken from their slumber. They don't know how long or why they were put to sleep. One finds an old tablet in the Crypt depicting prophecies of them bringing about the end of life on earth. The tablet describes them as abominations exiled from face of the earth millenias ago. <@&${config.role.titanbornesID}> believe themeselves to be gentle and just creatures wrongfully robbed of living for thousands of years. They decide to find their way out of the Crypt and to the outside world. They find hordes of sentries guarding their way to the gate but they start moving, gathering resources and fighting their way to the gate.\n\nCan they open the gate? What is waiting on the other side?`

            const chapterOne = spoiler(`We shall see... 🐒`)

            let pair = {
                'Who are the Titanbornes?': titanbornes,
                'Who were the Titans?': titans,
                'What are the 2 factions?': factions,
                'Tip the balance...': context,
                Prologue: prologue,
                'Chapter 01: Genesis': chapterOne,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(intro)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendSafety: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                'Every DM is a ...?': bold('SCAM.'),
                'Will there be a stealth mint?': `${bold(
                    'NO!'
                )} Under no circumstances will there be a stealth mint or any other sort of unannounced minting. Any public or private messages claiming otherwise are trying to take advantage and scam you. We will announce the exact presale date and time ~ 48 hours in advance in <#${
                    config.channel.sensitive.announcementsID
                }> and on our ${hyperlink(
                    'Twitter',
                    'https://twitter.com/titanbornes'
                )}. `,
                'I just saw a collection named "Titanbornes" on a marketplace, should I buy?': `Only use the marketplace links in <#${
                    config.channel.sensitive.linksID
                }>. If there is no marketplace URL there, we have not yet minted and what you found is a ${bold(
                    'SCAM'
                )}! If the URL doesn't match with what you found, it is a ${bold(
                    'SCAM'
                )}!`,
                'Will I receive private messages from this project or the founders?': `${bold(
                    'NO!'
                )} Under no circumstances will there be private communication from this project or the founders.`,
                'What is the best way for me to stay safe?': `You should block private messages from this server RIGHT NOW using this ${hyperlink(
                    'official tutorial',
                    'https://support.discord.com/hc/en-us/articles/217916488-Blocking-Privacy-Settings-'
                )}. Scammers can send mass messages to users that have not blocked these messages and impersonate this project or the founders.`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendTerminology: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                Minting:
                    'It means generating a token on the blockchain as opposed to purchasing an NFT on the secondary-market that already exists.',
                'Gas War':
                    'Ethereum network has a finite processing power at each point in time. If demand exceeds what the network can comply with, gas prices can quickly grow to unreasonable amounts. Back in the summer of 2021, NFT projects were crippled with this issue when they published their smart-contracts to the public for minting.',
                Whitelist: `To overcome the gas war issue, NFT projects started to implement a feature in their smart-contracts to only allow a certain list of wallets to mint the collection's NFTs for a specific period of time. This ensures their dedicated members are guaranteed to mint with stable and logical gas costs.`,
                Presale:
                    'A time window where only the whitelisted accounts can mint NFTs from a collection. This is usually followed by the public sale in which all wallets in the Ethereum network can mint until the supply cap of the collection is met.',
                'On-Chain':
                    'It means the data in question is directly fetched from the blockchain as opposed to centralized third-parties; therefore the data is immutable, truly decentralized and uncensorable.',
                'Burning a token':
                    'It means a token ( an NFT in our context ) is irreversibly sent to a dead Ethereum address where nobody can access it and it gets completely removed from the circulating supply.',
                'Deflationary Supply':
                    'It means the total supply of tokens in an ecosystem ( in an NFT collection in our context ) decreases over time. So if the overall interest in that ecosystem is kept at the same level, the value of each token increases over time.',
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendTech: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                'ON-CHAIN ATTRIBUTES': `Your NFT's ${bold(
                    'FUSION COUNT'
                )} and ${bold(
                    'FACTION'
                )} traits are stored and modified completely ON-CHAIN. These are the only 2 traits required to generatively assemble other traits and the artwork of NFTs by our own backend or any other derivative project.`,
                'SEPARATE WHITELISTS FOR FACTIONS': `If you're <@&${config.role.whitelistID}> and mint in the 24h presale window, your NFT will have the same faction as your Discord role!`,
                FUSION: `Executing fusions in normal transactions is achieved by HEAVILY modifying how the standard Open-Zeppelin ERC721 contract behaves in normal transfer calls.`,
                'DYNAMIC RENDERING': `We have to generate a new artwork for your NFT each time you trigger a FUSION. In order to generate your new artwork:\n\n${bold(
                    '1st.'
                )} We are running a subgraph to fetch and index on-chain transactions. Each time a FUSION happens our smart-contract broadcasts it as an event for our subgraph to fetch. All of this happens so that we can always query the latest version of your NFT's ON-CHAIN attributes.\n${bold(
                    '2nd.'
                )} We have built an API from scratch to assemble and bake your NFT's upgraded traits and artwork completely on-the-fly based on your NFT's ON-CHAIN attributes provided by our subgraph.\n\n${bold(
                    'OPEN-SOURCE'
                )}\nAfter the mint we'll be gradually open-sourcing our tech-stack and we are looking forward to see what can be built on top of it!`,
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: answers[index],
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .setDescription(
                            `Interesting things we are doing on the technology side. We'll gradually give more details after we publish our Smart Contract and announce upcoming features.`
                        )
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
    sendLinks: async function (channel) {
        try {
            const providedChannel = client.channels.cache.get(channel)

            let pair = {
                Website: 'https://titanbornes.com',
                Twitter: 'https://twitter.com/titanbornes',
                Github: 'https://github.com/titanbornes',
            }

            let fields = []

            let questions = Object.keys(pair)
            let answers = Object.values(pair)

            for (let index in questions) {
                fields.push({
                    name: questions[index],
                    value: `[${answers[index]}](${answers[index]})`,
                })
            }

            await providedChannel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(config.embed_color)
                        .addFields(fields),
                ],
            })
        } catch (error) {
            console.log(error)
        }
    },
}
