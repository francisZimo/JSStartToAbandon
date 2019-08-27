let url=require('url');
console.log(url.parse('http://www.baidu.com?from=qq&sex=man&age=20#hashNumber',true));
//=> 第二个参数默认false，如果是true，query为对象
//Url {
//    protocol: 'http:', //协议
//        slashes: true, //是否有双斜线
//        auth: null,
//        host: 'www.baidu.com', //域名+端口
//        port: null,
//        hostname: 'www.baidu.com', //域名
//        hash: null, //哈希值
//        search: '?from=qq&sex=man&age=20', //问号传递的参数[string]
//        query: 'from=qq&sex=man&age=20', //问号传递的参数[string],不包含问号
//        pathname: '/', //请求资源的路径和名称
//        path: '/?from=qq&sex=man&age=20',
//        href: 'http://www.baidu.com/?from=qq&sex=man&age=20' } //原始解析的URL和地址

//Url {
//    protocol: 'http:',
//        slashes: true,
//        auth: null,
//        host: 'www.baidu.com',
//        port: null,
//        hostname: 'www.baidu.com',
//        hash: '#hashNumber',
//        search: '?from=qq&sex=man&age=20',
//        query: { from: 'qq', sex: 'man', age: '20' },
//    pathname: '/',
//        path: '/?from=qq&sex=man&age=20',
//        href: 'http://www.baidu.com/?from=qq&sex=man&age=20#hashNumber' }


