//需要把config方法放到当前项目的根目录当中
let path=require('path');
let rootPath=path.resolve();
module.exports={
    //需要编译的less
    entry:[
        `${rootPath}/less/index.less`,
        `${rootPath}/less/detail.less`,
    ],
    output:[
        `${rootPath}/css/index.min.css`,
        `${rootPath}/css/detail.min.css`
    ]
}