import React from 'react';
import PageComponent  from '../../base/components/ListPage.jsx';
import WinAlert from '../../base/components/winAlert.jsx';
class redeem extends React.Component {
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
        }
    }
    getList(page){
        let _this = this;
        $.ajax({
            url : api_host + "/lottery/rewardHistory",
            data :{
                walletAddress : defaultAccount ,//实际应该为accountAddress
                page :page,
                pageSize : _this.state.pageSize
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    _this.setState({
                        totalPage : totalPage,
                        totalNum : data.returnObj.total,
                        indexList : data.returnObj.list
                    })
                }else{
                    _this.setState({

                        totalNum : 0,

                    })
                }
            }
        })
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

    componentWillMount(){
        var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
        document.title = HD_lANG['redeem-tit'][globalLang];
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

        _this.getList(pageNum)

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
        }
    }
    render(){
        let _this = this;
        return(
            <div>
                <div className="transaction clearfix">

                    <div className="t-right">
                        <div className="txt">{HD_lANG['redeem0'][globalLang]}</div>
                        {this.state.totalNum === 0 ? HD_lANG['alert0'][globalLang] :
                        <ul className="clearfix">

                            {this.state.indexList.map(function(name,i) {
                                return <li key={i}>
                                    <span className="rede-ico"></span>
                                    <div>
                                        <h2>{name.createTime/*{_this.formatDate(name.createTime)}*/}</h2>
                                        <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['redeem1'][globalLang],[name.dogName,name.lotteryLevel,name.lotteryAmount])}>{/*<em>{name.dogName}</em> 获得 <em>{name.lotteryLevel}</em>等奖，获得 <em>{name.lotteryLevel}ETH</em>*/}</p>
                                    </div>


                                </li>;
                            })}
                        </ul>
                        }
                    </div>
                    {this.state.totalNum === 0 ? "" :
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

export default redeem;