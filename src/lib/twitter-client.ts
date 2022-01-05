import { TwitterApi } from 'twitter-api-v2';

const initializeTwitterClient = async () => {
	// Create a new Twitter API client with three-legged OAuth 1.0a authentication.
	const twitterClient = new TwitterApi({
		appKey: process.env.TWITTER_API_KEY as string,
		appSecret: process.env.TWITTER_API_SECRET as string,
		accessToken: process.env.TWITTER_OAUTH_TOKEN_CLIENT as string,
		accessSecret: process.env.TWITTER_OAUTH_SECRET_CLIENT as string,
	});

	//Check if Twitter API client connected succesfully
	try {
		await twitterClient.currentUser();
	} catch (error: any) {
		if (error.data?.errors?.length)
			console.error(error.data?.errors[0].message);
		else
			console.error(
				'An error has occurred, check that the token is valid and the Twitch API is online'
			);

		process.exit(-1);
	}

	return twitterClient;
};

export default initializeTwitterClient;
