import React from 'react';

import $ from 'n-zepto';
import common from '../../common.js';
import winAlert from '../../winAlert.js';
import ReactPullLoad,{ STATS } from 'react-pullload';




class WalletBegin extends React.Component {
    constructor(props){
        super(props);


        this.state = {
            pageSize : 10,
            curType : 1,
            curType2 : 4,
            isClose : true,
            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,
            totalNum : '',
            defaultRate : 1.5,
            winCount : 0,
            lockIsHidden : true,
            userOGC : 0,
            betOnAmount : 0,
            teamId : 0,
            matchId : 0,
            betResult : 0
        }
        this.handleAction = this.handleAction.bind(this)
    }
    tabMenuFunc(type,page){
        let _this = this;


        this.setState({
            curType: type,
            index : 1,
            hasMore : true,
            action: STATS.init,
            data : []
        })
        setTimeout(()=>{
            if(type == 1){
                _this.getGuessGroupList(page)
            }else if(type == 2){
                _this.getGuessChampionList(page)
            }else if(type == 3){
                _this.getBetList(1)
            }

        },100)

    }
    tabMenuFunc2(type,page){
        let _this = this;
        this.setState({
            curType2: type,
            index : 1,
            hasMore : true,
            action: STATS.init,
            data : []
        })
        setTimeout(()=>{
            _this.getBetList(1)
        },100)

    }
    calculateWinOGC(event){
        let _this = this;
        let val = event.currentTarget.value;
        val = Number(val);
        if(val > 10000000 || val < 1){
            return false
        }
        let count = (this.state.defaultRate * val);
        count = Math.round(count*100)/100;

        setTimeout(()=>{
           _this.setState({
               winCount : count,
               betOnAmount : val
           })
        },50)

    }
    hideBet(){

        this.setState({
            lockIsHidden : true,
            winCount : 0
        })
        document.getElementById("input").value = "";
    }
    hideBet2(event){
        event.stopPropagation();
    }
    betFunc(type,rate,isClose,matchId){
        if(isClose){
            //已封盘
            return false;
        }
        if( type !=4 ){  //小组赛
            this.setState({
                defaultRate: rate,
                lockIsHidden : false,
                matchId : matchId,
                betResult : type
            });
        }else{ //冠军
            this.setState({
                defaultRate: rate,
                lockIsHidden : false,
                teamId : matchId,
            });
        }
    }
    getGuessGroupList(page){ //获取小组赛竞猜列表
        let _this = this;
        $http('/quiz/worldCup', {
            type : 2,
            toPage: page,
            pageSize: this.state.pageSize
        }).then(function(data) {
            if(data.code == "0000") {
                //let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                let totalPage = 1;
                let _list = data.returnObj.length == 0 ? null : data.returnObj;
                _this.setState({
                    totalNum: data.returnObj.length == 0 ? 0 :data.returnObj.total ,
                    data : _this.state.data.concat(_list),
                    action: STATS.reset,
                    index: _this.state.index + 1,
                    totalPage: totalPage,
                })
            }
        })
    }
    getGuessChampionList(page){ //获取冠军32球队竞猜列表
        let _this = this;
        $http('/quiz/worldCup', {
            type : 1,
            toPage: page,
            pageSize: this.state.pageSize
        }).then(function(data) {
            if(data.code == "0000") {
                let totalPage = 1;
                let _list = data.returnObj.length == 0 ? null : data.returnObj;
                _this.setState({
                    totalNum: data.returnObj.total,
                    data : _this.state.data.concat(_list),
                    action: STATS.reset,
                    index: _this.state.index + 1,
                    totalPage: totalPage,
                })
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
    //下拉刷新
    handleAction(action) {
        let _this = this;
        console.info(action, _this.state.action,action === _this.state.action);
        //new action must do not equel to old action
        if(action === _this.state.action){
            return false
        }
        if(action === STATS.refreshing){//刷新
            _this.handRefreshing();
        } else if(action === STATS.loading){//加载更多
            _this.handLoadMore();
        } else{
            //DO NOT modify below code
            _this.setState({
                action: action
            })
        }
    }

    handRefreshing() {
        let _this = this;
        if(STATS.refreshing === this.state.action){
            return false
        }
        setTimeout(()=>{
            //refreshing complete
            if(_this.state.curType == 1){
                _this.getGuessGroupList(1)
            }else if(_this.state.curType == 2){
                _this.getGuessChampionList(1)
            }else if(_this.state.curType == 3 && _this.state.curType2 == 4){
                _this.getBetList(1);
            }else if(_this.state.curType == 3 && _this.state.curType2 == 5){
                _this.getBetList(1);
            }
            _this.setState({
                data : [],
                hasMore: true,
                action: STATS.refreshed,
                index : 1
            })
        }, 1500)
        this.setState({
            action: STATS.refreshing
        })
    }

    handLoadMore  ()  {
        let _this = this;
        if(STATS.loading === this.state.action){
            return false
        }
        //无更多内容则不执行后面逻辑
        if(!this.state.hasMore){
            return;
        }
        setTimeout(()=>{
            if(_this.state.index > _this.state.totalPage){
                _this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else{
                if(_this.state.curType == 1){
                    _this.getGuessGroupList(_this.state.index);
                }else if(_this.state.curType == 2){
                    _this.getGuessChampionList(_this.state.index);
                }else if(_this.state.curType == 3 && _this.state.curType2 == 4){
                    _this.getBetList(_this.state.index);
                }else if(_this.state.curType == 3 && _this.state.curType2 == 5){
                    _this.getBetList(_this.state.index);
                }
            }
        }, 1500)

        this.setState({
            action: STATS.loading
        })
    }
    //下拉刷新结束

    betIngFunc(){
        //弹窗押注 XX OGC
        let _this = this;
        let _amount = this.state.betOnAmount;
        let _thisTime = new Date().getTime();
        if(_amount < 1){
            winAlert.show(HD_lANG['cup8'][globalLang]);
            return false;
        }
        if( _amount > Number(this.state.userOGC)){
            winAlert.show(HD_lANG['cup9'][globalLang]);
            return false;
        }
        let type = 1;
        if(!window.messagesKey){
            winAlert.show(HD_lANG['cup10'][globalLang]);
            return false;
        }
        let signatureJson = web3.eth.accounts.sign("helloDog"+_thisTime,messagesKey);
        signatureJson = JSON.stringify(signatureJson);
        signatureJson = encodeURI(signatureJson)
        if(this.state.curType == 1){
            type = 2;
            $http('/quiz/worldCup/bet', {
                type : type,
                walletAddress : defaultAccount,
                betAmount : _amount,
                matchId : _this.state.matchId,
                betResult : _this.state.betResult,
                signatureJson :signatureJson
            }).then(function(data) {
                if(data.code == "0000") {
                   winAlert.show(HD_lANG['cup7'][globalLang]);
                }else{
                    winAlert.show(HD_lANG[data.code][globalLang]);
                }
                _this.setState({
                    betOnAmount: 0
                })
                document.getElementById("input").value = "";
                _this.getMasterInfo();
                _this.setState({
                    lockIsHidden : true
                })
            })
        }else if(this.state.curType == 2){
            type = 1;
            $http('/quiz/worldCup/bet', {
                type : type,
                walletAddress : defaultAccount,
                betAmount : _amount,
                signatureJson :signatureJson,
                teamId : _this.state.teamId,
            }).then(function(data) {
                if(data.code == "0000") {
                    winAlert.show(HD_lANG['cup7'][globalLang]);
                }else{
                    winAlert.show(HD_lANG[data.code][globalLang]);
                }
                _this.setState({
                    betOnAmount: 0
                })
                document.getElementById("input").value = "";
                _this.getMasterInfo();
                _this.setState({
                    lockIsHidden : true
                })
            })
        }
    }
    // 获取个人信息
    getMasterInfo() {
        if(!defaultAccount){
            console.log("defaultAccount 不存在");
            return false;
        }
        var _this = this;
        $http('/user/userInfo', {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' ){
                _this.setState({
                    userOGC: data.returnObj.redoundMoney,

                })
            }
        })
    }
    getBetList(page){
        let _this = this;
        let type = this.state.curType2 == 4 ? 2 :1;
        //type 1 冠军记录，2小组赛记录
        $http('/quiz/worldCup/betLog', {
            type : type,
            walletAddress : defaultAccount,
            toPage : page,
            pageSize : _this.state.pageSize
        }).then(function(data) {
            if(data.code == "0000") {
                let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                let _list = data.returnObj.list.length == 0 ? null : data.returnObj.list;
                _this.setState({
                    totalNum: data.returnObj.total,
                    data : _this.state.data.concat(_list),
                    action: STATS.reset,
                    index: _this.state.index + 1,
                    totalPage: totalPage,
                })
            }else{
                console.log(HD_lANG[data.code][globalLang]);
            }
        })
    }
    componentDidMount(){
        this.getGuessGroupList(1);
        this.getMasterInfo();
    }

    componentWillMount(){

    }
    render(){
        let _this = this;
        let _thisTime =  new Date().getTime();
        return(
            <div className="cup-wrap">
                <div className="tab">
                    <ul className="clearfix">
                        <li className={this.state.curType == 1 ? 'active' : ''}  onClick={this.tabMenuFunc.bind(this, 1,1)}><span>{HD_lANG['cup1'][globalLang]}</span></li>
                        <li className={this.state.curType == 2 ? 'active' : ''}  onClick={this.tabMenuFunc.bind(this, 2,1)}><span>{HD_lANG['cup2'][globalLang]}</span></li>
                        <li className={this.state.curType == 3 ? 'active' : ''}  onClick={this.tabMenuFunc.bind(this, 3,1)}><span>{HD_lANG['cup3'][globalLang]}</span></li>
                    </ul>

                </div>
                <div className="tab-box">
                    <div className={this.state.curType == 1 ? 'group-box' : 'group-box-hidden'}>
                        {this.state.totalNum != 0 ? (
                            <ReactPullLoad
                                downEnough={150}
                                action={this.state.action}
                                handleAction={this.handleAction}
                                hasMore={this.state.hasMore}
                                style={{paddingTop: 0}}
                                distanceBottom={200}>
                        <ul className="list">
                            {this.state.data.map(function(name,i) {
                                return <li key={i}>
                                    <div className="top">
                                        日期：{_this.formatDate(name.beginTime)}
                                    </div>
                                    <div className="middle">
                                        <div className="l">
                                            <img src={"http://manage.haloudog.com/mobile/img/worldcup/"+name.hostTeamEn+".png"} alt="" />
                                            <p>{name.hostTeamCn}<em>(主)</em></p>
                                        </div>
                                        <div className="c"></div>
                                        <div className="r">
                                            <img src={"http://manage.haloudog.com/mobile/img/worldcup/"+name.visitingTeamEn+".png"} alt="" />
                                            <p>{name.visitingTeamCn}<em>(客)</em></p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <span className={(_thisTime > name.betCloseTime) ? "isclose" : "w"} onClick={_this.betFunc.bind(_this,1,name.hostWinOdds,(_thisTime > name.betCloseTime),name.id)}>主胜 {name.hostWinOdds}</span>
                                        <span className={(_thisTime > name.betCloseTime)  ? "isclose" : "t"} onClick={_this.betFunc.bind(_this,2,name.drawOdds,(_thisTime > name.betCloseTime),name.id)}>平局 {name.drawOdds}</span>
                                        <span className={(_thisTime > name.betCloseTime)  ? "isclose" : "l"} onClick={_this.betFunc.bind(_this,3,name.hostLoseOdds,(_thisTime > name.betCloseTime),name.id)}>客胜 {name.hostLoseOdds}</span>
                                    </div>
                                </li>;
                            })}


                        </ul>
                            </ReactPullLoad>
                        ) : (
                            <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                        )}
                    </div>
                    <div className={this.state.curType == 2 ? 'champion-box' : 'champion-box-hidden'}>
                        {this.state.totalNum != 0 ?
                            <ul className="clearfix">
                                {this.state.data.map(function(name,i) {

                                    return <li key={i}>
                                        <div className="top">
                                            <img src={"http://manage.haloudog.com/mobile/img/worldcup/"+name.teamEn+".png"} alt="" />
                                            <p>{name.termCn}</p>
                                        </div>
                                        <div className="bottom">
                                            <span>赔率：{name.odds}</span>
                                            <span onClick={_this.betFunc.bind(_this,4,name.odds,(_thisTime > name.betCloseTime),name.id)}>押注</span>
                                        </div>
                                    </li>
                                })}

                            </ul>
                        :<div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                        }
                    </div>
                    <div className={this.state.curType == 3  ? 'cuplist-box' : 'cuplist-box-hidden'}>
                        <div className="tab1">
                            <ul>
                                <li className={this.state.curType2 == 4 ? 'active' : ''}  onClick={this.tabMenuFunc2.bind(this, 4,1)}><span>{HD_lANG['cup1'][globalLang]}</span></li>
                                <li className={this.state.curType2 == 5 ? 'active' : ''}  onClick={this.tabMenuFunc2.bind(this, 5,1)}><span>{HD_lANG['cup2'][globalLang]}</span></li>
                            </ul>
                        </div>
                        {this.state.totalNum != 0 ? (
                            <ReactPullLoad
                                downEnough={150}
                                action={this.state.action}
                                handleAction={this.handleAction}
                                hasMore={this.state.hasMore}
                                style={{paddingTop: 0}}
                                distanceBottom={200}>
                       <ul className="clearfix">
                           <li className="first">
                                <span className="b">竞猜国家</span>
                               <span className="c">竞猜金额(ogc)</span>
                               <span className="d">投注</span>
                               <span className="a">赔率</span>
                               <span className="e">结果</span>
                               <span className="f">赢取金额(ogc)</span>
                           </li>
                           {this.state.data.map(function(name,i) {

                               return <li key={i} className={_this.state.curType2 == 4 ? "groupli" : ""}>
                                       <span className="b">{_this.state.curType2 == 4 ? name.hostTeamCn + "vs"+ name.visitingTeamCn : name.teamCn}</span>
                                       <span className="c">{name.betAmount}</span>
                                       <span className="d">{_this.state.curType2 == 4 ? (name.betResult == 1 ? "主胜" : name.betResult == 2 ? "平局" : "客胜") : "冠军"}</span>
                                       <span className="a">{ name.betOdds}</span>
                                       <span className="e">{_this.state.curType2 == 4 ? name.result == 0 ? "未结算" :(name.result == 1 ? "主胜" : name.result == 2 ? "平局" : "客胜")  :name.isSettle ? "已结算" : "未结算"}</span>
                                       <span className="f">{name.winAmount}</span>
                                   </li>

                           })}
                       </ul>
                            </ReactPullLoad>
                        ) : (
                            <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                        )}
                    </div>
                </div>
                <div className={this.state.lockIsHidden   ? 'bet-box-hidden' : 'bet-box'} onClick={this.hideBet.bind(this)}>
                    <div className="bet" onClick={this.hideBet2.bind(this)}>
                        <div className="top">
                            <p><span>{this.state.userOGC}</span> OGC</p>
                            <p>您当前持有OGC</p>
                        </div>
                        <div className="bottom">
                            <div className="list">
                                <label htmlFor="input">输入金额：</label>
                                <input type="number" id="input" onChange={this.calculateWinOGC.bind(this)} placeholder={"最低押注1 OGC"} />
                            </div>
                            <div className="list">
                                获胜总赢得：{this.state.winCount} OGC
                            </div>
                            <div className="list">
                                <span onClick={this.betIngFunc.bind(this)}>确定</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default WalletBegin;