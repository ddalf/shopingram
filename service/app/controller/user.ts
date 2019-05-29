import { Controller } from 'egg'

class UserController extends Controller {
 
    public async userInfo() {
        const {ctx} = this

        let userId = ctx.query.userId || ctx.user.userId


        let user = await this.service.user.getUserByUserId(userId)
        let userInfo = {
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl,
            abstract: user.abstract,
            account: user.email.replace(/@.*/, ''),
            mobile: user.mobile,
            sex: user.sex,
            userId: user.userId,
            businessman : user.businessman
        }
        console.log('user info', userInfo);
        ctx.returnBody(200, "사용자정보", userInfo)
    }

    public async updateUserInfo () {
        const {ctx} = this
        let userId = ctx.user.userId

        let contentBody = ctx.request.body
        

        if (contentBody.email) {
            let result = await this.service.user.getUserByMail(contentBody.email)
            if (result && result.userId !== userId) {
                ctx.returnBody(400, "사용중인 이메일입니다.")
                return
            }
        }


        let result = await this.service.user.getUserByUserId(userId)
        if (contentBody.password && result && result.password !== contentBody.password) {
            ctx.returnBody(400, "비밀번호가 맞지 않습니다.")
            return
        } else if(contentBody.password) {
            contentBody.password = contentBody.newPassword
        }

        

        await this.service.user.updateUserInfo({userId}, contentBody)


        if (contentBody.password) {
            ctx.logout();
            ctx.cookies.set(this.config.auth_cookie_name, "");
            ctx.returnBody(401, "비밀번호 업데이트 성공. 다시 로그인하십시오.")
        } else {
            ctx.returnBody(200, "업데이트 완료")
        }
    }

    public async userPersonalInfo () {
        const {ctx} = this

        let userId = ctx.query.userId || ctx.user.userId


        let topics = await ctx.service.topic.queryTopicCounts({
            userId
        })

        let topicList: any = [];

        for (let topic of topics.rows) {
            let item = await ctx.service.topic.topicDetailHanderl(topic.topicId)
            topicList.push(item)
        }



        let fansCounts = await ctx.service.follow.findFollowCounts({
            userId,
            status: 1
        })


        let followCounts = await ctx.service.follow.findFollowCounts({
            followedId: userId,
            status: 1
        })

        let isSelf = !ctx.query.userId || ctx.query.userId === ctx.user.userId

        console.log('ctx.query', ctx.query.userId);

        let followList = []
        if (!isSelf) {
            followList  = await this.ctx.model.Follow.findAll({
                attributes: ['userId'],
                where: {
                    followedId: ctx.user.userId,
                    userId: ctx.query.userId,
                    status: 1
                }
            })
        }


        ctx.returnBody(200, "성공", {
            topic: {
                counts: topics.count,
                topicList
            },
            followCounts: followCounts.count,
            fansCounts: fansCounts.count,
            isSelf,
            hasFollow: followList.length > 0
        })
    }
}

module.exports = UserController
