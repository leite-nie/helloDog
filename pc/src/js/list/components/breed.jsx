import React from 'react';

import winAlert from '../../base/components/winAlert.jsx';

import {switchCoolDownIndex, switchAwards} from '../../base/common.js';



import img from '../../../images/img0327/index-2.png';
import PageComponent  from '../../base/components/ListPage.jsx';
import Loading from '../../base/components/Loading.jsx';
//banner
class ListBanner extends React.Component{
    render(){
        return(
            <div className="list-banner list-banner1"></div>
        )
    }
}




//list
class  ListBox extends React.Component{
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
            voteArr:[],
            imgHost:"",
            currentBlockNum : 0
        }
        this.addVote = this.addVote.bind(this);
    }
    addVote(event){
        if(!window.defaultAccount){
            WinAlert.show("请先登录钱包");
            return false;
        }
        var _val = event.target.innerText;
        _val = Number(_val);
        var _obj = $(event.target);
        var _id = _obj.attr("data-id");
        $.ajax({
            url : api_host + "/dog/thumbsUp",
            data :{
                dogId : _id,//0-所有 1-官方 2-出售
                walletAddress :defaultAccount
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code = "0000") {
                    _obj.text(data.returnObj.thumbsUp)
                }
            }
        })

        //ajax updata vote
    }
    getDogList(page){

        var _this = this;
        $.ajax({
            url : api_host + "/dog/dogList",
            data :{
                listType : 3,//0-所有 1-官方 2-出售 3繁殖
                orderBy :3,//排序规则 0-IDid排序 1-根据id倒序2-根据价格 3根据
                toPage : page,
                pageSize : 12
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    _this.setState({
                        totalData : data.returnObj.allList || null,
                        totalNum : data.returnObj.total,
                        totalPage:totalPage,
                        indexList:data.returnObj.allList|| null,
                        voteArr : data.returnObj.likeNumber,
                        currentBlockNum : data.returnObj.currentBlockNum,
                        imgHost : data.returnObj.imgHost
                    });
                    _this.hideLoadiing()

                }else{
                    _this.setState({
                        totalNum : 0,
                    });
                }
            }
        })
    }
    getDogCurrentPrice(startPrc,endPrc,eventBloNumber,duration){
        startPrc = parseFloat(startPrc)  // 开始价格
        endPrc = parseFloat(endPrc)      // 结束价格
        let currentBlockNum = Number(this.state.currentBlockNum)
        let currentPrice = (endPrc - startPrc)* ( ((currentBlockNum - eventBloNumber) * 15)/duration >= 1 ? 1 : ((currentBlockNum - eventBloNumber) * 15)/duration ) + startPrc;
        currentPrice = currentPrice.toString().substring(0,5)
        return currentPrice;
    }
    componentWillMount(){
        document.title = HD_lANG['breed-title'][globalLang];
        var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
        _this.pageClick(1);





    }
    //点击翻页
    pageClick(pageNum){

        let _this = this;
        if(pageNum != _this.state.current){
            _this.state.current = pageNum
        }
        _this.state.indexList=[];//清空之前的数据
        _this.getDogList(pageNum);

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
    getStateText(state,currentBlock,endBlock){
        let differBlock = Number(endBlock) - Number(currentBlock);
        let text = "";
        if(state == 0){ //正常 or 冷却
            if(differBlock > 0 ){
                text = HD_lANG['list14-0'][globalLang]+this.getCoolTime(differBlock);
            }else{ //nothing

            }
        }else if(state == 1){ //出售
            text = HD_lANG['list14-1'][globalLang]+" Ξ ";
        }else if(state == 2){ //繁殖
            text = HD_lANG['list14-2'][globalLang]+" Ξ ";
        }else if(state == 3){// 怀孕中
            text = HD_lANG['list14-3'][globalLang]+this.getCoolTime(differBlock);
        }else{//系统回收
            text = HD_lANG['list14-4'][globalLang]
        }
        //this.setState({stateText:text})
        return text;
    }
    showLoading ($parentObj){
        $("#ajaxLoad").show();
    }
    hideLoadiing($id){
        $("#ajaxLoad").hide();
    }
    getBgColorClass(genStr){
        let gen = genStr.charAt(7);
        let number = 0;
        if(gen == "a"){
            number = 10;
        }else if(gen == "b"){
            number = 11;
        }else if(gen == "c"){
            number = 12;
        }else {
            number =gen;
        }
        return ("img-bg"+number)
    }
    render(){
        let _this = this;
        if(this.state.totalNum === 0 ){
            return(
                <div>

                    <div className="list-box">{HD_lANG['alert0'][globalLang]}</div>
                </div>
            )

        }else{
        return(
            <div>
                <div className="transaction-text transaction-text1">{HD_lANG['list18'][globalLang]}</div>
                <div className="list-box">
                    <ul className="clearfix">
                        
                        {this.state.indexList.map(function(name,i) {
                            return <li key={i}>
                                <div className={"img-bg "+_this.getBgColorClass(name.genesStr)}>
                                   
                                    {name.lotteryLevel > 0 && <div className={'beyond beyond-bd-' +  name.lotteryLevel}>{switchAwards(name.lotteryLevel - 1)}</div>}
                                    <a href={"/list/detail.html?id="+name.dogId}><img src={name.variation == 0 ? _this.state.imgHost + name.genesStr +".png" :_this.state.imgHost + name.genesStr +".png" } alt=""/></a>


                                    {!_this.getStateText(name.status,_this.state.currentBlockNum,name.endBolckNumber) ? "" :
                                        <p className="txt">
                                            <em className={"type-"+name.status}>&nbsp;</em>
                                            <em>
                                                {_this.getStateText(name.status,_this.state.currentBlockNum,name.endBolckNumber)}
                                                {_this.getDogCurrentPrice(name.startPrice,name.endPrice,name.eventBlockNumber,name.duration)}

                                            </em>
                                        </p>
                                    }
                                </div>
                                <div className="dog-attr">
                                    <p><span>{name.dogName}</span><em>·</em><span className={name.generation == 0 ? "isGen0" : ""}>{name.generation}{ name.dogId == 0 || name.dogId == 1 ? "" :HD_lANG['list7'][globalLang]}</span><em>·</em>{switchCoolDownIndex(name.coolDownIndex)}</p>
                                    <p onClick={_this.addVote} data-id={name.dogId}>{_this.state.voteArr[name.dogId]}</p>
                                </div>
                            </li>
                        })}

                    </ul>

                    <PageComponent total={this.state.totalNum}
                                   current={this.state.current}
                                   totalPage={this.state.totalPage}
                                   goValue={this.state.goValue}
                                   pageClick={this.pageClick.bind(this)}
                                   goPrev={this.goPrevClick.bind(this)}
                                   goNext={this.goNext.bind(this)}
                                   switchChange={this.goSwitchChange.bind(this)}/>
                    <Loading />
                </div>
            </div>
        )
        }
    }
}



class ListMain extends React.Component{
    render(){
        return(
            <div>
                <ListBanner />

                <ListBox />
            </div>
        )
    }
}












export default ListMain;