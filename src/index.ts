import dotenv from 'dotenv';
import { watchFile } from 'fs';
import schedule from 'node-schedule';
import { join } from 'path';
import initializeTwitterClient from './lib/twitter-client';
import readNewTasks from './utils/readNewTasks';
import scheduleTasks from './utils/scheduleTasks';
dotenv.config();

const bootstrap = async () => {
	const twitterClient = await initializeTwitterClient();

	const tasks = await readNewTasks();
	scheduleTasks(twitterClient, tasks);

	watchFile(join(__dirname, '../src/tasks.json'), async () => {
		console.log(Object.keys(schedule.scheduledJobs).length);

		await (schedule as any).gracefulShutdown();

		console.log(Object.keys(schedule.scheduledJobs).length);

		const tasks = await readNewTasks();
		scheduleTasks(twitterClient, tasks);

		console.log(Object.keys(schedule.scheduledJobs).length);
	});
};

bootstrap();
