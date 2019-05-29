import { Controller } from 'egg';
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'My First Project',
  keyFilename: 'config/My First Project-14b55a6edafc.json'
});

class HandlerController extends Controller {

    public async getQiniuToken () {
        const {ctx} = this;
        // const {filename} = await ctx.request.body;
        // console.log('filename', ctx.request.body);
        // const bucket = await storage.bucket('shopingram');
        //   const blob = await bucket.file(filename);

          const baseUrl = `https://storage.googleapis.com/shopingram/`;
        //  const bucket = storage.bucket('shopingram');
        //     ctx.returnBody(200, "파일저장 성공", {
        //       publicUrl: publicUrl,
        //       blob: blob
        //     });
        if(!storage){
          ctx.returnBody(400, "storage 가져오기 실패");
        }
        else{
            ctx.returnBody(200, "파일저장 성공", {
              baseUrl: baseUrl,
              storage: storage
            });
        }
    }
}

module.exports = HandlerController
