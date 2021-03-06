const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "firstmessage",
  description: "send first message on this channel.",
  usage: "firstmessage/firm",
  category: "info",
  aliases: ["firm"],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(message, args, client) {
    const fetchMessages = await message.channel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const msg = fetchMessages.first();

    message.channel.send(
      new MessageEmbed()
        .setColor("#FF0000")
        .setTitle(`Click To View The Message ${message.channel.name}`)
        .setURL(msg.url)
        .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
        .setDescription("Content: " + msg.content)
        .addField("Author", msg.author, true)
        .addField('Message ID', msg.id, true)
        .addField('Created At', message.createdAt.toLocaleDateString(), true)
    );
  },
};
