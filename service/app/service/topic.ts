import { Service } from 'egg';
import { insertTopicParams, insertDiscussParams, queryTopicParams, queryTopicCountsParams} from './type/topic-interface'

export default class TopicService extends Service {
    public async insertTopic (topicParams: insertTopicParams) {
        let {ctx} = this

        return await ctx.model.Topic.create(topicParams);
    }

    public async insertDiscuss (discussParams: insertDiscussParams) {
        let {ctx} = this

        return await ctx.model.Discuss.create(discussParams);
    }

    public async queryTopicDetail (query: queryTopicParams) {
        let {ctx} = this
        return await ctx.model.Topic.findOne({
            where: query
        })
    }

    public async queryTopicList (query) {
        let {ctx} = this
        return await ctx.model.Topic.findAll({
            where: query,
            order:  [['created_at', 'DESC']]
        })
    }

    public async topicDetailHanderl(topicId) {
        const { ctx } = this;


        
        let topic = await ctx.service.topic.queryTopicDetail({
            topicId: +topicId 
        })

        let userId = topic.userId
        
        let user = await this.service.user.getUserByUserId(userId)

        
        let discuss = await ctx.service.topic.queryDiscuss({
            topicId: +topicId 
        })

        
        let topicLike = await ctx.service.topic.queryTopicLike({
            topicId: +topicId, 
            userId: ctx.user.userId,
            status: 1
        })

        
        let topicLikeCounts = await ctx.service.topic.queryTopicLikeCounts({
            topicId: +topicId, 
            status: 1
        })


        
        let disscussList = discuss.map((item) => {
            return {
                replyName: item.replyName,
                replyContent: item.replyContent,
                userId: item.userId
            }
        })

        
        const topicDetail = {
            userInfo: {
                username: user.username,
                avatarUrl: user.avatarUrl,
                userId: user.userId
            },
            topic: {
                topicImgList: JSON.parse(topic.topicImg),
                created_at: topic.created_at,
                topicId,
                topicLike: !!topicLike,
                topicLikeCounts: topicLikeCounts.count
            },
            discuss: disscussList
        }
        return topicDetail || {}
    }

    public async queryTopicLike(query: queryTopicParams) {
        let {ctx} = this
        return await ctx.model.TopicLike.findOne({
            where: query
        });
    }


    public async putTopicLike(query: queryTopicParams, topicStatus) {
        let { ctx } = this
        let result = await this.queryTopicLike(query)

        if (!result) {
            return await ctx.model.TopicLike.create(topicStatus)
        } else {
            return await ctx.model.TopicLike.update(topicStatus, {
                where: query
            })
        }
    }

    public async queryTopicLikeCounts(query: queryTopicParams) {
        let { ctx } = this

        return await ctx.model.TopicLike.findAndCountAll({
            where: query
        });
    }

    public async queryTopicCounts(query: queryTopicCountsParams) {
        let { ctx } = this

        return await ctx.model.Topic.findAndCountAll({
            where: query,
            order:  [['created_at', 'DESC']]
        });
    }
    
    public async queryDiscuss (query: queryTopicParams) {
        let {ctx} = this

        return await ctx.model.Discuss.findAll({
            where: query
        });
    }


    public async countsTopic (query: queryTopicParams) {
        let {ctx} = this

        return await ctx.model.Discuss.findAll({
            where: query
        });
    }


}
