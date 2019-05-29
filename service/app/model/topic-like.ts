module.exports = app => {
    const {STRING, INTEGER, DATE, NOW} = app.Sequelize;
  
    const TopicLike = app.model.define('topic_like', {
      id: {type: INTEGER(10), primaryKey: true, autoIncrement: true},
			topicId: {type: INTEGER(10)},
			userId: {type: STRING(255)},
			status: {type: INTEGER(1)},
			created_at: {type: DATE, defaultValue: NOW},
			updated_at: {type: DATE, defaultValue: NOW}
    }, {
      freezeTableName: true 
    });
  
    return TopicLike;
  };