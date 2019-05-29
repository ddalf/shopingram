'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const { INTEGER, DATE, STRING, NOW } = Sequelize;
		await queryInterface.createTable('discuss', {
			discussId: {type: INTEGER(10), primaryKey: true, autoIncrement: true},
			topicId: {type: INTEGER(10)},
			userId: {type: STRING(255)},
			replyName: {type: STRING(1000), allowNull: false},
			replyContent: {type: STRING(255), allowNull: true}, 
			created_at: {type: DATE, defaultValue: NOW}
		});
	},
	down: async queryInterface => {
		await queryInterface.dropTable('discuss');
	}
};
