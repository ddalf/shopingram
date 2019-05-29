export interface insertTopicParams {
    topicImg: string, 
    topicTitle: string, 
    userId: string 
}



export interface insertDiscussParams {
    topicId: string, 
    replyContent: string, 
    replyName: string, 
    userId: string 
}


export interface queryTopicParams {
    topicId: string | number, 
    userId?: string,  
    status?: number
}


export interface queryTopicCountsParams {
    userId: string  
}
