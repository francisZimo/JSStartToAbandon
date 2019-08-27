var sum=function(...arg){
    //var sumValue=0;
    //var result={};
    //var _arguments=Array.prototype.slice.call(value);
    //for (var i = 0; i < _arguments.length; i++) {
    //    var _value = _arguments[i];
    //    sumValue+=_value;
    //}
    //result.sum=sumValue;
    //result.length=_arguments .length;
    //return result;
    var result=0;
    for (var i = 0; i < arg.length; i++) {
        var value = arg[i];
        result+=value;
    }
    return result;
}
module.exports.sum=sum;
