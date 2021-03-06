const discord = require("discord.js");
const { lineReply } = require("discord-reply");

module.exports = {
  name: "vkick",
  category: "moderation",
  async execute(message, args, client) {
    if (!message.guild.me.hasPermission(["ADMINISTRATOR"]))
      return message.channel.send(
        "I Don't Have Proper Permissions To Use This Command!"
      );

    if (!message.mentions.members.first())
      return message.channel.send(
        `Please Mention User That You Want To Kick From Voice Channel!`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.lineReplyNoMention(`User Is Not In Any Voice Channel!`);

    message.mentions.members.first().voice.kick();
    
    message.lineReplyNoMention(`User Has Been Kicked From Voice Channel`)
  }
};
