module.exports = {
	name: 'skip',
	description: 'skip commande.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis désolé mais vous devez être dans un canal vocal pour écouter de la musique!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a rien à jouer que je pourrais sauter pour toi.');
		serverQueue.connection.dispatcher.end('La commande Skip a été utilisée!');
	}
};
