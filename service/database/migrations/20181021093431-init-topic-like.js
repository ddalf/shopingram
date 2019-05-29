'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, NOW } = Sequelize;
		await queryInterface.createTable('topic-like', {
			id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},
			topicId: {type: INTEGER(10)},
			userId: {type: STRING(255)},
			status: {type: INTEGER(1)},
			created_at: {type: DATE, defaultValue: NOW},
			update_at: {type: DATE, defaultValue: NOW}
		});
	},
	down: async queryInterface => {
		await queryInterface.dropTable('topic-like');
	}
};
