import instance from './axiosInstace.js';
import instanceFile from './axiosFileInstace'

exports.register = (data) => {
    return instance.post('/login/register', data);
 };

exports.login = (data) => {
    return instance.post('/login', data);
};
exports.signout = (data) => {
    return instance.get('/login/signout', data);
};
  




exports.getUserInfo = (data) => {
    return instance.get('/user/info', data);
}

exports.getPersonalInfo = (data) => {
    return instance.get('/user/personal', data);
}

exports.updatePersonalInfo = (data) => {
    return instance.post('/user/update', data);
}



exports.addTopic = (data) => {
    return instance.post('/topic/add', data);
}

exports.addTopicImage = (data) => {
    return instanceFile.post('/topic/addImage?_csrf={{ ctx.csrf | safe }}', data);
}


exports.topicLike = (data) => {
    return instance.put('/topic/like', data);
}

exports.frientTopicList = (data) => {
    return instance.get('/topic/friend/list', data);
}

exports.addDiscuss = (data) => {
    return instance.post('/topic/discuss/add', data);
}
exports.searchTopic = (data) => {
    return instance.get('/topic/search', data);
}




exports.friendList = (data) => {
    return instance.get('/friend/list', data);
}

exports.followUser = (data) => {
    return instance.post('/friend/follow', data);
}


exports.getToken = (data) => {
    return instance.post('/handle/upload/get-token', data);
}
