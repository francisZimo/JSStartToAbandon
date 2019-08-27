var A_result=require('./A.js').sum;
var avg=function(...arg){
    //var result=A_result(arguments).sum/A_result(arguments).length;
    //return result;
    return A_result(...arg)/arg.length
}
module.exports.avg=avg;