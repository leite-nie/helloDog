import React from 'react';
import PageComponent  from '../../base/components/ListPage.jsx';

import WinAlert from '../../base/components/winAlert.jsx';
class notice extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            indexList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: 1, //当前页码
            pageSize:12, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
            term : 0,
            lotteryResult:''
        }
        this.getTermVal = this.getTermVal.bind(this);
        this.goSearch = this.goSearch.bind(this);
    }
    goSearch(){
        this.pageClick(1)
    }
    getTermVal(event){
        let val = event.currentTarget.value;
        this.setState({term:val})
    }
    componentWillMount(){
        var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
        document.title = HD_lANG['history-title'][globalLang];

        setTimeout(function () {
            _this.pageClick(1);
        },500)

    }
    getList(page,Term){
        let _this = this;
        $.ajax({
            url : api_host + "/lottery/allRewardHistory",
            data :{
                lotteryTerm :Term,
                toPage :page,
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
                        indexList : data.returnObj.list,

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
    //点击翻页
    pageClick(pageNum){

        let _this = this;



        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }
        _this.getList(pageNum,_this.state.term)

        //console.log(_this.state.indexList)
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
    render(){
        let _this = this;
        return(
           <div className="history-wrap">
               <div className="top">
                   <h2>{HD_lANG['history-title'][globalLang]}</h2>
                   <div className="search">

                       <input type="number" onChange={this.getTermVal} placeholder={HD_lANG['history0'][globalLang]} />
                       <span onClick={this.goSearch}>{HD_lANG['history1'][globalLang]}</span>
                   </div>

               </div>
               <div className="table-box">
                   {this.state.totalNum === 0 ? HD_lANG['alert0'][globalLang] :
                       <table>
                           <tbody>
                           <tr>
                               <td>{HD_lANG['history2'][globalLang]}</td>
                               <td>{HD_lANG['history3'][globalLang]}</td>
                               <td>{HD_lANG['history4'][globalLang]}</td>
                               <td>{HD_lANG['history5'][globalLang]}</td>
                               <td>{HD_lANG['history6'][globalLang]}</td>
                               <td>{HD_lANG['history7'][globalLang]}</td>
                           </tr>
                           {this.state.indexList.map(function (name, i) {
                               var lotteryResult2 = JSON.parse(name.lotteryResult);
                               return <tr key={i}>
                                   <td>{name.lotteryTerm}</td>
                                   <td>{_this.formatDate(name.createTime)}</td>
                                   <td>
                                       <span title={lotteryResult2["1"]}><img src={api_img_host+"img/gem/index-1/"+ Number(lotteryResult2["1"]).toString(16)+".png"} alt=""/></span>
                                       <span title={lotteryResult2["2"]}><img src={api_img_host+"img/gem/index-2/"+ Number(lotteryResult2["2"]).toString(16)+".png"} alt=""/></span>
                                       <span title={lotteryResult2["3"]}><img src={api_img_host+"img/gem/index-3/"+ Number(lotteryResult2["3"]).toString(16)+".png"} alt=""/></span>
                                       <span title={lotteryResult2["4"]}><img src={api_img_host+"img/gem/index-4/"+ Number(lotteryResult2["4"]).toString(16)+".png"} alt=""/></span>
                                       <span title={lotteryResult2["5"]}><img src={api_img_host+"img/gem/index-5/"+ Number(lotteryResult2["5"]).toString(16)+".png"} alt=""/></span>
                                       <span title={lotteryResult2["6"]}><img src={api_img_host+"img/gem/index-6/"+ Number(lotteryResult2["6"]).toString(16)+".png"} alt=""/></span>
                                       <span>+</span>

                                       <span title={lotteryResult2["7"]}><img src={api_img_host+"img/gem/index-7/"+ Number(lotteryResult2["7"]).toString(16)+".png"} alt=""/></span>
                                   </td>
                                   <td>{name.lotteryLevel}</td>
                                   <td>{name.lotteryAmount.toString().substring(0,6)}ETH</td>
                                   <td>{name.nickName}</td>
                               </tr>
                           })}

                           </tbody>
                       </table>
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
        )
    }
}

export default notice;