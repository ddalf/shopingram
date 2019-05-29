'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('users', {
      userId: {type: INTEGER, primaryKey: true, autoIncrement: true},
      username: {type: STRING(255), allowNull: false}, 
      email: {type: STRING(255), allowNull: false}, 
      password: {type: STRING(255), allowNull: false},  
      avatarUrl: STRING(256),
      mobile: STRING(32),
      sex: {type: INTEGER, defaultValue: 0}, 
      created_at: DATE,
      updated_at: DATE
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  }
};
