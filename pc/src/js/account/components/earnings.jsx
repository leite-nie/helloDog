import React from 'react';
import PageComponent  from '../../base/components/ListPage.jsx';
import WinAlert from '../../base/components/winAlert.jsx';
class earnings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            indexList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: 1, //当前页码
            pageSize:10, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
            type : 0,
        }
        this.tabFunc = this.tabFunc.bind(this);
    }
    componentDidMount(){
        let _this = this;
        setTimeout(()=>{
            _this.tabFunc();
        },500)
    }

    componentWillMount(){
        var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
        document.title = HD_lANG['earning-tit'][globalLang];
        setTimeout(function () {
            _this.pageClick(1);
        },500)

    }
    //点击翻页
    pageClick(pageNum){

        let _this = this;
        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }
        _this.getEarningList(pageNum)
    }
    //上一步
    goPrevClick(){
        var _this = this;
        let cur = this.state.current;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    }
    //下一步
    goNext(){
        var _this = this;
        let cur = _this.state.current;
        //WinAlert.show(cur+"==="+_this.state.totalPage)
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    }
    //跳转到指定页
    goSwitchChange(e){
        var _this= this;
        _this.setState({goValue : e.target.value})
        var value = e.target.value;
        //WinAlert.show(value+"==="+_this.state.totalPage)
        if(!/^[1-9]\d*$/.test(value)){
            WinAlert.show(HD_lANG['list16'][globalLang]);
        }else if(parseInt(value) > parseInt(_this.state.totalPage)){
            WinAlert.show(HD_lANG['list17'][globalLang]);
        }else{
            _this.pageClick(value);
        }
    }
    add0(m){
        return m<10?'0'+m:m
    }
    formatDate(needTime){
        var time = new Date(needTime);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    }
    getEarningList(page){ //type1代狗繁殖记录  2 0代狗中奖 3回报记录
        let _this = this;
        let _url = "";
        let type = _this.state.type;
        if(type == 0 || type == 1){
            _url = api_host + '/profit/myProfitList';
        }else if(type == 2){
            _url = api_host + '/lottery/rewardProfits';
        }else if(type == 3){
            _url = api_host + '/dog/recycleHistory';
        }else if(type == 4){
            _url = api_host + '/dog/walkDogList'
        } else {
            _url = api_host + '/user/myBonus'
        }
        $.ajax({
            url : _url,
            data :{
                walletAddress : window.defaultAccount,//实际应该为accountAddress '0x43570261abdf9d24f1eca5dab4340d969466e345'||
                toPage :page,
                profitType: type,
                pageSize : _this.state.pageSize
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {
                    console.log(data, '--=')
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    if(type == 0 || type == 1 || type == 4 ) {
                        let _list = "";
                        if(!data.returnObj.hasOwnProperty("allList")){
                             _list = null;
                        }else{
                             _list = data.returnObj.allList.length ==0 ? null : data.returnObj.allList;
                        }
                        _this.setState({
                            totalPage: totalPage,
                            totalNum: data.returnObj.total,
                            indexList : _list
                        })
                    }else {
                        _this.setState({
                            totalPage: totalPage,
                            totalNum: data.returnObj.total,
                            indexList : data.returnObj.list
                        })
                    }
                }else{
                    _this.setState({
                        totalNum: 0,
                    })
                }
            }
        })
    }

    tabFunc(event){
        /*let _val = event.currentTarget.getAttribute('data-type');
        let _this =this;
        if( _val == "1" ){
            event.currentTarget.className = "on";
            event.currentTarget.nextSibling.className = "";
            this.setState({
                type : 1
            })
            setTimeout(()=>{
                _this.pageClick(1)
            },100)

        }else if( _val == "2" ){
            event.currentTarget.className = "on";
            event.currentTarget.previousSibling.className = "";
            this.setState({
                type : 2
            })
            setTimeout(()=>{
                _this.pageClick(1)
            },100)
        }*/
        let _this = this;
        $(".earning-tab span").on("click",function () {
            var _index = $(".earning-tab span").index(this);
            $(".earning-tab span").eq(_index).removeClass("on").addClass("on").siblings().removeClass("on");
            if( _index == 0 ){
                _this.setState({
                    type : 0,
                    totalNum :0
                })
                setTimeout(()=>{
                    _this.pageClick(1)
                },100)
            }else if( _index == 1 ){
                _this.setState({
                    type : 2,
                    totalNum :0
                })
                setTimeout(()=>{
                    _this.pageClick(1)
                },100)
            }else if( _index == 2 ){
                _this.setState({
                    type : 3,
                    totalNum :0
                })
                setTimeout(()=>{
                    _this.pageClick(1)
                },100)
            }else if( _index == 3 ){
                _this.setState({
                    type : 1,
                    totalNum :0
                })
                setTimeout(()=>{
                    _this.pageClick(1)
                },100)
            }else if( _index == 4 ){
                _this.setState({
                    type : 4,
                    totalNum :0
                })
                setTimeout(()=>{
                    _this.pageClick(1)
                },100)
            } else {
                _this.setState({
                    type : 9,
                    totalNum :0
                })
                setTimeout(()=>{
                    _this.pageClick(1)
                },100)
            }
        })
    }
    createMarkup(str,data) {
        if(!data.length) {
            return {__html: str};
        }else if(data.length == 1){
            str = str.replace('placeholder1',data[0]);
            return {__html: str};
        }else if(data.length == 2){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]);
            return {__html: str};
        }else if(data.length == 3){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]);
            return {__html: str};
        }else if(data.length == 4){
            str = str.replace('placeholder1',data[0]).replace(/placeholder2/g,data[1]).replace('placeholder3',data[2]).replace('placeholder4',data[3]);
            return {__html: str};
        }
    }
    render(){
        let _this = this;

        return(
            <div>
                <div className="transaction  clearfix">

                    {/*<div className="t-left">
                        <a href="javascript:void(0)">交易记录</a>
                        <a href="javascript:void(0)">安全中心</a>
                    </div>*/}

                    <div className="t-right">
                        <div className="txt">{HD_lANG['earning0'][globalLang]}</div>
                        <div className="earning-tab">
                            <span className="on"  >{HD_lANG['earning1-1'][globalLang]}</span>
                            <span >{HD_lANG['earning2'][globalLang]}</span>
                            <span >{HD_lANG['earning3'][globalLang]}</span>
                            <span >{HD_lANG['earning7'][globalLang]}</span>
                            <span >{HD_lANG['earning8'][globalLang]}</span>
                            <span >{HD_lANG['earning1-2'][globalLang]}</span>
                        </div>
                        {this.state.totalNum ===0  ? HD_lANG['alert0'][globalLang] :
                            <ul className="clearfix">
                            
                                {this.state.indexList.map(function(name,i) {
                                    if(_this.state.type == 0 ) {
                                        return <li key={i}>
                                                <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning4'][globalLang],[name.genZeroId,name.matronId,name.profitGen0])}></p>
                                            </li>;
                                    }
                                    if(_this.state.type == 1 ) {
                                        return <li key={i}>
                                                <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning11'][globalLang], [name.profitGen0])}></p>
                                            </li>;
                                    }
                                    if(_this.state.type == 2 ) {
                                        return <li key={i}>
                                            <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning5'][globalLang],[name.zeroDogName,name.dogName,name.lotteryLevel,name.zeroAmount])}></p>
                                            </li>;
                                    }
                                    if(_this.state.type == 3 ) {
                                        return <li key={i}>
                                                <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning6'][globalLang],[name.dogName,name.matronId,name.recycleAmmount])}>{/*您的狗狗 {name.dogName} 被系统回收，您获得了{name.recycleAmmount}ETH收益，已转入了您的钱包！*/}</p>
                                            </li>;
                                    }
                                    if(_this.state.type == 4 ) {
                                        return <li key={i}>
                                                <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning6-1'][globalLang],[_this.formatDate(name.createTime),name.dogNum,name.redoundMoney])}></p>
                                            </li>;
                                    }
                                    return <li key={i}>
                                                <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning12'][globalLang],[name.dogNum,name.bonusMoney])}></p>
                                        </li>;
                                })}
                            </ul>
                        }
                    </div>
                    {this.state.totalNum ===0 ? "" :
                    <PageComponent total={this.state.totalNum}
                                   current={this.state.current}
                                   totalPage={this.state.totalPage}
                                   goValue={this.state.goValue}
                                   pageClick={this.pageClick.bind(this)}
                                   goPrev={this.goPrevClick.bind(this)}
                                   goNext={this.goNext.bind(this)}
                                   switchChange={this.goSwitchChange.bind(this)}/>
                    }
                </div>

            </div>
        )
    }
}

export default earnings;