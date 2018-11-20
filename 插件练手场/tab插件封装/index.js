~function(){
    //用构造函数方式完成当前类的封装
    //第一个字母大写代表他是一个类
    function ChangeTab(tabBox,options){
        //技巧：为了保证这些值在类的任何方法中都可以调用使用，我们可以把信息值存放在当前实例上（this）
        //只要保证每个方法中的this都是当前类的实例，我们就可以
        var _default={
            initIndex:0,
            eventType:'click'
        }

        for (var key in options) {
            if(options.hasOwnProperty(key)){
                _default[key]=options[key];
            }
        }
        this.initIndex=this.prevIndex=_default.initIndex;
        this.eventType=_default.eventType;
        this.tabBox=tabBox;
        //=>开始实现选项卡的功能
        //ChangeTab.prototype.init.call(this);
        return this.init();
    }
    ChangeTab.prototype={
        constructor:ChangeTab,
        init:function(){
            //获取当前页卡区域中的元素
            this.tab=utils.children(this.tabBox,'ul')[0],
                this.tabList=utils.children(this.tab,'li'),
                this.conList=utils.children(this.tabBox,'div');
            //实现选页卡切换
            this.clear();
            this.change();

        },
        change:function(){
            var _this=this;
            for (var i = 0; i < _this.tabList.length; i++) {
                _this.tabList[i].myIndex=i;
                _this.tabList[i]['on'+_this.eventType]=function(){
                    _this.tabList[_this.prevIndex].className='';
                    _this.conList[_this.prevIndex].className='con'
                    this.className='select';
                    _this.conList[this.myIndex].className='con select';
                    _this.prevIndex=this.myIndex;
                }
            }
        },
        clear:function(){
            //清空所有的样式类
            for (var i = 0; i < this.tabList.length; i++) {
                this.tabList[i].className='';
                this.conList[i].className='con';
            }
            //初始化默认的选中页卡
            this.tabList[this.initIndex].className='select';
            this.conList[this.initIndex].className='con select';
        }
    };
    window.CT=ChangeTab;
}()

var tabBox=document.getElementsByClassName('tabBox');
new CT(tabBox[0])
new CT(tabBox[1],{
    eventType:'mouseover'
})
new CT(tabBox[2],{
    initIndex:2,
    eventType:'mouseover'
})

//构造函数
//实例（this）
//封装插件 保持独立性 私有属性在this上 公有方法在prototype上


//插件只实现: js   isScroll swiper
//组件实现:UI组件 bootstrap,  样式结构/js ()
//插件组件实现具体功能
//类库:Jquery   DOM库 工具包 utils

//框架
