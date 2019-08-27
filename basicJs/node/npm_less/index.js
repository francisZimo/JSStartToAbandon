let path=require('path');
let lessc=require('less')
let rootPath=path.resolve()
let {readFile,writeFile}=require(`./utils/fsPromise`)
let {entry,output}=require(`./less.config.js`);
//分别读取entry对应的less代码

module.exports={
    render(){
        entry.forEach((item,index)=>{
            readFile(item).then(result=>{
                lessc.render(result,{compress:true},(err,result)=>{
                    if(err) return;
                    let {css}=result;
                    writeFile(output[index],css)
                    console.log('congratulation！Wish you good luck every day！sincerely · francis！')
                });
            })
        })
    }
}