import { Controller } from 'egg'

class FriendController extends Controller {

    public async follow() {
        const {ctx} = this
        const {userId, status} = ctx.request.body

        let followedId = ctx.user.userId

        let followMsg = {
            userId, 
            followedId, 
            status
        }

        await ctx.service.follow.followUser(followMsg)
        
        ctx.returnBody(200, +status?"성공":"실패")
    }


    // 获取未关注用户列表
    public async notFollowList() {
        const {ctx} = this

        let userId = ctx.user.userId

        let friendList = await ctx.service.user.getUserList(userId)
        
        ctx.returnBody(200, "성공", friendList)
    }
}

module.exports = FriendController
