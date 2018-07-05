import React from 'react'
import WinAlert from '../../base/components/winAlert.jsx';

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

import {switchCoolDownIndex, getBgColorClass} from '../../base/common.js'

import img2 from '../../../images/img0327/sum-pets-pic.png'
import img3 from '../../../images/img0327/master-head.png'
import img4 from '../../../images/img0327/pet-gem.png'

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

// banner
function Banner(props) {
    var status = '';

    let differBlock = Number(props.dog.endBolckNumber)-Number(props.currentBlock);

    if(props.dog.status == 0){
        if(differBlock > 0 ){
            status = HD_lANG['list14-0'][globalLang];
        }else{
            status = ''
        }

    }
    if(props.dog.status == 1){
        status = HD_lANG['petCenter23'][globalLang];
    }
    if(props.dog.status == 2){
        status = HD_lANG['list14-2'][globalLang];
    }
    if(props.dog.status == 3){
        status = HD_lANG['list14-3'][globalLang];
    }

    return (
        <div className={'banner item-bd-' + getBgColorClass(props.dog.genesStr, 7)}>
            <div className="wrap">
                {/*<a href="/list/list.html" className="ban-top pet-bazaar">{HD_lANG['petInfo1'][globalLang]}</a>*/}

                {!status || !props.currentBlock ? "" :
                <div className={"ban-top pet-status status-" + (differBlock > 0 ? "00" : props.dog.status)}>
                    {status + getCoolTime(Number(props.dog.endBolckNumber) - Number(props.currentBlock))}
                </div>
                }
                {/* <a href="#" className="pet-share"></a> */}
                <div className={props.dog.dogId == 0 || props.dog.dogId == 1 ? 'cnt special-cnt' : 'cnt'}>
                    <div className="pic">
                        {props.imgUrl && <img src={props.dog.variation == 0 ? props.imgUrl : "http://www.haloudog.com/img/otherdog/variation.png"} alt="pet"/>}
                    </div>
                    {
                        props.dog.startPrice != 0 ? (
                            <div className="price">
                                {HD_lANG['petInfo2'][globalLang]}：<span>{props.currentPrice}</span>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    )

}

// 按钮
class ButtonActive extends React.Component {
    constructor(props) {
        super(props);
        this.saleCancel = this.saleCancel.bind(this)
        this.breedCancel = this.breedCancel.bind(this)
    }

    // 未登陆则跳转
    redirect(event) {
        if(!this.props.state.email || !this.props.state.nickName){
            event.preventDefault();
            window.location.href= "/account/info.html";
        }
    }
    
    // 阻止购买或繁殖的下一步
    preventNext(lotteryLevel, event){
        this.redirect(event)
        if(lotteryLevel > 0){
            WinAlert.show(HD_lANG['alert4'][globalLang])
            event.preventDefault()
            return;
        }
    }
    
    // 取消出售 
    saleCancel() {
        let dogId = getUrlPar('id');
        buyDogMeta.cancelAuction(dogId, {gasPrice:web3.toWei("1",'Gwei'),from: defaultAccount},function(error, result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.href = "/mydog/petCenter.html";
                    },500)
                })
            }
        })
    }

    // 取消租借
    breedCancel() {
        let dogId = getUrlPar('id');
        siringMetacoin.cancelAuction(dogId, {gasPrice:web3.toWei("1",'Gwei'),from: defaultAccount},function(error, result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.href = "/mydog/petCenter.html";
                    },500)
                })
            }
        })
    }
    
    // 接生
    giveBirth() {
        let dogId = getUrlPar('id');
        dogMetacoin.giveBirth(dogId, {gasPrice: defaultGasPrice, gas: 210000, from: defaultAccount},function(error, result) {
            if(!error){
                localStorage.setItem("hash",result);
                WinAlert.show(HD_lANG['alert1'][globalLang], function() {
                    setTimeout(()=>{
                        window.location.href = "/mydog/petCenter.html";
                    },500)
                })
            }
        })
    }

    render() {
        // 是否是我的狗狗
        let isMyDog = this.props.state.userInfo.address.toLowerCase() == defaultAccount.toLowerCase() ? true : false;
        let id = this.props.state.dog.dogId;
        let status = this.props.state.dog.status;
        let lotteryLevel = this.props.state.dog.lotteryLevel;
    
        if(isMyDog){        // 我的狗
            let differBlock = Number(this.props.state.dog.endBolckNumber)-Number(this.props.state.currentBlock);
            if(this.props.state.dog.dogId == 0 || this.props.state.dog.dogId == 1){
                return null;
            }
            if(this.props.state.dog.variation !=0 ){ //变异
                return null;
            }
            if(status == '0' && lotteryLevel == '0'){      //空闲
                if(differBlock > 0) {
                    return null;
                }
                return (
                    <div>
                        {/* 寄售 */}
                        <a href={"/list/saleIng.html?id=" + id + '&action=1'} className="link">{HD_lANG['petInfo6-3'][globalLang]}</a>
                        {/* 租借 */}
                        <a href={"/list/saleIng.html?id=" + id + '&action=2'} className="link">{HD_lANG['petInfo6-2'][globalLang]}</a>
                        {/* 虚拟交配 */}
                        {/* <a href={"/mydog/mating.html?id=" + id} className="link link-sty2">{HD_lANG['petInfo5'][globalLang]}</a> */}
                    </div>
                )
            }
            if(status == '1'){     // 1、出售中
                // 取消寄售
                return <a href="javascript:;" className="link" onClick={this.saleCancel}>{HD_lANG['petInfo6-4'][globalLang]}</a>
            }
            if(status == '2'){     // 2、上架出租（租借）
                // 取消租借
                return <a href="javascript:;" className="link" onClick={this.breedCancel}>{HD_lANG['petInfo6-5'][globalLang]}</a>
            }
            if(status == '3'){     // 3、怀孕中（接生）
                /*if(differBlock > 0) {
                    return <a href="javascript:;" className="link disabled">接生</a>
                }
                return <a href="javascript:;" className="link" onClick={this.giveBirth.bind(this)}>接生</a>*/
            }
            return null;
        }else{                  // 别人的狗
            if(status == '1'){      // 出售中
                // 购买
                return <a href={"/list/buying.html?id=" + id + '&curretP=' + this.props.currentPrice} className="link" onClick={this.preventNext.bind(this, lotteryLevel)}>{HD_lANG['petInfo6-1'][globalLang]}</a>
            }
            if(status == '2' && this.props.state.dog.dogId != 0 && this.props.state.dog.dogId != 1) {
                // 虚拟交配
                return <a href={"/mydog/mating.html?id=" + id + '&curretP=' + this.props.currentPrice} className="link link-sty2" onClick={this.preventNext.bind(this, lotteryLevel)}>{HD_lANG['petInfo5'][globalLang]}</a>
            }
            return null;
        }
    }
}

class PetInfo extends React.Component {
    constructor(props) {
        super(props);

        this.chartInit = this.chartInit.bind(this)
        this.getDogInfo = this.getDogInfo.bind(this)
        this.getMyInfo = this.getMyInfo.bind(this)
        
        this.state = {
            dog: {},
            dogFather: {},
            dogMather: {},
            dogGgen0: {},
            userInfo: {},
            currentPrice: 0,
            currentBlock: 0,

            email: '',
            nickName: '',

            imgHost: '',
        }
    }

    componentWillMount() {
        document.title = HD_lANG['petInfo-title'][globalLang];
        let dogId = window.getUrlPar('id');

        this.getDogInfo(dogId);
        this.getMyInfo();
    }

    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url : api_host + "/dog/dogInfo",
            data :{
                dogId : dogId
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    _this.setState({
                        dog: data.returnObj.dog,
                        dogFather: data.returnObj.dogFather,
                        dogMather: data.returnObj.dogMather,
                        dogGgen0: data.returnObj.dogGgen0,
                        userInfo: data.returnObj.userInfo,
                        imgHost: data.returnObj.imgHost,
                    })
                    _this.getCurrentPrice(_this.chartInit);
                }
            }
        })
    }

    // 计算当前价格
    getCurrentPrice(fn) {
        let _this = this;
        let startPrice = parseFloat(this.state.dog.startPrice)  // 开始价格
        let endPrice = parseFloat(this.state.dog.endPrice)      // 结束价格
        let eventBlockNumber = this.state.dog.eventBlockNumber  // 结束区块
        let duration = this.state.dog.duration      // 剩余时间
        let currentBlock = 0;                   // 当前区块
        web3.eth.getBlockNumber(function(err, res) {
            if(!err){
                currentBlock = parseInt(res)
                let ratio = ((currentBlock - eventBlockNumber) * 15)/duration >=1 ? 1 : ((currentBlock - eventBlockNumber) * 15)/duration;
                let _currentPrice = (endPrice - startPrice) * ratio + startPrice;
                
                _this.setState({
                    currentPrice: _currentPrice,
                    currentBlock: currentBlock
                })
                fn()
            }
        })
    }

    chartInit() {
        var _this = this;
        // 基于准备好的dom，初始化echarts实例
        var domObj = document.getElementById('chart');
        if(!domObj){
            return;
        }
        var myChart = echarts.init(domObj);
        var _startPrice = _this.state.dog.startPrice;
        var _endPrice = _this.state.dog.endPrice;
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '',
                left: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c}eth'
            },
            legend: {
                // left: 'left',
                // data: ['2的指数', '3的指数']
            },
            xAxis: {
                // name: 'x',
                type: 'category',
                splitLine: {show: false},
                // boundaryGap : false,
                data: [HD_lANG['petInfo8'][globalLang], HD_lANG['petInfo9'][globalLang], HD_lANG['petInfo10'][globalLang]],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                splitNumber: 3,
                max: function(value) {
                    return parseInt(value.max*1.5*100000000)/100000000
                },
                type: 'value',
            },
            series: [
                {
                    name: '',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            // borderWidth: 3,
                            lineStyle: {
                                width: 4,
                                color: '#F87575'
                            }
                        }
                    },
                    data: [_startPrice, _this.state.currentPrice, _endPrice],
                },
            ]
        };
        myChart.setOption(option);
    }

    // 获取个人信息
    getMyInfo() {
        var _this = this;
        $.ajax({
            url : api_host + "/user/userInfo",
            data :{
                walletAddress : defaultAccount
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000' && data.returnObj){
                    _this.setState({
                        email: data.returnObj.email,
                        nickName: data.returnObj.nickName,
                    })
                }
            }
        })
    }
    
    render() {
        // 防止异步图片404
        if(!this.state.imgHost) {
            return null
        }
        let dog = this.state.dog;
        let coolDownIndex = dog.coolDownIndex;
        let coolGeneration= dog.generation
        let startPrice = dog.startPrice;
        let endPrice = dog.endPrice;
        let imgUrl = this.state.imgHost + dog.genesStr + '.png';
        let currentPrice = parseInt(this.state.currentPrice*10000)/10000;
        return (
            <div className="petInfo">
                <Banner imgUrl={imgUrl}  currentPrice={currentPrice} currentBlock={this.state.currentBlock} dog={dog} />
                
                <div className="pet-attr">
                    <div className="row row-sum clearfix">
                        <div className="master">
                            <div className="pic">
                                <img src={img3} alt="master"/>
                            </div>
                            <div className="txt">
                                <div className="name">{this.state.userInfo.nickName}</div>
                                <div className="sub">{HD_lANG['petInfo13'][globalLang]}</div>
                            </div>
                        </div>
                        {dog.dogId == 0 || dog.dogId == 1 ?
                                <div className="tit" style={{color:'#ffc600'}}>{HD_lANG['list20'][globalLang]}</div>
                            :
                            <div className="tit">{this.state.dog.dogName}</div>
                        }

                        <div className="tit-sub">
                            {dog.dogId == 0 || dog.dogId == 1 ? (
                                <span style={{color:'#ffc600'}}>{dog.dogId == 0 || dog.dogId == 1 ? HD_lANG['list20'][globalLang] : this.state.dog.dogName}</span>
                            ) : (
                                <span>
                                    <span>{dog.dogId == 0 || dog.dogId == 1 ? HD_lANG['list20'][globalLang] : this.state.dog.dogName}</span>
                                    <span>ID{dog.dogId}</span>
                                    <span className={this.state.dog.generation == 0 ? "isGen0" : ""}>{this.state.dog.generation}{HD_lANG['petInfo3'][globalLang]}</span>
                                    <span>{HD_lANG['petInfo15'][globalLang]}</span>
                                    <span>{switchCoolDownIndex(coolDownIndex)}</span>
                                    <span className="rest">
                                        {HD_lANG['petInfo4'][globalLang]}<i className="icon-hint"></i>
                                    </span>

                                    <div className="hint-box">
                                        <div className="hint-tit">{HD_lANG['petInfo4'][globalLang]}</div>
                                        <div className="hint-txt">{HD_lANG['petInfo4-1'][globalLang]}</div>
                                        <ul className="hint-list">
                                            <li className={(coolDownIndex ==0) ? 'active' : ''}>{HD_lANG['petInfo4-2'][globalLang]}:<em className="time">1{HD_lANG['petInfo4-10'][globalLang]}</em></li>
                                            <li className={(coolDownIndex ==1 || coolDownIndex==2) ? 'active' : ''}>{HD_lANG['petInfo4-3'][globalLang]}:<em className="time">2{HD_lANG['petInfo4-10'][globalLang]} - 5{HD_lANG['petInfo4-10'][globalLang]}</em></li>
                                            <li className={(coolDownIndex ==3 || coolDownIndex==4) ? 'active' : ''}>{HD_lANG['petInfo4-4'][globalLang]}:<em className="time">10{HD_lANG['petInfo4-10'][globalLang]} - 30{HD_lANG['petInfo4-10'][globalLang]}</em></li>
                                            <li className={(coolDownIndex ==5 || coolDownIndex==6) ? 'active' : ''}>{HD_lANG['petInfo4-5'][globalLang]}:<em className="time">1{HD_lANG['petInfo4-11'][globalLang]} - 2{HD_lANG['petInfo4-11'][globalLang]}</em></li>
                                            <li className={(coolDownIndex ==7 || coolDownIndex==8) ? 'active' : ''}>{HD_lANG['petInfo4-6'][globalLang]}:<em className="time">4{HD_lANG['petInfo4-11'][globalLang]} - 8{HD_lANG['petInfo4-11'][globalLang]}</em></li>
                                            <li className={(coolDownIndex ==9 || coolDownIndex==10) ? 'active' : ''}>{HD_lANG['petInfo4-7'][globalLang]}:<em className="time">16{HD_lANG['petInfo4-11'][globalLang]} - 24{HD_lANG['petInfo4-11'][globalLang]}</em></li>
                                            <li className={(coolDownIndex ==11 || coolDownIndex==12) ? 'active' : ''}>{HD_lANG['petInfo4-8'][globalLang]}:<em className="time">2{HD_lANG['petInfo4-12'][globalLang]} - 3{HD_lANG['petInfo4-12'][globalLang]}</em></li>
                                            <li className={(coolDownIndex >=13) ? 'active' : ''}>{HD_lANG['petInfo4-9'][globalLang]}:<em className="time">5{HD_lANG['petInfo4-12'][globalLang]}</em></li>
                                        </ul>
                                    </div>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="row row-chart">
                        <div className="handle clearfix">
                            <div className="btn-wrap">
                                <ButtonActive state={this.state} currentPrice={currentPrice}></ButtonActive>
                            </div>
                            {startPrice != '0' && <div className="sub-tit">{HD_lANG['petInfo7'][globalLang]}</div>}
                            {startPrice != '0' && <div className="price">{currentPrice}</div>}
                        </div>

                        {startPrice != '0' && (
                            <div className="chart-wrap">
                                <div id="chart" className="chart"></div>
                                <div className="price-trend clearfix">
                                    <div className="left fl">
                                        {HD_lANG['petInfo8'][globalLang]}：<span className="price">{startPrice}</span>
                                    </div>
                                    <div className="right fr">
                                        {HD_lANG['petInfo10'][globalLang]}：<span className="price">{endPrice}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> 
                    
                    {/* getBgColorClass */}
                    {/*判断创世狗不显示宝石属性*/}
                    {this.state.dog.genesStr.charAt(1) == 0 && this.state.dog.genesStr.charAt(2) == 0 ? "":
                    <div className="row row-gem">
                        <div className="tit">{this.state.dog.variation == 0 ? HD_lANG['petInfo11'][globalLang] :  HD_lANG['petInfo11-0'][globalLang]}</div>
                        {this.state.dog.variation == 0 ?

                            <ul className="list">
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(0),16)}><img src={api_img_host + 'img/gem/1/' +getBgColorClass(this.state.dog.genesStr, 0) + '.png'} alt="gem"/></li>
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(1),16)}><img src={api_img_host + 'img/gem/2/' +getBgColorClass(this.state.dog.genesStr, 1) + '.png'} alt="gem"/></li>
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(2),16)}><img src={api_img_host + 'img/gem/3/' +getBgColorClass(this.state.dog.genesStr, 2) + '.png'} alt="gem"/></li>
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(3),16)}><img src={api_img_host + 'img/gem/4/' +getBgColorClass(this.state.dog.genesStr, 3) + '.png'} alt="gem"/></li>
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(4),16)}><img src={api_img_host + 'img/gem/5/' +getBgColorClass(this.state.dog.genesStr, 4) + '.png'} alt="gem"/></li>
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(5),16)}><img src={api_img_host + 'img/gem/6/' +getBgColorClass(this.state.dog.genesStr, 5) + '.png'} alt="gem"/></li>
                                <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(6),16)}><img src={api_img_host + 'img/gem/7/' +getBgColorClass(this.state.dog.genesStr, 6) + '.png'} alt="gem"/></li>
                            </ul>
                               
                        :
                        <p className="variation-text">{HD_lANG['petInfo17'][globalLang]}</p>
                        }
                    </div>
                        }

                    {/* <div className="row row-intro">
                        <div className="tit">介绍</div>
                        <div className="txt">
                            身材标准，无需运动！告诉我你想要什么，我也许可以满足你的感觉。自己吃的好饱有时候我会产生“哔”。看！我总是有突兀的一面！我的步伐已然无声。每当我出现的时候，天空必落红雨，地面必现异相，然后……就没有然后了。咳咳，看我的无敌小圈圈。
                        </div>
                    </div> */}

                    {
                        dog.generation == '0' ? null 
                        : <div className="row row-family">
                            <div className="tit">0{HD_lANG['petInfo3'][globalLang]}</div>
                            <ul className="list">
                                <li className={'vertical item-bd-' + getBgColorClass(this.state.dogGgen0.genesStr, 7)}>
                                    <a href={"/list/detail.html?id=" + this.state.dogGgen0.dogId}>
                                        <img src={this.state.imgHost + this.state.dogGgen0.genesStr + '.png'} alt="pet"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    }

                    {
                        dog.generation == '0' ? null
                        : <div className="row row-family">
                            <div className="tit">{HD_lANG['petInfo12'][globalLang]}</div>
                            <ul className="list">
                                <li className={'vertical item-bd-' + getBgColorClass(this.state.dogFather.genesStr, 7)}>
                                    <a href={"/list/detail.html?id=" + this.state.dogFather.dogId}><img src={this.state.imgHost + this.state.dogFather.genesStr + '.png'} alt="pet"/></a>
                                </li>
                                <li className={'vertical item-bd-' + getBgColorClass(this.state.dogMather.genesStr, 7)}>
                                    <a href={"/list/detail.html?id=" + this.state.dogMather.dogId}><img src={this.state.imgHost + this.state.dogMather.genesStr + '.png'} alt="pet"/></a>
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        )
    }
}   

export default PetInfo