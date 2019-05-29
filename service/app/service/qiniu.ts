import { Service } from 'egg';
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'My First Project',
  keyFilename: 'My First Project-14b55a6edafc.json'
});


export default class qiniuService extends Service {
    
    public async getQiniuToken () {
        if (!storage) {
            this.ctx.throw(400, '请配置七牛鉴权参数')
        }

        let uploadToken = storage;

        return uploadToken
    }
}
