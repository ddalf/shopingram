
module.exports = (option, app) => {

  /**
   * @author shawzhou
   *
   * @param cxt
   * @param next
   *
   * @modified by shawzhou on 15:01 2018/10/11
   * @return {Promise<void>}
   */

  return async function (ctx, next) {
    try {
        await next(option);
    } catch (err) {
        app.emit('error', err);
        const status = err.status || 500;

        const error_msg = status === 500 && app.config.env === 'prod'
            ? 'Internal Server Error'
            : err.message;
            
        ctx.body = { 
            data: {},
            message: error_msg,
            success: false
        };
        ctx.status = status;
    }
  };
};