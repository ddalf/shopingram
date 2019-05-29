const jwt = require('jsonwebtoken');

module.exports = {
  get jwt() {
    return jwt
  },
  get user() {
    let token = this.cookies.get('token')
    let user = jwt.verify(token, this.app.config.jwtSecret);
    return user
  },
  /**
   * 
   * @param status
   * @param message 
   * @param data 
   */
  returnBody (status, message, data = {}) {
    this.status = status
    this.body = {
      data,
      message: message,
      success: true
    }
  },
  /**
   * 驼峰转下划线
   * @param obj 
   * @return newObj 
   */
  humpToUnderline (obj) {
    let newKey = obj.keys()
    let newObj = {}
    let humpReg = /([A-Z])/g

    newKey.forEach((item) => {
      newObj[item.replace(humpReg,"_$1").toLowerCase()] = obj[item]
    })
    return newObj
  }
};
