import { Sequelize, DataTypes } from 'sequelize';
import fs from 'node:fs/promises';

export default async function createDataBase() {
	const usersUrl = new URL('./users.json', import.meta.url);
	const questionsUrl = new URL('./questions.json', import.meta.url);
	const users = await fs.readFile(usersUrl, 'utf-8');
	const questions = await fs.readFile(questionsUrl, 'utf-8');
	const usersData = JSON.parse(users);
	const questionsData = JSON.parse(questions);
	const { log } = console;

	const sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: './server/db/database.sqlite',
		logging: log,
	});

	// Models
	const Users = sequelize.define(
		'Users',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			fullname: { type: DataTypes.STRING },
			email: { type: DataTypes.STRING },
			score: { type: DataTypes.INTEGER, allowNull: true },
		},
		{
			tableName: 'Users',
			createdAt: false,
			updatedAt: false,
			timestamps: false,
		}
	);

	const Questions = sequelize.define(
		'Questions',
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				primaryKey: true,
			},
			description: { type: DataTypes.STRING },
			answers: { type: DataTypes.JSON },
			correctAnswer: { type: DataTypes.STRING },
		},
		{
			tableName: 'Questions',
			createdAt: false,
			updatedAt: false,
			timestamps: false,
		}
	);

	await Users.drop();
	await Questions.drop();

	await sequelize.sync();

	await Users.bulkCreate(usersData);
	await Questions.bulkCreate(questionsData);

	return sequelize;
}
