const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const { lineReply } = require("discord-reply");

module.exports = {
  name: "ban",
  aliases: ["b", "banish", "band"],
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  args: true,
  permissions: "BAN_MEMBERS",
  bot: ["BAN_MEMBERS"],
  async execute(message, args, client) {
 try {
    const bot = client  
    if (!args[0]) return message.lineReplyNoMention("**Please Provide A User To Ban!**")

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**User Is Not In The Guild**");
            if (banMember === message.member) return message.channel.send("**You Cannot Ban Yourself**")

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**Cant Kick That User**")
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**Hello, You Have Been Banned From ${message.guild.name} for - ${reason || "No Reason"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            message.lineReplyNoMention(`**${banMember.user.username} has been banned✈️ for ${reason}**`)        
            } else {
           message.lineReplyNoMention(`**${banMember.user.username} has been banned✈️**`)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#116d56")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.lineReplyNoMention(`**${e.message}**`)
        }
    }
};
