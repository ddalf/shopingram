import { Service } from 'egg';
import {followUserParams} from './type/follow-interface'

export default class followService extends Service {
    public async followUser (followUser: followUserParams) {
        let {ctx} = this

        const obj = await ctx.model.Follow.findOne({ 
            where: {
                userId: followUser.userId
            } 
        })
        
        if(obj) { // update
            return await obj.update(followUser);
        } else { // insert
            return await ctx.model.Follow.create(followUser);
        }
    }

    public async findFollow (query) {
        let {ctx} = this

        return await ctx.model.Follow.findAll({ 
            where: query
        })
    }

    public async findFollowCounts (query) {
        let {ctx} = this

        return await ctx.model.Follow.findAndCountAll({ 
            where: query
        })
    }
}
