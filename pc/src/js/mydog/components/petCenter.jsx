import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Loading from '../../base/components/Loading.jsx';
import PageComponent  from '../../base/components/ListPage.jsx';
import WinAlert from '../../base/components/winAlert.jsx';

// 公用函数库
import {switchCoolDownIndex, switchAwards, switchStatus, getBgColorClass} from '../../base/common.js'

import img2 from '../../../images/img0327/sum-portrait.png'
import eventUtil from  '../../base/components/checkEventPlan.js';
// 获取冷却时间
function getCoolTime(number){
    if(number < 0){
        return ''
    }
    var mss = number*20*1000; //区块数*20s 得到s数
    
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    var _str = ""
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
            _str = "0";
        }else{
            _str = minutes + HD_lANG['list13'][globalLang];
        }
    }
    return _str
}

// 转赠弹窗
class GiftPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    // 赠送
    present(event) {
        event.preventDefault();
        let item = this.props.item;
        let address = this.refs.address.value;
        if(!address){
            WinAlert.show(HD_lANG['petCenter27'][globalLang]);
            return;
        }

        // 赠送
        dogMetacoin.transfer(address, item.dogId, {from: defaultAccount},function (error,result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.href = "/mydog/petCenter.html";
                    },500)
                });
            }
        })
    }
    render() {
        if(!this.props.isShowGiftPop){
            return null;
        }
        let imgUrl = this.props.imgHost + this.props.item.genesStr + '.png';
        return (
            <div className="pop-gift" onClick={this.props.onClick}>
                <div className="wrap">
                    <div className="close" onClick={this.props.onClick}></div>
                    <div className={'pic vertical item-bd-' + getBgColorClass(this.props.item.genesStr, 7)}>
                        <img src={imgUrl} alt="pet"/>
                    </div>
                    <div className="row-input">
                        <input ref="address" type="text" className="input-txt" placeholder={HD_lANG['petCenter17'][globalLang]}/>
                    </div>
                    <div className="ps">*{HD_lANG['petCenter18'][globalLang]}</div>
                    <div className="row-btn">
                        <button type="button" className="btn-submit" onClick={this.present.bind(this)}>{HD_lANG['petCenter19'][globalLang]}</button>
                    </div>
                </div>
            </div>
        )
    }
}

// 狗狗列表
class ListView extends React.Component{
    constructor(props){
        super(props)
    }

    // 取消出售 
    saleCancel(dogId) {
        buyDogMeta.cancelAuction(dogId, {gasPrice:defaultGasPrice, from: defaultAccount},function(error, result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                })
            }
        })
    }
    
    // 取消租借
    breedCancel(dogId) {
        siringMetacoin.cancelAuction(dogId, {gasPrice:defaultGasPrice, from: defaultAccount},function(error, result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                })
            }
        })
    }

    // 接生
    giveBirth(dogId) {
        dogMetacoin.giveBirth(dogId, {gasPrice:defaultGasPrice, gas: 210000, from: defaultAccount},function(error, result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.reload()
                    },500)
                })
            }
        })
    }

    render() {
        if(!this.props.items || this.props.items.length == 0){
            return <div className="empty">{HD_lANG['mating8'][globalLang]}</div>
        }
        return (
            <div>
                <div className="transaction-text transaction-text1">{HD_lANG['list18'][globalLang]}</div>

            <ul className="list clearfix">
                {this.props.items.map((item, index) => (
                    <li className={'pet-item item-bd-' + getBgColorClass(item.genesStr, 7)} key={item.dogId}>
                        {item.lotteryLevel > 0 && <div className={'beyond beyond-bd-' +  item.lotteryLevel}>{switchAwards(item.lotteryLevel - 1)}</div>}
                        <div className="pet-info">
                            <a href={"/list/detail.html?id=" + item.dogId} className={item.dogId == 1 || item.dogId == 0 ? "pic pic-initial vertical" : "pic vertical"}>

                                <img src={item.variation == 0 ?this.props.imgHost + item.genesStr + '.png':"http://www.haloudog.com/img/otherdog/variation.png" } alt="pet" />
                                {item.variation == 0 
                                    ? <div className="speed">{switchCoolDownIndex(item.coolDownIndex)}</div>
                                    : <div className="speed">{HD_lANG['list19'][globalLang]}</div>
                                }
                            </a>
                            <ul className="sum">
                                {
                                    <li className="pet-name">
                                        {/* <label>名称：</label><input type="text" ref={'petEdit' + item.dogId} maxLength={12} defaultValue={item.dogName} readOnly={!item.isEdit}/> */}
                                        <label>{HD_lANG['petCenter28'][globalLang]}</label>
                                        {!item.isEdit ? (item.dogName == "创世狗" ? HD_lANG['list20'][globalLang] : item.dogName) : <input type="text" ref={'petEdit' + item.dogId} maxLength={12} defaultValue={item.dogName} onChange={this.props.changeDogName}/>}
                                        {item.dogId != 0 && item.dogId != 1 
                                            ? <span className={item.isEdit ? 'submit' : 'edit'} onClick={(e) => this.props.changePetEdit(item.dogId, e)}></span>
                                            : ''
                                        }
                                    </li>
                                }
                                <li className="pet-gene">ID:{item.dogId}</li>
                                <li className="pet-gene">{HD_lANG['petCenter29'][globalLang]}{item.generation}{HD_lANG['petCenter16'][globalLang]}</li>
                                {/* this.props.currentBlockNum > item.endBolckNumber */}
                                {item.status == '0' && item.endBolckNumber > this.props.currentBlockNum
                                    // ? <li className="pet-state">状态：休息中{getCoolTime(item.endBolckNumber - this.props.currentBlockNum)}</li>
                                    ? <li className="pet-state">{HD_lANG['petCenter30'][globalLang]}</li>
                                    : <li className="pet-state">{HD_lANG['petCenter31'][globalLang]}{switchStatus(item.status)}</li>
                                }
                            </ul>
                        </div>
                        <div className="handle">
                            {
                                item.dogId != 0 && item.dogId != 1 && item.variation == 0 && item.status == '0' || item.status == '3' ? (
                                    <a href="javascript:;" className="link link-gift" onClick={(e) => this.props.showGiftPop(item, e)}>
                                        <div className="txt txt-gift"><span>{HD_lANG['petCenter10'][globalLang]}</span></div>
                                        <div className="icon icon-gift"></div>
                                    </a>
                                ) : (
                                    <a href="javascript:;" className="link link-gift disabled">
                                        <div className="txt txt-gift"><span>{HD_lANG['petCenter10'][globalLang]}</span></div>
                                        <div className="icon icon-gift"></div>
                                    </a>
                                )
                            }
                            {
                                item.dogId != 0 && item.dogId != 1 && item.status == '0' && item.lotteryLevel == '0' && this.props.currentBlockNum > item.endBolckNumber && item.variation == 0 ? (
                                    <a href={"/mydog/mating.html?id=" + item.dogId} className="link">
                                        <div className="txt">{HD_lANG['petCenter11'][globalLang]}</div>
                                        <div className="icon icon-love"></div>
                                    </a>
                                ) : (
                                    // item.status == 3 && (
                                        <a href="javascript:;" className="link disabled">
                                            <div className="txt">{HD_lANG['petCenter11'][globalLang]}</div>
                                            <div className="icon icon-love"></div>
                                        </a>
                                    // )
                                )
                            }
                            {
                                item.status == '0' && item.lotteryLevel == '0' && this.props.currentBlockNum > item.endBolckNumber && item.variation == 0 ? (
                                    <a href={"/list/saleIng.html?id=" + item.dogId + '&action=' + '2'} className="link">
                                        <div className="txt">{HD_lANG['petCenter12'][globalLang]}</div>
                                        <div className="icon icon-nursing"></div>
                                    </a>
                                ) : (
                                    item.status == 2 && item.dogId != 0 && item.dogId != 1
                                    ? <a href="javascript:;" className="link" onClick={this.breedCancel.bind(this, item.dogId)}>
                                        <div className="txt">{HD_lANG['buying2'][globalLang]}</div>
                                        <div className="icon icon-nursing"></div>
                                    </a>
                                    : <a href="javascript:;" className="link disabled">
                                        <div className="txt">{HD_lANG['petCenter12'][globalLang]}</div>
                                        <div className="icon icon-nursing"></div>
                                    </a>
                                )
                            }
                            {
                                item.status == '0' && item.lotteryLevel == '0' && this.props.currentBlockNum > item.endBolckNumber && item.variation == 0 ? (
                                    <a href={"/list/saleIng.html?id=" + item.dogId + '&action=' + '1'} className="link">
                                        <div className="txt">{HD_lANG['petCenter13'][globalLang]}</div>
                                        <div className="icon icon-sell"></div>
                                    </a>
                                ) : (
                                    item.status == 1 && item.dogId != 0 && item.dogId != 1
                                    ? <a href="javascript:;" className="link" onClick={this.saleCancel.bind(this, item.dogId)}>
                                        <div className="txt">{HD_lANG['buying2'][globalLang]}</div>
                                        <div className="icon icon-nursing"></div>
                                    </a>
                                    : <a href="javascript:;" className="link disabled">
                                        <div className="txt">{HD_lANG['petCenter13'][globalLang]}</div>
                                        <div className="icon icon-sell"></div>
                                    </a>
                                )
                            }
                            {
                                item.variation == 0 && item.lotteryLevel >=1 && item.lotteryLevel <= 7 ? (
                                    <a href={"/account/winning.html?id=" + item.dogId} className="link">
                                        <div className="txt">{HD_lANG['petCenter14'][globalLang]}</div>
                                        <div className="icon icon-redeem"></div>
                                    </a>
                                ) : (
                                    <a href="javascript:;" className="link disabled">
                                        <div className="txt">{HD_lANG['petCenter14'][globalLang]}</div>
                                        <div className="icon icon-redeem"></div>
                                    </a>
                                )
                            }
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        )
    }
}

class PetCenter extends React.Component {
    constructor(props) {
        super(props);

        this.onCopy = this.onCopy.bind(this);
        this.showGiftPop = this.showGiftPop.bind(this);
        this.closeGiftPop = this.closeGiftPop.bind(this);
        this.changePetEdit = this.changePetEdit.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.extractBonus = this.extractBonus.bind(this)

        this.state = {
            profit: 0,

            copied: false,
            // 主人昵称
            nickName: '',
            // 地址
            addressVal: '',
            // 控制转赠弹层
            isShowGiftPop: false,
            // 是否可编辑
            isEdit: false,
            // 按钮文字
            btnTxt: HD_lANG['petCenter1'][globalLang],
            //分页
            indexList : [], //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: 1, //当前页码
            pageSize: 9, //每页显示的条数5条
            goValue:'',
            totalPage:'',//总页数

            // 保存点击过转赠的狗狗信息
            item: {},

            // 要修改的狗狗昵称
            dogName: '',
            
            imgHost: '',
            currentBlockNum: 0,

            withdrawal : 0,

            redoundMoney: 0, // OGC余额

            gen0WalkDog: 0,     //可以溜的0代狗数量
            gen0Dog: 0,        //拥有0代狗数量
            canWalk: 0,         //能否遛狗

            gen0Profit: 0,      //0代分红

        }
    }
    componentDidUpdate() {
        sessionStorage.setItem('page', this.state.current)
    }
    componentDidMount() {
        let isHash = localStorage.getItem("hash");
        if(isHash){
            eventUtil.show(isHash);
        }
        document.title = HD_lANG['header4'][globalLang];
        this.getWithDrawalAmount();
        var curPage = sessionStorage.getItem('page') || 1;
        var curTab = getUrlPar('tab');
        // 设置默认分页为第一页
        if(curTab != 0 && curTab) {
            curPage = 1;
        }
        this.setState({
            current: Number(curPage)
        })
        this.getMasterInfo()
        this.pageClick(curPage)
        this.getOwnerProfit();
    }


    //点击翻页
    pageClick(pageNum){
        let _this = this;
        if(pageNum != _this.state.current){
            _this.setState({
                current: pageNum
            })
        }
        let curTab = getUrlPar('tab')
        _this.getMyDogList(pageNum, this.state.pageSize, curTab);
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
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    }
    //跳转到指定页
    goSwitchChange(e){
        var _this= this;
        var value = e.target.value;
        _this.setState({goValue : value})
        if(!/^[1-9]\d*$/.test(value)){
            WinAlert.show(HD_lANG['list16'][globalLang]);
        }else if(parseInt(value) > parseInt(_this.state.totalPage)){
            WinAlert.show(HD_lANG['list17'][globalLang]);
        }else{
            _this.pageClick(value);
        }
    }

    // 切换主人昵称编辑状态
    changeMasterEdit(e) {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit
        }))
        if(!this.state.isEdit){
            setTimeout(() => {
                this.refs.editInput.focus()
            }, 30)
        }else{
            this.updateUser();
        }
    }

    changeDogName(event) {
        this.setState({
            dogName: event.target.value
        })
    }

    // 切换宠物昵称编辑状态
    changePetEdit(dogId, event) {
        event.persist();
        var _this = this;
        var _item = null;
        var dogName = this.state.dogName.trim();
        this.setState(function(prevState, props) {
            let indexList = prevState.indexList.map(function(item) {
                // 切换当前点击狗狗的可编辑状态
                if(item.dogId == dogId){
                    item.isEdit = !item.isEdit;
                    if(!item.isEdit && dogName) {
                        item.dogName = dogName;
                    }
                    _item = item;
                }else{
                    item.isEdit = false
                }
                return item;
            })
            return {
                indexList: indexList
            }
        })
        setTimeout(() => {
            var _inputDom = _this.refs.listView.refs['petEdit' + dogId];
            if(_item.isEdit && _inputDom){
                _inputDom.focus();
            }else{
                _this.updateDogInfo(dogId, dogName)
            }
        }, 17)
    }

    onCopy(e) {//copy事件
        this.setState({copied: true});
        WinAlert.show(HD_lANG['saveinfo0'][globalLang]) 
    }

    showGiftPop(item, event) {
        event.preventDefault();
        this.setState({
            isShowGiftPop: true,
            item: item
        })
    }
    
    showLoading ($parentObj){
        $("#ajaxLoad").show();
    }

    hideLoadiing($id){
        $("#ajaxLoad").hide();
    }

    // 关闭弹窗
    closeGiftPop(event) {
        event.stopPropagation();
        event.preventDefault();
        if(event.target.className == 'pop-gift' ||  event.target.className == 'close'){
            this.setState(prevState => ({
                isShowGiftPop: false
            }))
        }
    }

    // 获取个人信息
    getMasterInfo() {
        var _this = this;

        if(!defaultAccount){
            return false;
        }
        $.ajax({
            url : api_host + "/user/userInfo",
            data :{
                walletAddress : defaultAccount,
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    if(!data.returnObj){
                        window.location.href= "/account/info.html";
                        return false;
                    }
                    _this.setState({
                        nickName: data.returnObj.nickName,
                        addressVal: data.returnObj.address,
                        profit: data.returnObj.profit,
                        redoundMoney : data.returnObj.redoundMoney,
                        gen0WalkDog: data.returnObj.gen0WalkDog,
                        gen0Dog: data.returnObj.gen0Dog,
                        canWalk: data.returnObj.canWalk,
                    })
                }else{

                }
            }
        })

    }

    // 更新个人信息
    updateUser() {
        var _this = this;
        var _value = this.refs.editInput.value.trim();
        if(!_value){
            WinAlert.show(HD_lANG['winning15'][globalLang])
            return;
        }
        if(_value > 22){
            WinAlert.show(HD_lANG['winning16'][globalLang])
            return;
        }
        this.setState({
            nickName : _value
        })

        $.ajax({
            url : api_host + "/user/update",
            data :{
                walletAddress : defaultAccount,
                nickName : _value
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    WinAlert.show(HD_lANG['winning17'][globalLang])
                }
            }
        })
    }

    // 修改狗狗名字
    updateDogInfo(dogId, dogName) {
        dogName = dogName.trim();
        if(!dogName){
            WinAlert.show(HD_lANG['winning15'][globalLang])
            return;
        }
        // 汉字算2字节
        /*if(dogName.replace(/[^\x00-\xff]/g,"aa").length > 12){
            WinAlert.show(HD_lANG['winning16'][globalLang])
            return;
        }*/

        var dogNameLength = this.checkStrLength(dogName);
        if(dogNameLength >6){
            WinAlert.show(HD_lANG['winning16'][globalLang])
            return;
        }
        $.ajax({
            url : api_host + "/dog/updateDogInfo",
            data :{
                walletAddress : defaultAccount,
                dogId : dogId,
                dogName: dogName
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    WinAlert.show(HD_lANG['winning17'][globalLang])
                }
            }
        })
    }

    // 获取我的所有狗狗
    getMyDogList(toPage, pageSize, listType) {
        var _this = this;
        if(!defaultAccount){
            return false;
        }
        _this.showLoading();
        $.ajax({
            url : api_host + "/dog/myDogList",
            data :{
                walletAddress : defaultAccount,
                toPage: toPage,
                pageSize: pageSize,
                listType: listType
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    // 给狗狗列表添加个是否可编辑属性，用来修改狗狗名字
                    let items = data.returnObj.allList && data.returnObj.allList.map(item => (Object.assign({}, item, {isEdit: false})));
                    _this.setState({
                        indexList: items,
                        imgHost: data.returnObj.imgHost,
                        currentBlockNum: data.returnObj.currentBlockNum,
                        totalNum : data.returnObj.total,
                        totalPage: totalPage,
                    })
                }
                _this.hideLoadiing();
            }
        })
    }

    getWithDrawalAmount(){
        let _this = this;
        if(!defaultAccount){
            return false;
        }
        dogMetacoin.profit(defaultAccount,function(error,result){
            if(!error){
                let _amount = result.toString();
                _amount = web3.fromWei(_amount,'ether');
                _amount = _amount.substring(0,6)
                _this.setState({
                    withdrawal:_amount
                })
            }
        });
    }
    //提现
    withDrawal(){
        let amount = Number(this.state.withdrawal);
        if( amount <= 0){
            WinAlert.show(HD_lANG['alert5'][globalLang])
            return false;
        }
        dogMetacoin.withdraw({gasPrice:defaultGasPrice,from: defaultAccount},function (error,result) {
            if(!error){
                WinAlert.show(HD_lANG['alert1'][globalLang],function () {
                    localStorage.setItem("hash",result);
                    setTimeout(()=>{
                        window.location.href = "/mydog/petCenter.html";
                    },500)
                })
            }
        })
    }
    // 0代分红
    getOwnerProfit() {
        var _this = this;
        ownerProfit.ownerProfit(defaultAccount, function(error, result) {
            if(!error) {
                _this.setState({
                    gen0Profit: web3.fromWei(result.toString())
                })
            }
        })
    }
    // 提取分红
    extractBonus() {
        let amount = Number(this.state.gen0Profit);
        if( amount <= 0){
            WinAlert.show(HD_lANG['alert5'][globalLang])
            return false;
        }
        ownerProfit.withdraw({gasPrice:defaultGasPrice,from: defaultAccount},function (error,result) {
            if(!error){
                WinAlert.show(HD_lANG['alert1'][globalLang],function () {
                    localStorage.setItem("hash",result);
                    setTimeout(()=>{
                        window.location.href = "/mydog/petCenter.html";
                    },500)
                })
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
    // 遛狗
    walkDog() {
        var _this = this;
        if(!this.state.canWalk || !this.state.gen0WalkDog) {
            return;
        }
        $.ajax({
            url : api_host + "/dog/walkDog",
            data :{
                walletAddress : defaultAccount,
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000' ){
                    var str = _this.createMarkup(HD_lANG['alert6'][globalLang], [data.returnObj.redound]);
                    WinAlert.show(str.__html, function() {
                        _this.setState({
                            canWalk: 0
                        })
                    })
                }
            }
        })
    }
    checkStrLength(str){
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                len+=2;
            }
        }
        return len;
    }
    render(){
        let isShowGiftPop = this.state.isShowGiftPop;
        let isEdit = this.state.isEdit;
        let nickName = this.state.nickName;
        let btnTxt = this.state.isEdit ? HD_lANG['petCenter20'][globalLang] : HD_lANG['petCenter1'][globalLang];
        let curTab = getUrlPar('tab');
        let gen0Profit = parseInt(this.state.gen0Profit*10000)/10000

        return(
            <div className="petCenter">
                <GiftPopup isShowGiftPop={isShowGiftPop} onClick={this.closeGiftPop} item={this.state.item} imgHost={this.state.imgHost}/>

                <div className="pet-summary">
                    <div className="pet-wrap clearfix">
                        <div className="sum-info fl">
                            <div className="pic fl">
                                <img src={img2} alt="portrait" />
                            </div>
                            <div className="info">
                                <div className="row pet-name">
                                    {/* <div className="full-name" ref="editInput" contentEditable={isEdit} dangerouslySetInnerHTML={{__html: nickName}}></div> */}
                                    {
                                        isEdit ? <input type="text" ref="editInput" className="full-name" defaultValue={nickName} readOnly={!isEdit} />
                                                : <div className="full-name">{nickName}</div>
                                    }
                                    <button className="pet-btn btn-edit" onClick={this.changeMasterEdit.bind(this)}>{btnTxt}</button>
                                </div>
                                {/*
                                <div className="row sign">个性签名</div>
                                */}
                                <div className="row url clearfix">

                                    <div className="addr">
                                        {HD_lANG['petCenter21'][globalLang]}：<span className="stg">{this.state.addressVal}</span>
                                    </div>
                                    <CopyToClipboard text={this.state.addressVal} onCopy={this.onCopy}>
                                        <button className="pet-btn btn-copy">{HD_lANG['petCenter2'][globalLang]}</button>
                                    </CopyToClipboard>
                                    <div className="ogc clearfix">
                                        <span className="stg1">{HD_lANG['petCenter34'][globalLang]}</span>
                                        <span className="stg2">{this.state.redoundMoney}</span>
                                        <span className="stg3"><a href="/account/transfer.html">{HD_lANG['transfer0'][globalLang]}</a></span>
                                        <span className="stg3"><a href="/account/transferList.html">{HD_lANG['transfer9'][globalLang]}</a></span>
                                    </div>
                                    <div className="ogc clearfix">
                                        <span className="stg1">{HD_lANG['petCenter37'][globalLang]}</span>
                                        <span className="stg2">{gen0Profit}</span>
                                        <span className="stg3"><a href="javascript:;" onClick={this.extractBonus}>{HD_lANG['petCenter38'][globalLang]}</a></span>
                                        <span className="stg3"><a href="/account/withdrawal.html">{HD_lANG['petCenter39'][globalLang]}</a></span>
                                    </div>
                                    <div className="tips2">
                                        {HD_lANG['petCenter36'][globalLang]}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="sum-account fr">
                            <div className="row balance">
                                <div className="earnings">{HD_lANG['petCenter3'][globalLang]}：<span className="stg">{this.state.profit} eth</span></div>
                                <a href="/account/earning.html" className="ear-detail">{HD_lANG['petCenter4'][globalLang]}</a>
                            </div>
                            <div className="row balance withdrawal">
                                <div className="earnings">{HD_lANG['petCenter3-0'][globalLang]}：<span className="stg">{this.state.withdrawal} eth</span></div>
                                <a href="javascript:;" onClick={this.withDrawal.bind(this)} className="ear-detail ear-detail2">{HD_lANG['petCenter4-0'][globalLang]}</a>
                                <a href="/account/withdrawal.html" className="ear-detail ear-detail3">{HD_lANG['petCenter4-1'][globalLang]}</a>
                            </div>
                            <div className="row skip clearfix">
                                <a href="/account/info.html" className="link btn-bd-red">
                                    <i className="icon icon-user"></i>{HD_lANG['petCenter5'][globalLang]}</a>
                                <a href="/account/translist.html" className="link btn-bd-blue">
                                    <i className="icon icon-deal"></i>{HD_lANG['petCenter6'][globalLang]}</a>
                                <a href="/account/redeem.html" className="link btn-bd-green ">
                                    <i className="icon icon-claim"></i>{HD_lANG['petCenter7'][globalLang]}</a>
                            </div>
                            <div className="row balance withdrawal walk">
                                <a href="javascript:;" onClick={this.walkDog.bind(this)} className="ear-detail ear-detail2" className={this.state.canWalk && this.state.gen0WalkDog ? 'ear-detail ear-detail2' : 'ear-detail ear-detail2 disabled'}>{HD_lANG['petCenter32'][globalLang]}</a>
                                <a href="/account/earning.html" className="ear-detail ear-detail3">{HD_lANG['petCenter33'][globalLang]}</a>
                            </div>
                            <div className="row">
                                <span className="tips">{HD_lANG['petCenter35'][globalLang]}{this.state.gen0WalkDog}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pet-items">
                    <div className="pet-wrap">
                        <div className="filtrate">
                            <div className="filt-top clearfix">
                                <div className="l-box">
                                    <a href="/mydog/petCenter.html?tab=0" className={!curTab || curTab == '0' ? 'select tab1' : 'tab1'}>{HD_lANG['petCenter8'][globalLang]}</a>
                                    <a href="/mydog/petCenter.html?tab=4" className={curTab == 4 ? 'select tab2' : 'tab2'}>{HD_lANG['list14-3'][globalLang]}</a>
                                    <a href="/mydog/petCenter.html?tab=5" className={curTab == 5 ? 'select tab3' : 'tab3'}>{HD_lANG['winning19'][globalLang]}</a>
                                    <a href="/mydog/petCenter.html?tab=2" className={curTab == 2 ? 'select tab4' : 'tab4'}>{HD_lANG['winning20'][globalLang]}</a>
                                    <a href="/mydog/petCenter.html?tab=3" className={curTab == 3 ? 'select tab5' : 'tab5'}>{HD_lANG['winning21'][globalLang]}</a>
                                </div>
                            </div>
                            {/*
                            <div className="filt-md clearfix">
                                <div className="total">
                                    <span>21</span>条狗狗</div>
                                <div className="txt">Ξ &nbsp;筛选狗狗</div>
                            </div>*/}
                        </div>
                        
                        <div className="pet-view">
                            {/* 狗狗列表 */}
                            <ListView ref="listView" 
                                    items={this.state.indexList}
                                    currentBlockNum={this.state.currentBlockNum} 
                                    imgHost={this.state.imgHost} 
                                    showGiftPop={this.showGiftPop} 
                                    changePetEdit={this.changePetEdit}
                                    changeDogName={this.changeDogName.bind(this)}/>

                            {/* loading */}
                            <Loading />
                        </div>

                        <PageComponent total={this.state.totalNum}
                                       current={this.state.current}
                                       totalPage={this.state.totalPage}
                                       goValue={this.state.goValue}
                                       pageClick={this.pageClick.bind(this)}
                                       goPrev={this.goPrevClick.bind(this)}
                                       goNext={this.goNext.bind(this)}
                                       switchChange={this.goSwitchChange.bind(this)}/>
                    </div>


                </div>
            </div>
        )
    }
}

export default PetCenter;