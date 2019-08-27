let fs=require('fs'),
    path=require('path');
//存储的是当前模块执行所在的绝对路径(!==__dirname)
let dirname=path.resolve();
//mkdir&&rmdir
['mkdir','unlink','rmdir','readdir','readFile','copyFile'].forEach(item=>{
    exports[item]=function(pathname,copypath=''){
        pathname=path.resolve(dirname,pathname);

        copypath=path.resolve(dirname,copypath);
        return new Promise((resolve,reject)=>{

            let arg=[];
            arg=[(err,result)=>{
                if(err){

                    reject(err)
                    return;
                }

                resolve(result||'');
            }];

            //item==='readFile'?arg.unshift('utf8'):null;
            if(item==='readFile'){
                arg.unshift('utf8')
                console.log('是阅读文件')
            }else{
                '不是阅读文件'
            }
            item==='copyFile'?arg.unshift(copypath):null;

            fs[item](pathname,...arg)
        })
    }
});

//writeFile$$appendFile
['writeFile','appendFile'].forEach(item=>{
    exports[item]=function(pathname,content){
        pathname=path.resolve(dirname,pathname);
        if(typeof content !=='string'){
            //写入的内容规定必须是字符串才可以
            content=JSON.stringify(content);
        }
        return new Promise((resolve,reject)=>{
            let arg=[content,'utf8',(err,result)=>{
                if(err){
                    reject(err)
                    return;
                }
                resolve(result||'');
            }];
            fs[item](pathname,...arg)
        })
    }
});




//exports.readFile=function(pathName){
//    var pathname=path.resolve(dirname,pathname);
//    return new Promise((resolve,reject)=>{
//        fs.readFile(pathname,'utf8',(err,result)=>{
//            if(err){
//                reject(err)
//                return;
//            }
//            resolve(result);
//        })
//    })
//}


//mkdir readdir rmdir readFile appendFile copyFile
//mkdir 2各参数 无res
//readdir 3  有res
//readFile 3  有res
//writeFile 4 无res
//appendFile
//copyFile
let readFile=function(pathName){
    //一般都会把传递的path-name进行处理:以当前项目的根目录为依托，我们只需要传递相对于根目录的相对目录地址，程序自动生成一个绝对目录地址
    var _pathName=path.resolve(path.resolve(),pathName);
    //__dirname:当前模块所在的绝对路径（和模块中的方法在哪执行是没有关系的）
    //path.resolve(); 当前模块中方法在哪个模块中执行的，那么对应的绝对路径是执行模块的绝对路径

    return new Promise((resolve,reject)=>{
        fs.readFile(_pathName,'UTF-8',(err,result)=>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
module.exports.readFile=readFile;