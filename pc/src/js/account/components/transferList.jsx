import React from 'react';
import PageComponent  from '../../base/components/ListPage.jsx';
import WinAlert from '../../base/components/winAlert.jsx';

class earnings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageSize : 10,
            curType : 1,

            data: [],

            totalNum : ''
        }

    }
    componentWillMount (){

    }
    componentDidMount (){
        let _this = this;
        setTimeout(function () {
            _this.pageClick(1);
        },500)

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
    //点击翻页
    pageClick(pageNum){

        let _this = this;
        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }
        _this.getOgcList(pageNum)
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
    // 获取个人信息
    /*getMasterInfo() {
        if(!defaultAccount){
            return false;
            console.log("error:defaultAccount undefined");
        }
        var _this = this;
        $.ajax({
            url : api_host + "/user/userInfo",
            data :{
                walletAddress : defaultAccount,
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000' ){
                    _this.setState({
                        redoundMoney : data.returnObj.redoundMoney,
                    })
                }else{
                    WinAlert.show(HD_lANG[data.code][globalLang]);
                }
            }
        })
    }*/
    getOgcList(page){
        let _this = this;
        let _url = "/user/ogcTransferLog";
        var fromAddress,toAddress;
        if(_this.state.curType == 1){
            fromAddress = window.defaultAccount;
            toAddress = "";
        }else{
            toAddress = window.defaultAccount;
            fromAddress = "";
        }
        $.ajax({
            url : api_host + _url,
            data :{
                fromAddress : fromAddress,
                toAddress : toAddress,
                toPage :page,
                pageSize : _this.state.pageSize
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000' ){
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    let _list = data.returnObj.list.length ==0 ? null : data.returnObj.list;
                    _this.setState({
                        totalPage: totalPage,
                        totalNum: data.returnObj.total,
                        data : _this.state.data.concat(_list),
                    })
                }else{
                    _this.setState({
                        totalNum: 0,
                    })
                }
            }
        })


    }

    //下拉刷新结束
    tabMenuFunc(type,page){
        let _this = this;
        this.setState({
            curType: type,
            data : []
        })
        setTimeout(()=>{
            _this.getOgcList(page)
        },100)
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
    render(){
        let _this = this;

        return(
            <div>
                <div className="transaction  clearfix">
                    <div className="t-right">
                        <div className="earning-tab">
                            <span className={this.state.curType == 1 ? 'on' : ''}  onClick={this.tabMenuFunc.bind(this, 1,1)}>{HD_lANG['transfer8'][globalLang]}</span>
                            <span className={this.state.curType == 2 ? 'on' : ''}  onClick={this.tabMenuFunc.bind(this, 2,1)}>{HD_lANG['transfer7'][globalLang]}</span>

                        </div>
                        {this.state.totalNum ===0  ? HD_lANG['alert0'][globalLang] :
                            <ul className="clearfix">
                                {this.state.data.map(function(name,i) {
                                    if(_this.state.curType == 1 ) {
                                        return <li key={i}>
                                            <em className="t-1"
                                                dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['transfer10'][globalLang], [name.amount, name.toAccountAddress])}></em>
                                            <em className="t-4">{_this.formatDate(name.createTime)}</em>
                                        </li>
                                    }else {
                                        return <li key={i}>
                                            <em className="t-1"
                                                dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['transfer11'][globalLang], [name.fromAccountAddress,name.amount])}></em>
                                            <em className="t-4">{_this.formatDate(name.createTime)}</em>
                                        </li>
                                    }

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