import React from 'react'
import PropTypes from "prop-types";
import * as qiniu from 'qiniu-js'
import Style from './index.scss'
import { notification } from 'antd';
import API from '@common/api.js'


class Upload extends React.Component{
    constructor(props) {
        super(props);

        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/uploadHandler'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => {
            console.log('Hello!');
        }
        


        this.success = file => console.log('uploaded', file);

        this.progress = file => console.log('progress', file);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile,
            uploadprogress: this.progress
        }

        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}

export default Upload

    // uploadFn = async () => {
    //     let {baseUrl, token} = response.data
    //     let files = this.refs.upload.files
    //     console.log("files : ", files);
    //     let response = await API.getToken(files);

    //     // 校验图片
    //     if (!this.imageVerify) return

    //     console.log("baseUrl : ", baseUrl);
    //     console.log("token : ", token);
    //     console.log("files : ", files);
        


    //     var putExtra = {
    //         fname: "",
    //         params: {},
    //         mimeType: ["image/png", "image/jpeg", "image/gif"]
    //     };

    //     var config = {
    //         region: qiniu.region.z0
    //     };
        
    //     // 文件名
    //     let key = new Date().getTime() + files[0].name;
    //     var observable = qiniu.upload(files[0], key, token, putExtra, config)

    //     var observer = {
    //         next: (res) => {
    //           // ...
    //         },
    //         error: (err) => {
    //             notification.error({
    //                 message: err
    //             })
    //         }, 
    //         complete: (res) => {
    //             let imgUrl = baseUrl + '/' + res.key
    //             this.props.successCb(imgUrl)
    //         }
    //     }

    //     var subscription = observable.subscribe(observer) // 上传开始

    // }

    // imageVerify = () => {
    //     let files = this.refs.upload.files
    //     let fileType = files[0].type;
    //     if (/^image/.test(fileType)) {
    //         // 读取结果在fileReader.result里面
    //        return true
    //     } else {
    //         notification.error({
    //             message: "请选择图片类型文件"
    //         })
    //         return false
    //     }
    // }

    // render () {
    //     return (
    //         <input 
    //             ref="upload" 
    //             className={Style['upload-image']} 
    //             type="file" 
    //             onChange={this.uploadFn} />
    //     )
    // }

