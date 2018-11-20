var  utils=(function(){
    var isCompatible='getElementByClassName' in window;
    var isSupportJson='JSON' in window;
    function toArray(classAry){
        var ary=[];
        if(isCompatible){
            ary=Array.prototype.slice.call(classAry);
        }else{
            for (var i = 0; i < classAry.length; i++) {
                ary[ary.length] = classAry[i];
            }
        }
        //try{
        //    ary=Array.prototype.slice.call(classAry); //不管成不成功都得处理这个方法
        //}catch(e){
        //    for (var i = 0; i < classAry.length; i++) {
        //        ary[ary.length] = classAry[i];
        //
        //    }
        //}

        return ary;
    }
    function toJSON(value){
        return isSupportJson?JSON.parse(value):eval('('+value+')')
    }
    //getCss:得到当前元素样式
    function getCss(curEle,attr) {
        var value = null;
        if ('getComputedStyle' in window) {
            value = window.getComputedStyle(curEle, null)[attr]
        } else {
            //IE6-8下处理透明度
            if (attr === 'opacity') {
                value = curEle.currentStyle['filter'];
                //=>把获得的结果转换为和opacity一样的结果
                var reg = /alpha:\(opacity=(.+)\)$/;
                reg.test(value) ? value = reg.exec(value)[1] / 100 : value = 1
            } else {
                value = curEle.currentStyle[attr];
            }
        }
//=>首先把获取的结果转换为数字，看是否为NaN，不是NaN就说明可以去除单位，我们把转换的结果返回，如果是NaN，说明当前获取的结果并不是数字+单位的，此时我们把之前获取的值返回即可
        var reg1 = /-?\d+(\.\d+)?(px|pt|rem|em)?$/i
        if (reg1.test(value)) {
            return value
        } else if (isNaN(parseFloat(value))) {
            return value
        } else {
            return parseFloat(value)
        }
    }
    //setCss:给当前元素设置css
    var setCss=function(curEle,attr,value){
        if(attr=='opacity'){
            curEle['style']['opacity']=value;
            curEle['style']['filter']='alpha(opacity='+value*100+')'
            return;
        }
        console.log(value)
        if(!isNaN(value)&&!/(zIndex|zoom|lineHeight)/i.test(attr)){
            value+='px'
        }
        curEle['style'][attr]=value;
    }
    //setGroupCss:options 组传递
    function setGroupCss(curEle,options){
        if(Object.prototype.toString.call(options)!=='[object Object]'){
            return;
        }
        for(var attr in options){
            if(options.hasOwnProperty(attr)){
                setCss(curEle,attr,options[attr])
            }
        }
    }
    //css:集成设置样式，获取样式，批量设置样式于一身的功能
    //css(box,'padding') //获取样式
    //css(box,'padding','20') //设置样式
    //css(box,{  //批量设置样式
    //    width:200,
    //    height:300,
    //    backgroundColor:'#fff'
    //})
    var css=function(){
        var len=arguments.length;
        if(len>=3){
            //设置样式
            //setCss(arguments[0],arguments[1],arguments[2]);
            setCss.apply(this,arguments);
            return;
        }
        if(len===2&&Object.prototype.toString.call(arguments[1])==='[object Object]'){
            setGroupCss.apply(this,arguments);
            return;
        }
        return getCss.apply(this,arguments)
    }

    //offset：获取上偏移  左偏移
    var offsetLT=function(curEle){
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        var p=curEle.offsetParent;
        while(p.tagName!=='BODY'){
            l+= p.clientLeft;
            t+= p.clientTop;
            if(!/MSIE 8/i.test(navigator.userAgent)){
                l+= p.offsetLeft;
                t+= p.offsetTop;
            }
            p= p.offsetParent;
        }
        return {top:t,left:l}
    }
    //获取盒子模型属性 传一个参数获取，传两个参数设置
    var winBox=function(attr,value){
        if(typeof value!=='undefined'){
            document.documentElement[attr]=value;
            document.body[attr]=value;
            return;
        }
        return document.documentElement[attr]||document.body[attr]
    }
    //winBox('clientHeight')
    //winBox('clientHeight',0)
    //根据类名获取元素
    function getEleByClass(strClass,context){
        context=context||document;

        if('getElementsByClassName' in document){
            return utils.toArray(context.getElementsByClassName(strClass)) //返回标准统一数组格式
        }
        //思路：获取指定上下文中所有标签，遍历获取这些标签，把所有class中包含传递进来的样式雷的元素，都保存起来即可
        var result=[],
            nodeList=context.getElementsByTagName('*');
        //不仅要去掉首尾空格，还要把传递的样式类名拆分成一个数组（数组中包含传递的每一个样式类名）
        strClass=strClass.replace(/^\s+|\s+$/g,'').split(/ +/);
        for (var i = 0; i < nodeList.length; i++) {
            var item = nodeList[i];
            var itemClass=item.className;
            var flag=true; //假设猜想  传递的样式类名在item中都存在
//            验证假设的值是真还是假：循环传递的所有样式类型名和当前标签的class-name比较 只要有一个不再标签中，flag=false
            for (var k = 0; k < strClass.length; k++) {
                var reg=new RegExp('（^| +)'+strClass[k]+'( +|$)');
                if(!reg.test(itemClass)){
                    flag=false;
                    break;
                }
            }
            flag?result.push(item):null
            //当前项的class：item.className
            //传递进来的样式类：strClass
            //indexOf缺陷（box1  box100）includes
            //验证接下来要验证item.className字符串中是否报班传过来的strClass样式类
            //正则可行
            // box2=>只要包含box2这个字符就可以了 /\bbox2\b/ 表示是一个完整单词 -的两边也是边界 box2-2就不行了
            // 'box1 box2 box3'
            //（^| +)box2( +|$) 中间是box2 完整单词，左右两边是空格或者开始结束
        }
        return result;
    }
    //获取子元素
    function children(curEle,tagName){
        var result=[];
        var childList=curEle.childNodes;
        for (var i = 0; i < childList.length; i++) {
            var item=childList[i];
            if( item.nodeType===1){
                if(typeof tagName!=='undefined'){
                    if(item.tagName.toLowerCase()===tagName.toLowerCase()){
                        result.push(item)
                    }
                    continue;
                }
                result.push(item)
            }
        }
        //在获取的所有元素节点中进行二次过滤
//        if(typeof tagName!=='undefined'){
//            for (var k = 0; k < result.length; k++) {
//                if(result[k].tagName.toLowerCase()!==tagName.toLowerCase()){
//                    result.splice(k,1)
//                    k--;
//                }
//
//            }
//        }
        return result;
    }
    return{
        css:css,
        offsetLT:offsetLT,
        winBox:winBox,
        toJSON:toJSON,
        toArray:toArray,
        getEleByClass:getEleByClass,
        children:children
    }

})()
