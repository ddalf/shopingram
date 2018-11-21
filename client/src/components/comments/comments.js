import React from 'react'
import Style from './comments.scss'
import API from '@common/api.js'
import { notification } from 'antd';
import { connect } from "react-redux";


@connect(
    store => {
        return {
            userInfo: store.userInfo
        }
    },
    dispatch => {
        return {
            addComments: info => {
                dispatch({
                    type: 'ADD_COMMENT',
                    ...info
                })
            },
            topicLikeFn: info => {
                dispatch({
                    type: 'TOPIC_LIKE',
                    ...info
                })
            }
        };
    }
)
class Comments extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            replyContent: '',
            selfLove: false,
            topicLike: props.topicLike,
            showMoreComments: false
        }
        this._handleKeyPress = this._handleKeyPress.bind(this)
    }

    handelChange (event){
        this.setState({replyContent:event.target.value})
    }

    __showMoreComments () {
        this.setState({
            showMoreComments: true
        })
    }


    // 聚焦
    focus () {
        this.refs.textInput.focus();
    }

    // 点赞
    async topicLike() {
        let response = await API.topicLike({ topicId: this.props.topicId, status: this.props.topicLike? 0 : 1 })

        // 确定点赞数，status: 1点赞，0取消
        let dotCounts;
        if (response.data.status){
            dotCounts = this.props.dotCounts + 1;
        } else {
            dotCounts = this.props.dotCounts - 1 >= 0 ? this.props.dotCounts - 1 : 0;
        }

        // 更新store中的点赞状态
        this.props.topicLikeFn({
            topicLikeCounts: dotCounts, 
            topicLike: response.data.status === 1,
            index: this.props.topicIndex
        })
    }

    // 添加评论
    async _handleKeyPress (event) {
        if (event.key === 'Enter') {
            if (!this.state.replyContent) {
                notification['error']({
                    message: '请输入评论内容'
                })
                return
            }

            let response = await API.addDiscuss({topicId: this.props.topicId,replyContent: this.state.replyContent})
			notification['success']({
				message: response.message
            })
            

            // dispatch，添加评论
            this.props.addComments({
                replyContent: this.state.replyContent,
                replyName: this.props.userInfo.username,
                index: this.props.topicIndex
            })

            // 清空评论
            this.setState({
                replyContent: ''
            })
        }
    }

    render () {
        const CommentsList = () => {
            return (
                <ul className={`comments-list ${this.props.dialog && 'fill'}`}>
                    { 
                        this.props.discuss.map((item,index) => {
                            if (index!==3) {
                                return (
                                    <li className={`content ${index > 3 && 'hidden'} ${this.state.showMoreComments && 'no-hidden'}`} key={index}>
                                        <span className="username  u-f-black">{item.replyName}</span>
                                        <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                    </li>
                                )
                            }  else {
                                // 显示所有部分内容
                                return (
                                    <div key={index}>
                                        <li className={`content ${this.state.showMoreComments && 'no-hidden'}`} >
                                            <span className="username  u-f-black">{item.replyName}</span>
                                            <span className="replay-content u-f-black-blod">{item.replyContent}</span>
                                        </li>
                                        {
                                            this.props.discuss.length > 4?
                                             <li className={`content show-more u-f-lightblack2 ${this.state.showMoreComments && 'hidden'}`}>
                                                <span onClick={this.__showMoreComments.bind(this)}>显示所有</span>
                                            </li>
                                            : ''
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </ul>
            )
        }
        return (
            <div className={Style['comments-section']}>
                {
                    this.props.dialog?
                        <CommentsList />
                        :''
                }
                <div className="opetions">
                    <div className="fl-left">
                        <span className={`favorite  ${this.props.topicLike && 'active'}`} onClick={this.topicLike.bind(this)}></span>
                        <span className="comments" onClick={this.focus.bind(this)}></span>
                    </div>
                    <span className="fl-right collect"></span>
                </div>
                {
                    this.props.dotCounts?
                    <div className="dot-counts u-f-black">{this.props.dotCounts}次赞</div>
                    :
                    <div className="dot-counts u-f-black">抢先 点赞</div>
                }
                {/* 弹窗类型、与列表类型，评论列表位置不同 */}
                {
                    !this.props.dialog?
                        <CommentsList />
                        :''
                }
                <div className="release-time u-f-lightblack2">3天前</div>
                <div className="add-comments">
                    <input type="text" 
                        ref="textInput"
                        className="u-f-black"
                        placeholder="添加评论..." 
                        onChange={this.handelChange.bind(this)} 
                        value={this.state.replyContent} 
                        onKeyPress={this._handleKeyPress}/>
                    <span className="more"></span>
                </div>
            </div>
        )
    }
}

Comments.defaultProps = {
    dialog: false
}

export default Comments