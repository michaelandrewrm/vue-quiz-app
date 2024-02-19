export default {
	get(tableName, sequelize) {
		return sequelize.model(tableName).findAll();
	},

	async create(tableName, sequelize, payload) {
		const user = await sequelize.model(tableName).findOne({
			where: {
				email: payload?.email,
			},
		});

		if (user) {
			return user;
		}

		return sequelize.model(tableName).create(payload);
	},

	async getScore({ userId, answers }, sequelize) {
		const questions = await sequelize.model('Questions').findAll();
		const users = await sequelize.model('Users').findAll();
		const currentUser = await sequelize.model('Users').findOne({
			where: {
				id: userId,
			},
		});

		let score = 0;

		answers.forEach(({ questionId, id: answerId }) => {
			const question = questions.find(({ id }) => id === questionId);

			if (question && question.correctAnswer === answerId) {
				score += 1;
			}
		});

		const usersScores = users.map(({ score: sco }) => sco);
		const average = usersScores.reduce((sum, sco) => sum + sco, 0) / usersScores.length;
		const percentage = (score / average) * 100;

		currentUser.set({ score });

		await currentUser.save();

		return { score, average: percentage };
	},
};
