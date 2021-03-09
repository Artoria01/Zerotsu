module.exports = {
	name: 'stop',
	description: 'Commande d\'arrêt.',
	cooldown: 5,
	execute(message) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis désolé mais vous devez être dans un canal vocal pour écouter de la musique!');
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a rien de jouer que je pourrais arrêter pour toi.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('La commande d\'arrêt a été utilisée!');
	}
};
