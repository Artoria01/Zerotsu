module.exports = {
	name: 'queue',
	description: 'Commande de file d\'attente.',
	cooldown: 5,
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a rien qui joue.');
		return message.channel.send(`
__**File d'attente de chansons:**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Lecture en cours:** ${serverQueue.songs[0].title}
		`);
	}
};
