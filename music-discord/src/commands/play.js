const { Util } = require('discord.js');
const ytdl = require('ytdl-core');
let search = require('youtube-search');
let opts = {
  maxResults: 1,
  key: process.env.YOUTUBE_TOKEN,
  type: 'video'
};
module.exports = {
	name: 'play',
	description: 'Commande de lecture.',
	usage: '[command name]',
	args: true,
	cooldown: 5,
	async execute(message, args) {
		const { channel } = message.member.voice;
		if (!channel) return message.channel.send('Je suis désolé mais vous devez être dans un canal vocal pour écouter de la musique!');
		const permissions = channel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.channel.send('Je ne peux pas me connecter à votre canal vocal, assurez-vous que j\'ai les autorisations appropriées!');
		if (!permissions.has('SPEAK')) return message.channel.send('Je ne peux pas parler dans ce canal vocal, assurez-vous que j\'ai les autorisations appropriées!');

		let song = await search(args[0].replace(/<(.+)>/g, '$1'), opts, async function(err, results) {
		  if(err) return console.log(err);
		  console.dir(results[0].id);
		  console.dir(results[0].link);
		  console.dir(results[0].title);
		  let song = {
				id: results[0].id,
				title: Util.escapeMarkdown(results[0].title),
				url: results[0].link
			};
			
			console.log(song);
		const serverQueue = message.client.queue.get(message.guild.id);
		
		if (serverQueue) {
			serverQueue.songs.push(song);
			console.log(serverQueue.songs);
			return message.channel.send(`✅ **${song.title}** a été ajouté à la file d'attente!`);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel: channel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		};
		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);
			if (!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.play(ytdl(song.url))
				.on('finish', () => {
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on('error', error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);
			queue.textChannel.send(`🎶 Commencer à jouer: **${song.title}**`);
		};

		try {
			const connection = await channel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Je n'ai pas pu rejoindre le canal vocal: ${error}`);
			message.client.queue.delete(message.guild.id);
			await channel.leave();
			return message.channel.send(`IJe n'ai pas pu rejoindre le canal vocal: ${error}`);
		}
		});
		
	}
};
