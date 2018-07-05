import React from 'react';
import PageComponent  from '../../base/components/ListPage.jsx';
import WinAlert from '../../base/components/winAlert.jsx';



class List extends React.Component {
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
            status : 0
        }
        this.formatDate = this.formatDate.bind(this);
    }
    getList(page,pageSize){
        let _this = this;
        $.ajax({
            url : api_host + "/transfer/myTransferList",
            data :{
                walletAddress : window.defaultAccount || "0XFDASF" ,//实际应该为accountAddress
                toPage :page,
                pageSize : pageSize
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    _this.setState({
                        totalPage : totalPage,
                        totalNum : data.returnObj.total,
                        indexList : data.returnObj.allList
                    })
                }else {
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
        document.title = HD_lANG['translist-tit'][globalLang];
        setTimeout(function () {
            _this.pageClick(1);
        },1000)

    }
    //点击翻页
    pageClick(pageNum){

        let _this = this;
        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }

        _this.getList(pageNum,_this.state.pageSize)
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
        if(data.length == 2){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]);
            return {__html: str};
        }else if(data.length == 3){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]);
            return {__html: str};
        }else if(data.length == 4){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]).replace('placeholder4',data[3]);
            return {__html: str};
        }
    }
    returnHtml(name){
        let _this = this;
        if(name.state == 2){
            if(name.fromAdr == window.defaultAccount){
                return <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['translist2'][globalLang],[name.dogName,name.toAdr.substring(0,16)+"..."])}>
                   {/*您 赠送Dog:<em>{name.dogName || name.dogId}</em>给{name.toAdr.substring(0,16)+"..."}*/}
                </p>
            }else{
                return <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['translist3'][globalLang],[name.fromAdr.substring(0,16)+"...",name.dogName])}>
                    {/*{name.fromAdr.substring(0,16)+"..."} 赠送Dog:<em>{name.dogName || name.dogId}</em>给您*/}
                </p>
            }

        }else if(name.state == 1){
            if(name.fromAdr == window.defaultAccount){
                return <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['translist4'][globalLang],[name.toAdr.substring(0,16)+"...",name.dogName,name.price])}>
                    {/*{name.toAdr.substring(0,16)+"..."} 租借您的Dog:<em>{name.dogName || name.dogId}</em>，您获得了<em>{name.price}ETH</em>*/}
                </p>
            }else {
                return <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['translist5'][globalLang],[name.fromAdr.substring(0,16)+"...",name.dogName,name.price])}>
                    {/*您 租借{name.fromAdr.substring(0,16)+"..."} 的Dog:<em>{name.dogName || name.dogId}</em>，您消耗了<em>{name.price}ETH</em>*/}
                </p>

            }

        }else if(name.state == 0 ){//买卖
            if(name.fromAdr == window.defaultAccount){
                return <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['translist6'][globalLang],[name.toAdr.substring(0,16)+"...",name.dogName,name.price])}>
                    {/*{name.toAdr.substring(0,16)+"..."} 购买您的Dog:<em>{name.dogName || name.dogId}</em>，您获得了<em>{name.price}ETH</em>*/}
                </p>
            }else {
                return <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['translist7'][globalLang],[name.fromAdr.substring(0,16)+"...",name.dogName,name.price])}>
                    {/*您 购买{name.fromAdr.substring(0,16)+"..."} 的Dog:<em>{name.dogName || name.dogId}</em>，您消耗了<em>{name.price}ETH</em>*/}
                </p>

            }
        }
    }
    render(){
        let _this = this;
        return(
            <div>
                <div className="transaction clearfix">

                    <div className="t-right">
                        <div className="txt">{HD_lANG['translist0'][globalLang]}</div>
                        {this.state.totalNum === 0 ? HD_lANG['alert0'][globalLang] :
                        <ul className="clearfix">

                            {this.state.indexList.map(function(name,i) {
                                return <li key={i}>
                                    <span></span>
                                    <div>
                                        <h2>{_this.formatDate(name.createTime)}</h2>

                                        {_this.returnHtml(name)}

                                    </div>
                                    <a href={"https://ropsten.etherscan.io/tx/"+name.eventHash} target="_blank">{HD_lANG['translist1'][globalLang]}</a>
                                </li>;
                            })}
                        </ul>}
                    </div>
                    { this.state.totalNum ==0 ? " " :
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

export default List;