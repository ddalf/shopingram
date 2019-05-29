

module.exports = (option, app) => {
  return async function (ctx, next) {
    if (app.config.authWhiteList.indexOf(ctx.url) !== -1) {
      await next(option)
      return
    }
    
    if (ctx.cookies.get('token')) {
      let token = ctx.cookies.get('token')
      try {
        ctx.jwt.verify(token, app.config.jwtSecret);
      } catch (error) {
        ctx.returnBody(401, "로그인하지 않았습니다. 다시 로그인하십시오.")
        return;
      }
      await next(option);
    } else {
      ctx.returnBody(401, "로그인하지 않았습니다. 다시 로그인하십시오.")
      return;
    }
  }
};
