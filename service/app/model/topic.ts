module.exports = app => {
  const {STRING, INTEGER, DATE, NOW} = app.Sequelize;

  const Topic = app.model.define('topic', {
    topicId: {type: INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: INTEGER},
    topicTitle: {type: STRING(255), allowNull: true}, 
    topicImg: {type: STRING(1000), allowNull: false},
    address: {type: STRING(255), allowNull: true, defaultValue: ''}, 
    created_at: {type: DATE, defaultValue: NOW},
    updated_at: {type: DATE, defaultValue: NOW}
  }, {
    freezeTableName: true 
  });

  return Topic;
};