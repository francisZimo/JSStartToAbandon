//合并压缩css
let {readdir,readFile,writeFile} = require('../../utils/fsPromise.js')
//1.先把所有的css文件读取出来
readdir('./').then(result=>{
    return result.filter(item=>/\.css/i.test(item))
}).then(result=> {
        let arg = [];
        //['1.css','2.css']
        result.forEach(item=> {
            arg.push(readFile(`./${item}`)) //分别调取read-file方法，读取捕获到的css文件，想宿主中一次读取各个文件的promise实例
            //arg=[promise1,promise2...]

        })
        return Promise.all(arg);
     })
        .then(result=>{
            console.log(result)
        //result:一个数组，存放所有文件的内容
        result=result.join('');
        return result.replace(/( |\n|\r)/g,'');
    }).then(result=>{
        return writeFile('.//build.min.css',result);
    }).then(()=>{
        console.log('创建成功')
    })


