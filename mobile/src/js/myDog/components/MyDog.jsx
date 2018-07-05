import React from 'react';
import common from '../../common.js'
import ReactPullLoad,{ STATS } from 'react-pullload';
import eventUtil from  '../../checkEventPlan.js';
import tPopBox  from '../../transactionPop.js'
import winAlert from '../../winAlert.js';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';


class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dogs: [],
            currentBlockNum: 0,
            total: '',
            imgHost: '',
            likeNumber: [],
            curType: 0,
            pageSize: 10,
            orderBy: 0,

            profit: 0,
            withdrawal: 0,

            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,

            gen0WalkDog: 0,     //可以溜的0代狗数量
            gen0Dog: 0,        //拥有0代狗数量
            canWalk: 0,         //能否遛狗

            gen0Profit: 0,      //0代分红
        }
        this.handleAction = this.handleAction.bind(this)
        this.createMarkup = this.createMarkup.bind(this)
        this.walkDog = this.walkDog.bind(this)
        this.extractBonus = this.extractBonus.bind(this)
    }
    componentWillMount(){
        if(!defaultAccount){
            this.pushMethod('/mobile/wallet/myWallet.html')
            return;
        }
        this.getWithDrawalAmount();
        this.getMasterInfo();
        this.getMyDogList(this.state.curType, 1, this.state.orderBy);
        this.getOwnerProfit();
    }
    componentDidMount(){
        common.setPageTitle(HD_lANG['petCenter-title'][globalLang]);
        let isHash;
        try{
            if(common.isIos()){
                window.webkit.messageHandlers.getCoreInfoForKey.postMessage("hash");

            }else{
                window.ScriptAction.getCoreInfoForKey("hash");
            }
        }catch (e){
            isHash = localStorage.getItem("hash");
        }
        setTimeout(()=>{
            if(window.hashVal){

                eventUtil.show(window.hashVal);
                return false;
            }else if(isHash){

                eventUtil.show(isHash);
            }
        },2000)
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    // 获取狗狗
    getMyDogList(type, page, orderBy) {
        var _this = this
        _this.setState({
            curType: type
        })
        $http('/dog/myDogList', {
            walletAddress: defaultAccount,
            listType : type,    //0-所有 1-官方 2-出售 3-租赁
            toPage : page,
            pageSize : this.state.pageSize,
            orderBy: orderBy,
        }).then(function(data) {
            var dogs = [];
            if(data.code == "1200"){
                _this.pushMethod('/mobile/myself/setting.html');
                return false;
            }
            if(data.returnObj.Genesis && (type == 0 || type == 2)) {
                dogs = data.returnObj.Genesis.concat(data.returnObj.allList);
            }else{
                dogs = data.returnObj.allList || []
            }
            if(data.code == '0000') {
                _this.setState({
                    dogs: dogs,
                    total: data.returnObj.total,
                    imgHost: data.returnObj.imgHost,
                    currentBlockNum: data.returnObj.currentBlockNum,
                    likeNumber: data.returnObj.likeNumber,
                    data: _this.state.data.concat(dogs),
                    action: STATS.reset,
                    index: _this.state.index + 1
                })
            }
        })
    }
    // 获取个人信息
    getMasterInfo() {
        var _this = this;
        $http('/user/userInfo', {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' ){
                _this.setState({
                    profit: parseInt(Number(data.returnObj.profit,)*10000)/10000,
                    gen0WalkDog: data.returnObj.gen0WalkDog,
                    gen0Dog: data.returnObj.gen0Dog,
                    canWalk: data.returnObj.canWalk,
                })
            }else if(data.code == "1200"){
                try{
                    if( common.isIos() ){
                        window.webkit.messageHandlers.pushNewPage.postMessage("/mobile/myself/setting.html");
                    }else{
                        window.ScriptAction.pushNewPage("/mobile/myself/setting.html");
                    }
                }catch (e){
                    window.location.href= "/mobile/myself/setting.html";
                }
            }
        })
    }
    // 获取余额
    getWithDrawalAmount(){
        let _this = this;
        if(!defaultAccount){
            return false;
        }
        common.loading();
        dogMetacoin.methods.profit(defaultAccount).call(function(error, result) {
            common.removeLoading();
            if(!error){
                let _amount = result.toString();
                _amount = web3.utils.fromWei(_amount,'ether')
                _this.setState({
                    withdrawal: parseInt(Number(_amount)*10000)/10000
                })
            }
        });
    }
    // 提现
    extract() {
        let amount = Number(this.state.withdrawal);
        if( amount <= 0){
            winAlert.show(HD_lANG['alert27'][globalLang])
            return false;
        }
        let _this = this;
        common.loading();
        dogMetacoin.methods.withdraw().estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['extract1'][globalLang],
                address: address,
                gasLimit: gasLimit + 500,
                btnText: HD_lANG['petCenter20'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                dogMetacoin.methods.withdraw().send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                    common.removeLoading();
                    if(!error) {
                        try{
                            common.setHashVal(result)
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang])
                    }else{
                        winAlert.show(HD_lANG['alert16'][globalLang])
                    }
                })
            });
        }).catch(function(error) {
            common.removeLoading();
            winAlert.show(HD_lANG['alert16'][globalLang], function() {
                window.location.reload()
            })
        })
    }
    // 遛狗
    walkDog() {
        var _this = this;
        if(!this.state.canWalk || !this.state.gen0WalkDog) {
            return;
        }
        $http('/dog/walkDog', {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' ){
                var str = _this.createMarkup(HD_lANG['alert28'][globalLang], [data.returnObj.redound]);
                winAlert.show(str.__html, function() {
                    _this.setState({
                        canWalk: 0
                    })
                })
            }
        })
    }
    // 0代分红
    getOwnerProfit() {
        var _this = this;
        common.loading();
        ownerProfit.methods.ownerProfit(defaultAccount).call().then(function(result) {
            common.removeLoading();
            var profit = web3.utils.fromWei(result.toString());
            _this.setState({
                gen0Profit: profit
            })
        }).catch(function(error){
            common.removeLoading();
            winAlert.show(HD_lANG['alert5'][globalLang], function() {
                window.location.reload()
            })
        })
    }
    // 提取分红
    extractBonus() {
        let amount = Number(this.state.gen0Profit);
        if( amount <= 0){
            winAlert.show(HD_lANG['alert27'][globalLang])
            return false;
        }
        let _this = this;
        common.loading();
        ownerProfit.methods.withdraw().estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['extract6'][globalLang],
                address: _address3,
                gasLimit: gasLimit + 500,
                btnText: HD_lANG['petCenter20'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                ownerProfit.methods.withdraw().send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                    common.removeLoading();
                    if(!error) {
                        try{
                            common.setHashVal(result)
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang])
                    }else{
                        winAlert.show(HD_lANG['alert16'][globalLang])
                    }
                })
            });
        }).catch(function(error) {
            common.removeLoading();
            winAlert.show(HD_lANG['alert16'][globalLang], function() {
                window.location.reload()
            })
        })
    }
    // 排序
    sort() {
        var orderBy = 2;
        if(this.state.orderBy != 3){
            orderBy = 3
        }
        this.setState({
            orderBy: orderBy,
            data: [],
        })
        this.getMyDogList(this.state.curType, 1, orderBy)
    }

    //下拉刷新
    handleAction  (action)  {
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

    handRefreshing  () {  //刷新
        let _this = this;
        if(STATS.refreshing === this.state.action){
            return false
        }

        setTimeout(()=>{
            //refreshing complete
            _this.getMyDogList(_this.state.curType, 1, this.state.orderBy);
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
            let totalPage = Math.ceil((_this.state.total/_this.state.pageSize));
            if(_this.state.index > totalPage){
                _this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else{
                _this.getMyDogList(_this.state.curType, _this.state.index, _this.state.orderBy)

            }
        }, 1500)

        this.setState({
            action: STATS.loading
        })
    }
    //下拉刷新结束
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
    // 菜单切换
    tabMenuFunc(type, page, event){
        let _this = this;
        this.setState({
            curType: type,
            index : 1,
            hasMore : true,
            action: STATS.init,
            data : []
        }, function() {
            _this.getMyDogList(type, page)
        })
    }
    render(){
        let currentBlockNum = this.state.currentBlockNum
        let curType = this.state.curType
        let gen0Profit = parseInt(this.state.gen0Profit*10000)/10000
        
        return(
            <div className="myDog-wrap">
                <div className="list-wrap">
                    <div className="tab">
                        <ul>
                            <li className={curType == 0 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 0, 1)}><span>{HD_lANG['list2'][globalLang]}</span></li>
                            <li className={curType == 4 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 4, 1)}><span>{HD_lANG['winning18'][globalLang]}</span></li>
                            <li className={curType == 5 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 5, 1)}><span>{HD_lANG['winning19'][globalLang]}</span></li>
                            <li className={curType == 2 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 2, 1)}><span>{HD_lANG['winning20'][globalLang]}</span></li>
                            <li className={curType == 3 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 3, 1)}><span>{HD_lANG['winning21'][globalLang]}</span></li>
                        </ul>
                    </div>

                    <div className="list-view">
                        <div className="handle-tips">{HD_lANG['list18'][globalLang]}</div>
                        <div className="handle-earnings">
                            <div className="row clearfix">
                                <a href="/mobile/index/acquire.html" onClick={this.pushMethod.bind(this, "/mobile/index/acquire.html")} className="btn-def btn-sty3">{HD_lANG['petCenter37'][globalLang]}</a>
                                <div className="txt">{HD_lANG['extract2'][globalLang]}<span className="stg">{this.state.profit}</span></div>
                            </div>
                            <div className="row clearfix">
                                <a href="/mobile/myself/extract.html" onClick={this.pushMethod.bind(this, "/mobile/myself/extract.html")} className="btn-def btn-sty5">{HD_lANG['petCenter38'][globalLang]}</a>
                                <a href="javascript:;" className="btn-def btn-sty4" onClick={this.extract.bind(this)}>{HD_lANG['extract1'][globalLang]}</a>
                                <div className="txt">{HD_lANG['extract3'][globalLang]}<span className="stg">{this.state.withdrawal}</span></div>
                            </div>
                            <div className="row clearfix">
                                <a href="/mobile/myself/walkHistory.html" onClick={this.pushMethod.bind(this, "/mobile/myself/walkHistory.html")} className="btn-def btn-sty4">{HD_lANG['petCenter39'][globalLang]}</a>
                                <a href="javascript:;" className={this.state.canWalk && this.state.gen0WalkDog? 'btn-def btn-sty3' : 'btn-def btn-sty3 disabled'} onClick={this.walkDog}>{HD_lANG['petCenter40'][globalLang]}</a>
                                <div className="txt clearfix">{HD_lANG['extract4'][globalLang]}<span className="stg">{this.state.gen0WalkDog}</span></div>
                            </div>
                            <div className="row clearfix">
                                <a href="/mobile/myself/bonus.html" onClick={this.pushMethod.bind(this, "/mobile/myself/bonus.html")} className="btn-def btn-sty4">{HD_lANG['extract7'][globalLang]}</a>
                                <a href="javascript:;" className='btn-def btn-sty3' onClick={this.extractBonus}>{HD_lANG['extract6'][globalLang]}</a>
                                <div className="txt clearfix">{HD_lANG['extract8'][globalLang]}<span className="stg">{gen0Profit}</span></div>
                                <div className="tips2">
                                    {HD_lANG['extract5'][globalLang]}
                                </div>
                            </div>
                        </div>
                        <div className="top">
                            <span className="total">{HD_lANG['list3'][globalLang]}：{this.state.total}</span>
                            <span className="tips">{HD_lANG['petCenter36'][globalLang]}</span>
                        </div>
                        <ReactPullLoad
                            downEnough={150}
                            action={this.state.action}
                            handleAction={this.handleAction}
                            hasMore={this.state.hasMore}
                            style={{paddingTop: 0}}
                            distanceBottom={200}>
                            <ul className="clearfix">
                                {this.state.total ? (
                                    this.state.data.map((item, index) => (
                                        <li className={item.dogId == 1 || item.dogId == 0 ? "item-view adjust" : "item-view"} key={item.dogId}>
                                            <a href={"/mobile/index/detail.html?dogId="+item.dogId} onClick={this.pushMethod.bind(this, "/mobile/index/detail.html?dogId=" + item.dogId)} className={'pic item-bd-' + common.getBgColorClass(item.genesStr, 7)}>
                                                {item.lotteryLevel > 0 && <div className={'beyond beyond-bd-' +  item.lotteryLevel}>{common.switchAwards(item.lotteryLevel - 1)}</div>}
                                                {item.status == 1 || item.status == 2 ? (
                                                    <div className={"top-tag " + common.switchIcon(item.status)}>
                                                        {common.getStateText(item.status, currentBlockNum, item.endBolckNumber)}
                                                        <span className="icon">{common.getDogCurrentPrice(item.startPrice,item.endPrice,currentBlockNum,item.eventBlockNumber,item.duration)}</span>
                                                    </div>
                                                ) : (
                                                    <div className="top-tag">{item.endBolckNumber > currentBlockNum ? common.getStateText(item.status, currentBlockNum, item.endBolckNumber) : common.switchStatus(item.status)}</div>
                                                )}
                                                <img src={item.variation == 0 ? this.state.imgHost + item.genesStr +".png" :"http://www.haloudog.com/img/otherdog/variation.png"} alt="pet"/>
                                                <div className="bottom-tag">
                                                    {common.switchCoolDownIndex(item.coolDownIndex)}
                                                    {/* <span className="icon icon-hint"></span> */}
                                                </div>
                                            </a>
                                            <div className="info">
                                                <em className="ellipsis">{item.dogName}</em>
                                                {item.dogId != 0 && item.dogId != 1 && (
                                                    <strong>
                                                        <span>ID{item.dogId}</span>
                                                        <span className={'gen' + item.generation}>{item.generation}代</span>
                                                        <span>{common.switchCoolDownIndex(item.coolDownIndex)}</span>
                                                    </strong>
                                                )}
                                            </div>
                                            <div className="collect icon-love">{this.state.likeNumber[item.dogId] ? this.state.likeNumber[item.dogId] : "0"}</div>
                                        </li>
                                    ))
                                ) : (
                                    <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                                )}
                            </ul>
                        </ReactPullLoad>

                        {/*<ul className="clearfix">
                            {this.state.dogs ? (
                                this.state.dogs.map((item, index) => (
                                    <li className={item.dogId == 1 || item.dogId == 0 ? "item-view adjust" : "item-view"} key={item.dogId}>
                                        <a href={"/mobile/index/detail.html?dogId=" + item.dogId} className={'pic item-bd-' + common.getBgColorClass(item.genesStr, 7)}>
                                            {item.lotteryLevel > 0 && <div className={'beyond beyond-bd-' +  item.lotteryLevel}>{common.switchAwards(item.lotteryLevel - 1)}</div>}
                                            {item.status == 1 || item.status == 2 ? (
                                                <div className={"top-tag " + common.switchIcon(item.status)}>
                                                    {common.getStateText(item.status, currentBlockNum, item.endBolckNumber)}
                                                    <span className="icon">{common.getDogCurrentPrice(item.startPrice,item.endPrice,currentBlockNum,item.eventBlockNumber,item.duration)}</span>
                                                </div>
                                            ) : (
                                                <div className="top-tag">{common.switchStatus(item.status)}</div>
                                            )}
                                            <img src={item.variation == 0 ? this.state.imgHost + item.genesStr +".png" :"http://www.haloudog.com/img/otherdog/variation.png"} alt="pet"/>
                                            <div className="bottom-tag">
                                                急速<span className="icon icon-hint"></span>
                                            </div>
                                        </a>
                                        <div className="info">
                                            {item.dogName}
                                            {item.dogId != 0 && item.dogId != 1 && (
                                                <strong>
                                                    <span>{item.generation}代</span><span>{common.switchCoolDownIndex(item.coolDownIndex)}</span>
                                                </strong>
                                            )}
                                        </div>
                                        <div className="collect icon-love">{this.state.likeNumber[item.dogId]}</div>
                                    </li>
                                ))
                            ) : (
                                <div className="empty">暂无数据</div>
                            )}
                        </ul>*/}
                    </div>
                </div>
            </div>
        )
    }
}



export default Index;