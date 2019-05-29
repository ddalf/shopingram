import { Application, Router } from 'egg';


export default (app: Application) => {
  const { controller } = app;
  const { user, topic, handle, friend, login } = controller;
  
  const apiV2Router: Router = app.router.namespace('/api/v2');
    // login 
    apiV2Router.post('/login/register', login.register);
    apiV2Router.post('/login', login.loginIn);
    apiV2Router.get('/login/signout', login.signOut);


    // user
    apiV2Router.get('/user/info', user.userInfo); 
    apiV2Router.get('/user/personal', user.userPersonalInfo);
    apiV2Router.post('/user/update', user.updateUserInfo);


    // handle
    apiV2Router.post('/handle/upload/get-token', handle.getQiniuToken);


    // friend
    apiV2Router.post('/friend/follow', friend.follow); 
    apiV2Router.get('/friend/list', friend.notFollowList);


    // topic
    apiV2Router.post('/topic/addImage', topic.addTopicImage); 
    apiV2Router.get('/topic/search', topic.searchTopic); 
    apiV2Router.post('/topic/add', topic.addTopic); 
    apiV2Router.get('/topic/detail', topic.topicDetail);
    apiV2Router.post('/topic/discuss/add', topic.addDiscuss);
    apiV2Router.put('/topic/like', topic.putLikeTopic); 
    apiV2Router.get('/topic/friend/list', topic.friendsTopicList); 
}
