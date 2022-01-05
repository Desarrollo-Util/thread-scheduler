import { readFile } from 'fs/promises';
import { join } from 'path';
import { PublicationList } from '../types/task';

export default async () => {
	const tasksRaw = await readFile(join(__dirname, '../../src/tasks.json'));
	const { tasks } = JSON.parse(tasksRaw.toString()) as PublicationList;

	return tasks;
};
