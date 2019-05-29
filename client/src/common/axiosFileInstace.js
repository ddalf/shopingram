import axios from 'axios';
import baseDomain from './config.js'
import { notification } from 'antd';

// import { Toast } from 'antd-mobile';

const instanceFile = axios.create({
    xsrfCookieName: 'xsrf-token',
    baseURL: baseDomain,
    headers: {'Content-Type': 'multipart/form-data'}
});


instanceFile.interceptors.response.use(function (response) {
    if (response.data.success) {
        return Promise.resolve(response.data);
    } else {
        notification['error']({
            message: response.data.message
        })
        return  Promise.reject({
            message: response.data.message
        })
    }

}, function (error) {
    try {
        notification['error']({
            message: error.response.data.message || '시스템 예외'
        })
        if (error.response.status === 401) {
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
    } catch (err) {
        notification['error']({
            message: '시스템 예외，나중에 다시 시도하십시오！'
        })
    }
    return Promise.reject({
        messageCode: 'sysError'
    });
});

export default instanceFile;