module.exports.run = async (client, message, args) => {
    await message.delete();
    await client.channels.cache.get('813765038895923200').send("Le bot redémarre !");
    process.exit();
};
  
  
  module.exports.help = {
          name: 'reload',
          description: "Relancer le bot",
          usage: '',
          aliases: ['reload'],
          category: 'admin',
          cooldown: 3,
          permissions: true,
          isUserAdmin: false,
          args: false ,
  }