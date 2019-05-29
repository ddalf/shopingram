import { Controller } from 'egg'

class UserController extends Controller {
    /**
     * H5 
     * @return {Promise<*>}
     */

    
    public async register () {
        const {ctx} = this;
        const {password, username, email} = ctx.request.body

        
        if (!this.__errNotice) return

        
        await ctx.service.user.register({ password, username, email});

    }

    
    public async loginIn () {
        const {ctx} = this;
        const {password, email} = ctx.request.body
        console.log("login",ctx.request.body);
        
        const token = await ctx.service.user.login({password, email})

         
        if (token) {
            const opts = {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: false,
                domain: '127.0.0.1'
            };
            ctx.cookies.set(this.config.auth_cookie_name, token, opts);  
            ctx.returnBody(200, "로그인 성공")
        } else {
            ctx.throw(400, '이메일 또는 비밀번호가 잘못되었습니다.')
        }
    }

    
    public async signOut () {
        const { ctx } = this;
        ctx.logout();
        ctx.cookies.set(this.config.auth_cookie_name, "");  
        ctx.returnBody(200, "로그아웃 성공")
    }

    
    private __errNotice () {
        const {ctx} = this;
        const {mobile, password, code, username, email} = ctx.request.body
        
        let message;
        if (!mobile || !email) {
            message = '전화번호 또는 사서함은 비워 둘 수 없습니다.'
        } else if (!code) {
            message = '인증 코드는 비워 둘 수 없습니다.'
        } else if (!username) {
            message = '이메일이 비어 있습니다.'
        } else if (!password) {
            message = '비밀번호는 비워 둘 수 없습니다.'
        }

        
        if (message) {
            ctx.throw(400, message);
            return false
        }
        return true
    }

}

module.exports = UserController
