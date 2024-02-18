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
};
