module.exports = app => {
  const {STRING, INTEGER, DATE, NOW} = app.Sequelize;

  const User = app.model.define('users', {
      id: {type: INTEGER, primaryKey: true, autoIncrement: true},//记录id
      user_id: {type: INTEGER},//用户id
      username: {type: STRING(255), allowNull: false}, // 用户名
      email: {type: STRING(255), allowNull: false},// email 地址
      password: {type: STRING(255), allowNull: false},// 密码  
      avatar_url: STRING(256),// 头像
      mobile: STRING(32),// 手机号
      sex: {type: INTEGER, defaultValue: 0}, // 值为1时是男性，值为2时是女性，默认值为0时是未知
      created_at: {type: DATE, defaultValue: NOW},// 创建时间
      updated_at: {type: DATE, defaultValue: NOW}// 更新时间
  }, {
    freezeTableName: true // 不自动将表名添加复数
  });

  return User;
};