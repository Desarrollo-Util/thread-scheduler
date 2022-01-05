declare global {
	namespace NodeJS {
		interface ProcessEnv {
			READ_INTERVAL_TASKS_MINUTES: string;
			TWITTER_API_KEY: string;
			TWITTER_API_SECRET: string;
			TWITTER_OAUTH_TOKEN_CLIENT: string;
			TWITTER_OAUTH_SECRET_CLIENT: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
