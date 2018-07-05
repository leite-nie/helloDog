import React from 'react';


import img from '../../../images/img0327/index-2.png';
import {switchCoolDownIndex, getBgColorClass, switchAwards} from '../../base/common.js';
import PageComponent  from '../../base/components/ListPage.jsx';
import Loading from '../../base/components/Loading.jsx';
import WinAlert  from '../../base/components/winAlert.jsx';

//banner
class ListBanner extends React.Component{
    render(){
        return(
            <div className="list-banner"></div>
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
            totalData:[],
            current: 1, //当前页码
            pageSize:10, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数
            totalNum2:0,
            listType : ( sessionStorage.getItem('tabList') || 1 ),
            orderBy : 0,
            voteArr:[],
            currentBlockNum : 0,
            imgHost : "",
            stateText : ""
        }
        this.addVote = this.addVote.bind(this);
        this.sortFunc = this.sortFunc.bind(this);
        this.sortFunc2 = this.sortFunc2.bind(this);
        this.sortFunc3 = this.sortFunc3.bind(this);
        this.sortFunc4 = this.sortFunc4.bind(this);
        this.sortFunc5 = this.sortFunc5.bind(this);
        this.sortFunc6 = this.sortFunc6.bind(this);

    }
    sortFunc(){
        this.setState({
            orderBy : 0
        })
        setTimeout(()=>{

            this.pageClick(1)
        },100)

    }
    sortFunc2(){
        this.setState({
            orderBy : 1
        })
        setTimeout(()=>{
            this.pageClick(1)
        },500)
    }
    sortFunc3(){
        this.setState({
            orderBy : 2
        })
        setTimeout(()=>{
            this.pageClick(1)
        },500)
    }
    sortFunc4(){
        this.setState({
            orderBy : 3
        })
        setTimeout(()=>{
            this.pageClick(1)
        },500)
    }
    sortFunc5(){
        this.setState({
            orderBy : 4
        })
        setTimeout(()=>{
            this.pageClick(1)
        },500)
    }
    sortFunc6(){
        this.setState({
            orderBy : 5
        })
        setTimeout(()=>{
            this.pageClick(1)
        },500)
    }

    showLoading ($parentObj){
        $("#ajaxLoad").show();
    }
    hideLoadiing($id){
        $("#ajaxLoad").hide();
    }
    getCoolTime(number){
        var mss = number*20*1000; //区块数*20s 得到s数
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        var _str = ""
        if(mss<=0 ){
            _str = "";
        }else{
            if(days == 0){
                _str = hours +HD_lANG['list12'][globalLang] + minutes + HD_lANG['list13'][globalLang];
            }
            if(days != 0 && hours == 0){
                _str = days + HD_lANG['list11'][globalLang];
            }
            if(days != 0 && hours != 0){
                _str = days + HD_lANG['list11'][globalLang]+hours + HD_lANG['list13'][globalLang];
            }
            if(days == 0&&hours == 0){
                if(minutes <= 0){
                    _str = "";
                }else{
                    _str = minutes + HD_lANG['list13'][globalLang];
                }
            }
        }

        return _str
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
    addVote(event){
        if(!window.defaultAccount){
            WinAlert.show(HD_lANG['list15'][globalLang]);

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
    getDogList(type,order,page){

        var _this = this;
        $.ajax({
            url : api_host + "/dog/dogList",
            data :{
                listType : type,//0-所有 1-官方 2-出售
                orderBy :order, //排序规则 0-IDid排序 1-根据id倒序2-根据价格 3根据
                toPage : page,
                pageSize : 10
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code = "0000") {
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    let _indexArray = [];
                    let _genesis0Obj = data.returnObj.Genesis[0];
                    let _genesis0Obj2 = data.returnObj.Genesis[1];
                    _genesis0Obj.variation = 0;
                    _genesis0Obj2.variation = 0;
                    _genesis0Obj.duration = 10000;
                    _genesis0Obj2.duration = 10000;
                    _indexArray.push(_genesis0Obj);
                    _indexArray.push(_genesis0Obj2);
                    if(  !data.returnObj.allList ){

                    }else{
                        data.returnObj.allList.map(function(n,i){
                            _indexArray.push(n)
                        })
                    }
                    //_indexArray.push(data.returnObj.allList);
                    _this.setState({
                        totalData : data.returnObj.allList,
                        totalNum : data.returnObj.total,
                        totalPage:totalPage,
                        totalNum2: (Number(data.returnObj.total)+2),
                        indexList:_indexArray,
                        voteArr : data.returnObj.likeNumber,
                        currentBlockNum : data.returnObj.currentBlockNum,
                        imgHost : data.returnObj.imgHost
                    });
                    _this.hideLoadiing()

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
    componentDidMount(){
        var _this = this;
        let _listType = "";
        if( !sessionStorage.getItem("tabList") ){
            sessionStorage.setItem("tabList",1);
        }
        if( !sessionStorage.getItem("pageNum") ){
            sessionStorage.setItem("pageNum",1);
        }
        let tabListVal = sessionStorage.getItem("tabList") || 1;

        if(tabListVal == 2 ){
            $(".l-box span").eq(0).removeClass("select").addClass("select").siblings().removeClass("select");
        }else if(tabListVal == 0){
            $(".l-box span").eq(2).removeClass("select").addClass("select").siblings().removeClass("select");
        }else{
            $(".l-box span").eq(1).removeClass("select").addClass("select").siblings().removeClass("select");

        }

        $(".l-box span").on("click",function (e) {
            var _index =$(".l-box span").index(this);
            $(this).removeClass("select").addClass("select").siblings().removeClass("select");
            if(_index == 2 ){
                _listType = 0;
            }else if(_index == 0){
                _listType = 2;
            }else{
                _listType = 1;

            }
            sessionStorage.setItem("tabList",_listType);
            _this.setState({
                listType : _listType
            });
            _this.pageClick(1)
        })


    }
    componentWillMount(){
        var _this = this;
        let _pageNum =(  sessionStorage.getItem('pageNum') || 1 );
        _this.pageClick(_pageNum);
        document.title = HD_lANG['header5'][globalLang];
    }
    //点击翻页
    pageClick(pageNum){
        let _this = this;
        _this.showLoading();
        if(pageNum != _this.state.current){
            _this.state.current = pageNum;
            sessionStorage.setItem("pageNum",pageNum);
        }
        if(pageNum != 1){

        }
        _this.getDogList(_this.state.listType,_this.state.orderBy,pageNum);
    }
    //上一步
    goPrevClick(){
        var _this = this;
        let cur = this.state.current;
        if(cur > 1){
            _this.pageClick(cur - 1);
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
        var _this = this;
        return(
            <div>
                <div className="filtrate">
                    <div className="filt-top clearfix">
                        <div className="l-box">
                            <span >{HD_lANG['list0'][globalLang]}</span>
                            <span  className="select">{HD_lANG['list1'][globalLang]}</span>
                            <span >{HD_lANG['list2'][globalLang]}</span>
                        </div>

                    </div>
                    <div className="filt-md clearfix">
                        <div className="total">{HD_lANG['list3'][globalLang]}<span>{this.state.totalNum2}</span></div>
                        <div className="r-box">
                            <span>{HD_lANG['list4'][globalLang]}</span>
                            <span className="sort-type">
                                ID
                                <em className="top" title={HD_lANG['list9'][globalLang]} onClick={this.sortFunc}></em>
                                <em className="bottom" title={HD_lANG['list10'][globalLang]} onClick={this.sortFunc2}></em>
                            </span>
                            <span className="sort-type">
                                {HD_lANG['list5'][globalLang]}
                                <em className="top"  title={HD_lANG['list9'][globalLang]} onClick={this.sortFunc3}></em>
                                <em className="bottom" title={HD_lANG['list10'][globalLang]} onClick={this.sortFunc4}></em>
                            </span>
                            <span className="sort-type">
                                {HD_lANG['list5-1'][globalLang]}
                                <em className="top"  title={HD_lANG['list9'][globalLang]} onClick={this.sortFunc5}></em>
                                <em className="bottom" title={HD_lANG['list10'][globalLang]} onClick={this.sortFunc6}></em>
                            </span>
                        </div>
                    </div>

                </div>
                <div className="transaction-text">
                    {HD_lANG['list18'][globalLang]}
                </div>
                <div className="list-box" >
                    {this.state.indexList === 0 ? HD_lANG['alert0'][globalLang] :
                    <ul className="clearfix">
                        {this.state.indexList.map(function(name,i) {
                            return <li key={i} className={i==0?"first": i==1?"second": ""}>
                                <div className={"img-bg img-bg"+getBgColorClass(name.genesStr,7)}>
                                    
                                    {name.lotteryLevel > 0 && <div className={'beyond beyond-bd-' +  name.lotteryLevel}>{switchAwards(name.lotteryLevel - 1)}</div>}
                                    <a href={"/list/detail.html?id="+name.dogId}><img src={name.variation == 0 ? _this.state.imgHost + name.genesStr +".png" :"http://www.haloudog.com/img/otherdog/variation.png" } alt=""/></a>
                                    <span className="icon"></span>
                                    {!_this.getStateText(name.status,_this.state.currentBlockNum,name.endBolckNumber) ? "" :
                                    <p className="txt">
                                        <em className={"type-"+name.status}>&nbsp;</em>
                                        <em>
                                            {_this.getStateText(name.status,_this.state.currentBlockNum,name.endBolckNumber)}
                                            {name.status == 2 || name.status == 1 ?
                                                name.dogId == 0 || name.dogId == 1 ? name.startPrice :
                                                _this.getDogCurrentPrice(name.startPrice,name.endPrice,name.eventBlockNumber,name.duration)
                                            : ""}
                                        </em>
                                    </p>
                                    }
                                    <p className="status">
                                        <span>{name.variation == 0 ? name.dogId == 0 || name.dogId == 1 ? HD_lANG['list20'][globalLang] :switchCoolDownIndex(name.coolDownIndex) :HD_lANG['list19'][globalLang]}</span>
                                        {/*<em></em>*/}
                                    </p>
                                </div>
                                <div className="dog-attr">
                                    <p><span>{name.dogId == 0 || name.dogId == 1 ? HD_lANG['list20'][globalLang] : name.dogName}</span>{name.dogId == 0 || name.dogId == 1 ? "":<em>·</em>}{name.dogId == 0 || name.dogId == 1 ? "":<span>id{name.dogId}</span>} { name.dogId == 0 || name.dogId == 1 ? "" :<em>·</em>} <span className={name.generation == 0 ? "isGen0" : ""}>{name.generation}{ name.dogId == 0 || name.dogId == 1 ? "" :HD_lANG['list7'][globalLang]}</span>{ name.dogId == 0 || name.dogId == 1 ? "" :<em>·</em>}{switchCoolDownIndex(name.coolDownIndex)}</p>
                                    <p  onClick={_this.addVote} data-id={name.dogId}>{_this.state.voteArr[name.dogId]}</p>
                                </div>
                            </li>
                        })}
                    </ul>}
                    {!this.state.totalNum  ? "" :
                        <PageComponent total={this.state.totalNum}
                                       current={this.state.current}
                                       totalPage={this.state.totalPage}
                                       goValue={this.state.goValue}
                                       pageClick={this.pageClick.bind(this)}
                                       goPrev={this.goPrevClick.bind(this)}
                                       goNext={this.goNext.bind(this)}
                                       switchChange={this.goSwitchChange.bind(this)} />
                    }
                        < Loading />

                </div>
            </div>
        )
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