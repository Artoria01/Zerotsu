module.exports = {
	name: 'reload',
	description: 'relance le bot.',
	cooldown: 5,
};

module.exorts.run = async (client, message, args) => {
    await message.delete();
    await client.channels.cache.get('810136724381892689').send("Le bot redémarre !");
    process.exit();
}