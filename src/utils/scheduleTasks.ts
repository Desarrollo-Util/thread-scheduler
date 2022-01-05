import { scheduleJob } from 'node-schedule';
import { join } from 'path';
import { SendTweetV2Params, TwitterApi } from 'twitter-api-v2';
import { Publication, PublicationData } from '../types/task';

const publishTweet = async (
	twitterClient: TwitterApi,
	publication: PublicationData
) => {
	try {
		const mediaId = await twitterClient.v1.uploadMedia(
			join(__dirname, '../../img', publication.media)
		);

		await twitterClient.v2.tweet({
			media: { media_ids: [mediaId] },
			text: publication.text,
		});

		console.log(`Tweet published on ${new Date().toLocaleString('es-ES')}`);
	} catch (error) {
		console.error('Error at publishing tweet', error);
	}
};

const publishThread = async (
	twitterClient: TwitterApi,
	publications: PublicationData[]
) => {
	try {
		const threadData: SendTweetV2Params[] = [];

		for (const publication of publications) {
			const mediaId = await twitterClient.v1.uploadMedia(
				join(__dirname, '../../img', publication.media)
			);

			threadData.push({
				media: { media_ids: [mediaId] },
				text: publication.text,
			});
		}

		await twitterClient.v2.tweetThread(threadData);
		console.log(
			`Tweet thread published on ${new Date().toLocaleString('es-ES')}`
		);
	} catch (error) {
		console.error('Error at publishing tweet thread', error);
	}
};

export default (twitterClient: TwitterApi, tasks: Publication[]) => {
	for (const task of tasks) {
		const { pubDate, data } = task;

		const publishDate = new Date(pubDate);
		publishDate.setHours(publishDate.getHours() - 1);

		if (data.length === 1) {
			scheduleJob(
				publishDate,
				async () => await publishTweet(twitterClient, data[0])
			);
		} else {
			scheduleJob(
				publishDate,
				async () => await publishThread(twitterClient, data)
			);
		}
	}
};
