//[fs内置模块]
let fs=require('fs');
//1.fs.mkdir/fs.mkdirSync:创建文件夹，有Sync的同步创建,反之没有异步想要实现无阻塞I/O操作，我们一般都是用异步操作完成要处理的事情
//fs.mkdir('./less',(err)=>{
//    if(err){
//        console.log(err);
//        return;
//    }
//    console.log('ok')
//});
//console.log('1');

//2.fs.readdir/fs.readdirSync:读取文件目录中的内容
//let result=fs.readdirSync('./'); //=>同步
//fs.readdir('./',(err,result)=>{
//    if(err){
//        console.log(err);
//        return;
//    }
//    console.log(result); //返回结果是一个数组
//})

//3.fs.rmdir:删除文件夹
//fs.rmdir('./less',err=>{ //删除文件夹必须保证文件夹是空的
//    if(err){
//        console.log(err)
//        return;
//    }
//    console.log('ok');
//})
//4.fs.readFile: 读取文件中的内容
//fs.readFile('./less/1.scss','utf8',(err,result)=>{
//    //不是这utf-8编码格式，读取出来的是buffer格式的数据，设置后续读到的字符串格式的数据
//    if(err){
//        console.log(err);
//        return ;
//    }
//    console.log(result);
//})
//5.fs.writeFile:向文件中写入内容(覆盖写入，写入的新内容会替换原有的内容)
//fs.writeFile('./less/1.scss','输入数组',(err)=>{
//    //不是这utf-8编码格式，读取出来的是buffer格式的数据，设置后续读到的字符串格式的数据
//    if(err){
//        console.log(err);
//        return ;
//    }
//console.log('ok')
//})
//6.fs.appendFile:追加写入新内容，原有的内容还在
//fs.appendFile('./less/1.scss','haha',(err)=>{
//    //不是这utf-8编码格式，读取出来的是buffer格式的数据，设置后续读到的字符串格式的数据
//    if(err){
//        console.log(err);
//        return ;
//    }
//    console.log('ok')
//})
//7.fs.copyFile:拷贝文件到新的位置
fs.copyFile('./fs.js','./less/test.js',(err)=>{
    //不是这utf-8编码格式，读取出来的是buffer格式的数据，设置后续读到的字符串格式的数据
    if(err){
        console.log(err);
        return ;
    }
    console.log('ok')
})
//8.fs.unlink: 删除文件
//fs.unlink('./less/1.scss',(err)=>{
//    //不是这utf-8编码格式，读取出来的是buffer格式的数据，设置后续读到的字符串格式的数据
//    if(err){
//        console.log(err);
//        return ;
//    }
//    console.log('ok')
//})
