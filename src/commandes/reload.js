module.exports = {
	name: 'reload',
	description: 'relance le bot.',
	cooldown: 5,

    async execute(client, message, args) {
    await message.delete();
    await client.channels.cache.get('813765038895923200').send("Le bot redémarre !");
    process.exit();
    },
}
