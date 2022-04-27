const client = require('../index.js')
const config = require('../config.json')
const { bold } = require('@discordjs/builders')

// Functions
const { tempInvitees, codeUses } = require('../functions/core/createTempData')
// const setCodeUses = require('../functions/core/setCodeUses')

// Models
const GuildModel = require('../database/models/guildModel')
const FactionModel = require('../database/models/factionModel')
const UserModel = require('../database/models/userModel')

// client.on('guildMemberAdd', async function (member) {
//     try {
//         const newInvites = await member.guild.invites.fetch()
//         const invite = newInvites.find(
//             (inv) => codeUses.get(inv.code) < inv.uses
//         )

//         if (invite) {
//             const guild = await GuildModel.findOne({
//                 id: config.guildID,
//             })

//             if (
//                 guild &&
//                 !tempInvitees.includes({ discordID: member.user.id }) &&
//                 !guild.invitees.includes(member.user.id)
//             ) {
//                 const inviterUser = await UserModel.findOne({
//                     discordID: invite.inviter.id,
//                 })

//                 if (
//                     inviterUser &&
//                     !inviterUser.invitees.includes(member.user.id)
//                 ) {
//                     inviterUser.invites++
//                     inviterUser.xp += config.invitePoints
//                     inviterUser.invitees.push(member.user.id)
//                     await inviterUser.save()

//                     guild.invitees.push(member.user.id)
//                     await guild.save()

//                     const factions = ['Reapers', 'Tricksters']

//                     tempInvitees.push({
//                         discordID: member.user.id,
//                         faction:
//                             invite.inviter.id == config.ownerID
//                                 ? 'Reapers'
//                                 : inviterUser.faction,
//                     })

//                     const providedChannel = client.channels.cache.get(
//                         config.channel.records.invitesID
//                     )

//                     await providedChannel.send({
//                         content: `<@${member.user.id}> arrives invited by <@${
//                             invite.inviter.id
//                         }> who has ${bold(
//                             inviterUser.invites
//                         )} valid invites and receives ${bold(
//                             config.invitePoints
//                         )} XP! <@${member.user.id}> will join ${
//                             invite.inviter.id == config.ownerID
//                                 ? 'a faction by random'
//                                 : inviterUser.faction
//                         }.`,
//                     })
//                 }
//             }
//         }

//         await setCodeUses()
//     } catch (error) {
//         console.log(error)
//     }
// })

client.on('guildMemberRemove', async function (member) {
    try {
        const fetchedUser = await UserModel.findOne({
            discordID: member.user.id,
        })

        if (fetchedUser.xp > 5000) {
            fetchedUser.xp = 5000
            await fetchedUser.save()
        }
    } catch (error) {
        console.log(error)
    }
})
