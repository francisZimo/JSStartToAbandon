let http=require('http');
let url=require('url');
let path=require('path');
let fs=require('fs');
let {readFile}=require('./utils/fsPromise.js')
let mime=require('mime');

//=>公共方法
let responseResult=function(res,returnVal){
    res.writeHead(200,{
        'Content-type':'application/json;charset=utf-8'
    });
    res.end(JSON.stringify(returnVal))
}
let readUser=function(){
    return  readFile('./json/user.JSON').then(result=>{
        return JSON.parse(result);
    })
}
let readVote=function readVote(){
    return  readFile('./json/vote.JSON').then(result=>{
        return JSON.parse(result);
    })
}


//创建web服务
let handle=function handle(req,res){
    //客户端请求资源文件（path-name）,服务器端都是到static文件中进行读取，也是根据客户端请求的路径名称读取的，服务器端基于fs读取文件中的内容的时候，直接加上'./static'即可
    let {method,headers: requestHeaders}=req,
        {pathname,query}=url.parse(req.url,true);

    let pathREG=/\.([a-z0-9]+)$/i;
    //静态资源文件处理
    console.log(pathname);
    if(pathREG.test(pathname)){
        console.log(`a`);
        readFile(`./static${pathname}`).then(result=>{
            //读取成功，根据请求资源文件的类型，设置响应内容的MIME
            //读取成功
            let suffix=pathREG.exec(pathname)[1];
            res.writeHead(200,{
                'content-type':`${mime.getType(suffix)};charset=utf-8`
            });
            res.end(result);
        }).catch(err=>{
            console.log(err)
            //读取失败：最有可能由于文件不存在而读取失败(也就是客户端请求的地址是错误的，我们应该响应的内容是404)
            res.writeHead(404,{
                'Content-type':'test/plain;charset=utf-8'
            });
            res.end('not found')
        })
        return;
    }
    //服务器端接口处理

    //get-user:根据传递的用户ID获取指定用户的信息


    if(pathname=='/getUser'&&method==='GET'){
        console.log(`b`);
        //=>问号传递的信息都在query中存储着
        let {userId=0}=query;
        let returnVal={code:1,message:'no match any data',data:null};
        readUser().then(result=>{
            let data=result.find(item=>parseFloat(item.id)===parseFloat(userId))
            if(data){
                returnVal={code:0,message:'ok',data:data};
            }
            //throw  new Error('') //目的没有数据的时候，让其执行catch中的操作，这样我们只需让then方法中有异常信息即可
        }).finally( ()=>{
            responseResult(res,returnVal)
        })
        return ;
    }



    //请求的都不是以上api接口，直接404接口
    res.writeHead(404);
    res.end('');

}

let server=http.createServer(handle);
let port=8086;
server.listen(port,()=>{
    //当服务创建成功，并且端口号已经监听成功后，触发的毁掉函数
    console.log(`server is success , listen on ${port}!`);
});


















/*
  错误分析
  listen EACCES 0.0.0.0:80
  这种错误都是因为端口号被占用了，我们需要重新修改端口号
  当服务创建成功，命令行中会一直存在


  客户端如何向创建的服务器发送请求
  对应好协议。域名，端口等借口，在浏览器中或者ajax中发送请求即可
  http://localhost:8686.. 服务在电脑上，localhost本机域名，也就是本机客户端浏览器，访问机器的服务端程序
  http://IP:8686..  IP做域名访问，如果是内网IP，相通局域网下的用户可以访问这个服务，如果是外网IP，所有能联网的基本都可以访问这个服务
 */
