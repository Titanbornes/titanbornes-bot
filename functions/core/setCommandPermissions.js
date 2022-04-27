const client = require('../..')
const config = require('../../config.json')

module.exports = async function setCommandPermissions() {
    try {
        let submitWallet, giveXP, takeXP, royaleInitiate, royaleRumble

        const guild = client.guilds.cache.get(config.guildID)

        while (!submitWallet) {
            submitWallet = guild.commands.cache.find(
                (c) => c.name === 'submit-wallet'
            )
        }

        while (!giveXP) {
            giveXP = guild.commands.cache.find((c) => c.name === 'give-xp')
        }

        while (!takeXP) {
            takeXP = guild.commands.cache.find((c) => c.name === 'take-xp')
        }

        while (!royaleInitiate) {
            royaleInitiate = guild.commands.cache.find(
                (c) => c.name === 'royale-initiate'
            )
        }

        while (!royaleRumble) {
            royaleRumble = guild.commands.cache.find(
                (c) => c.name === 'royale-rumble'
            )
        }

        const fullPermissions = [
            {
                id: submitWallet.id,
                permissions: [
                    {
                        id: config.role.walletSubmissionID,
                        type: 'ROLE',
                        permission: true,
                    },
                ],
            },
            {
                id: giveXP.id,
                permissions: [
                    {
                        id: config.role.founderID,
                        type: 'ROLE',
                        permission: true,
                    },
                    {
                        id: config.role.modID,
                        type: 'ROLE',
                        permission: true,
                    },
                ],
            },
            {
                id: takeXP.id,
                permissions: [
                    {
                        id: config.role.founderID,
                        type: 'ROLE',
                        permission: true,
                    },
                    {
                        id: config.role.modID,
                        type: 'ROLE',
                        permission: true,
                    },
                ],
            },
            {
                id: royaleInitiate.id,
                permissions: [
                    {
                        id: config.role.founderID,
                        type: 'ROLE',
                        permission: true,
                    },
                    {
                        id: config.role.modID,
                        type: 'ROLE',
                        permission: true,
                    },
                ],
            },
            {
                id: royaleRumble.id,
                permissions: [
                    {
                        id: config.role.founderID,
                        type: 'ROLE',
                        permission: true,
                    },
                    {
                        id: config.role.modID,
                        type: 'ROLE',
                        permission: true,
                    },
                ],
            },
        ]

        await guild.commands.permissions.set({ fullPermissions })
    } catch (error) {
        console.log(error)
    }
}
