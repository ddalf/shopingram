const fn = {
  /**
  * @param fn{Function}     
  * @param delay{Number}    
  * @param options{Object}   {leading:false},
  *                          {trailing:false},
  * @returns {Function}     
  */
  throttle(fn ,delay ,options) {
      var wait=false;
      if (!options) options = {};
      return function (){
          const args=arguments;
          if(!wait){
              if (!(options.leading === false)){
                  fn.apply(this,args);
              }
              wait=true;
              setTimeout(()=> {
                  if (!(options.trailing === false)){
                      fn.apply(this,args);
                  }
                  wait=false;
              },delay);
          }
      }
  },
  /**
    * debunce 
    * @param fn{Function}     
    * @param delay{Number}    
    * @returns {Function}     
   */
  debunce(fn, delay = 1000) {
    var timer;
    var context = this;
    return function () {
        if (timer) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn.apply(context, arguments)
            }, delay);
        } else {
            timer = setTimeout(() => {
                fn.apply(context, arguments)
            }, delay);
        }
    }
  }
}
export default fn