import React from 'react'
import PageComponent  from '../../base/components/ListPage.jsx';
import WinAlert from '../../base/components/winAlert.jsx';

import {switchCoolDownIndex, getBgColorClass, canBreedWith} from '../../base/common.js'

import img2 from '../../../images/img0327/breed-2.png'


class Breed extends React.Component {
    constructor(props) {
        super(props)
        this.getDogInfo = this.getDogInfo.bind(this)
        this.getMyDogList = this.getMyDogList.bind(this)
        this.pageClick = this.pageClick.bind(this)
        this.mating = this.mating.bind(this)
        this.getDeliverFee = this.getDeliverFee.bind(this)

        this.state = {
            dog: {},
            userInfo: {},
            imgHost: '',
            
            // 配偶
            mate: {},

            // 接生手续费
            deliverFee: '',
            //自由繁殖0代狗抽取的费用
            gen0BreedProfit : '',
            // 当前区块
            currentBlockNum: 0,

            //分页
            indexList : '', //获取数据的存放数组
            totalNum:'',//总记录数
            totalData:{},
            current: 1, //当前页码
            pageSize: 8, //每页显示的条数
            goValue:'',
            totalPage:'',//总页数

            address: '',

        }
    }

    componentWillMount() {
        document.title = HD_lANG['petInfo-title1'][globalLang];

        let dogId = window.getUrlPar('id')
        this.getDogInfo(dogId)
        this.getDeliverFee()
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
                        userInfo: data.returnObj.userInfo,
                        imgHost: data.returnObj.imgHost,
                        address: data.returnObj.userInfo.address
                    })

                    _this.pageClick(1)
                }
            }
        })
    }

    // 获取我的所有狗狗
    getMyDogList(toPage, pageSize) {
        var _this = this;
        var dog = this.state.dog;
        // 可繁殖的狗狗
        $.ajax({
            url : api_host + "/dog/canSiringDogs",
            data :{
                walletAddress : defaultAccount,
                dogId: getUrlPar('id'),
                toPage: toPage,
                pageSize: pageSize
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                    _this.setState({
                        indexList: data.returnObj.allList,
                        currentBlockNum: data.returnObj.currentBlockNum,
                        totalNum : data.returnObj.total,
                        totalPage: totalPage,
                    })
                }
            }
        })
        return;
         // ------------------------------------------------------- haloudog --------------------------------------------------
        $.ajax({
            url : api_host + "/dog/myDogList",
            data :{
                walletAddress : defaultAccount,
                listType: 1,        // 空闲中
                toPage: toPage,
                pageSize: pageSize
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    let indexList = data.returnObj.allList;
                    // ---------------------------------------------
                    _this.setState({

                        currentBlockNum: data.returnObj.currentBlockNum,

                    })
                    var dogsAjax = [];
                    indexList.forEach((item) => {
                        dogsAjax.push(_this.getDogArrayListInfo(item.dogId))
                    });
                    $.when(...dogsAjax).done(function(){
                        // 获取所有狗狗信息
                        var _items = Array.prototype.slice.apply(arguments);
                        // 当请求只有一个时，参数和批量请求的格式不一样
                        if(Array.isArray(_items[0])){
                            indexList = _items.map(item => {
                                return item[0].returnObj.dog
                            });
                        }else{
                            indexList = [_items[0].returnObj.dog]
                        }
                        // 过滤近亲
                        indexList = indexList.map(item => {
                            let isBreed = canBreedWith({
                                mid: item.dogId,
                                sid: dog.dogId,
                                midMontherId: item.matronId,
                                midFatherId: item.sireId,
                                sidMontherId: dog.matronId,
                                sidFatherId: dog.sireId
                            });
                            // if(!isBreed){        // false 表示近亲，不可选
                            //     return false;
                            // }
                            item.isSwitch = isBreed
                            return item;
                        })
                        indexList = indexList.map(item => {
                            // 过滤繁殖冷却、变异、中奖
                            if(item.endBolckNumber > _this.state.currentBlockNum  || item.lotteryLevel != '0' || item.variation != '0' ){
                               
                                item.isSwitch = false
                            }
                            return item;
                        })
                        indexList = indexList.map(item => {
                            if(item.dogId == 0 || item.dogId == 1){
                                item.isSwitch = false
                            }
                            return item;
                        })
                        let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                        _this.setState({
                            indexList: indexList,
                            currentBlockNum: data.returnObj.currentBlockNum,
                            totalNum : data.returnObj.total,
                            totalPage: totalPage,
                        })
                    })
                    // ---------------------------------------------
                }
            }
        })
    }

    // 获取接生手续费
    getDeliverFee() {
        var _this = this;
        $.ajax({
            type: 'get',
            url : api_host + "/config",
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                _this.setState({
                    deliverFee: data.returnObj.autoBirthFee || '7500000000000000',
                    gen0BreedProfit : data.returnObj.gen0BreedProfit || '7500000000000000'
                })
            }
        })
    }
    // 获取狗狗详情
    getDogArrayListInfo(id){
        return $.ajax({
            type: 'get',
            url : api_host + "/dog/dogInfo",
            data :{
                dogId : id
            },
            dataType : "jsonp",
            jsonp:'callback',
        })
    }

    // 选择配偶
    selectMate(mate, event) {
        WinAlert.show(HD_lANG['winning26'][globalLang])
        this.setState({
            mate: mate
        })
    }
    // selectMate(mate, isSwitch, event) {
    //     let _this = this;
    //     if(!isSwitch) {
    //         return;
    //     }
    //     WinAlert.show('选择成功！')
    //     this.setState({
    //         mate: mate
    //     })
    // }

    // 获取当前价格
    getCurrentPrice(dogId, fn) {
        siringMetacoin.getCurrentPrice(dogId, function(error, result){
            if (!error){
                var price = result.toString()
                fn(price);
            }
        });
    }
    
    // 开始交配
    mating() {
        var _this = this;
        if(!this.state.mate.dogId) {
            WinAlert.show(HD_lANG['mating9'][globalLang])
            return;
        }
        // 交配。。。
        let dogId = getUrlPar('id');
        if(!this.state.deliverFee){
            console.log('deliverFee--error')
            return false;
        }
        if(this.state.address == defaultAccount){      // 我的两只交配
            let value = "";
            if( this.state.mate.generation != 0 ){
                value = parseInt(this.state.deliverFee) + parseInt(this.state.gen0BreedProfit);
            }else{
                value =  parseInt(this.state.deliverFee);
                //value =  web3.toWei('0.0075','ether')
            }
            dogMetacoin.breedWithAuto(this.state.mate.dogId, dogId, {gasPrice:defaultGasPrice,value: value, from: defaultAccount}, function (error,result) {
                if(!error){
                    localStorage.setItem("hash",result);
                    WinAlert.show(HD_lANG['alert3'][globalLang],function () {
                        setTimeout(()=>{
                            window.location.href = "/mydog/petCenter.html";
                        },500)
                    })
                }
            })

        }else{          // 和别人的狗交配
            this.getCurrentPrice(dogId, function(currentPrice) {
                currentPrice = Number(web3.fromWei(currentPrice)) + 0.0001;
                let _value = web3.toWei(currentPrice);
                if( _this.state.mate.generation != 0 ){
                    _value = parseInt(_value) + parseInt(_this.state.deliverFee)+parseInt(_this.state.gen0BreedProfit);
                }else{
                    _value = parseInt(_value) + parseInt(_this.state.deliverFee);
                }
                if(Number(web3.fromWei(_value)) > defaultAccountBalance) {
                    WinAlert.show(HD_lANG['alert2'][globalLang])
                    return;
                }
                dogMetacoin.bidOnSiringAuction(dogId, _this.state.mate.dogId, {gasPrice:defaultGasPrice,value: _value, from: defaultAccount}, function (error,result) {
                    if(!error){
                        localStorage.setItem("hash",result);
                        WinAlert.show(HD_lANG['alert3'][globalLang],function () {
                            setTimeout(()=>{
                                window.location.href = "/mydog/petCenter.html";
                            },500)
                        })
                    }
                })
            })
        }
    }

    //点击翻页
    pageClick(pageNum){
        let _this = this;
        if(pageNum != _this.state.current){
            _this.setState({
                current: pageNum
            })
        }
        _this.getMyDogList(pageNum, this.state.pageSize);
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

    render() {
        // 防止异步图片404
        if(!this.state.imgHost) {
            return null
        }
        let dog = this.state.dog;
        let imgUrl = this.state.imgHost + dog.genesStr + '.png';

        return (
            <div className="petMating">
                <div className={'banner item-bd-' + getBgColorClass(dog.genesStr, 7)}></div>

                <div className="mating-lay">
                    <div className="wrap">
                        <h5 className="tit">{HD_lANG['mating1'][globalLang]}</h5>

                        <div className="parents clearfix">
                            <div className="cell left-cell">
                                <div className={"pic pic-left vertical item-bd-" + getBgColorClass(dog.genesStr, 7)}>
                                    <img src={imgUrl} alt="pet"/>
                                </div>
                                <div className="info">
                                    HelloDog#{dog.dogName}<i className={this.state.dog.generation == 0 ? "isGen0" : ""}>{dog.generation}{HD_lANG['mating2'][globalLang]}</i><i>{switchCoolDownIndex(dog.coolDownIndex)}</i>
                                </div>
                            </div>
                            {
                                this.state.mate.dogId ? (
                                    <div className="cell right-cell">
                                        <div className={"pic pic-right vertical item-bd-" + getBgColorClass(this.state.mate.genesStr, 7)}>
                                            <img src={this.state.imgHost + this.state.mate.genesStr + '.png'} alt="pet"/>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="info">
                                            HelloDog#{this.state.mate.dogName}<i className={this.state.dog.generation == 0 ? "isGen0" : ""}>{this.state.mate.generation}{HD_lANG['mating2'][globalLang]}</i><i>{switchCoolDownIndex(this.state.mate.coolDownIndex)}</i>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="cell right-cell">
                                        <div className={"pic pic-right vertical item-bd-" + getBgColorClass(this.state.mate.genesStr, 7)}>
                                            {HD_lANG['mating7'][globalLang]}
                                            {/* <img src={img} alt="pet"/> */}
                                        </div>
                                        <div className="clearfix"></div>
                                        {/* <div className="info">
                                            HelloDog#128913<i>4{HD_lANG['mating2'][globalLang]}</i><i>{HD_lANG['petInfo4-2'][globalLang]}</i>
                                        </div> */}
                                    </div>
                                )
                            }
                            
                        </div>

                        <div className="hint">{HD_lANG['mating3'][globalLang]}</div>

                        <div className="pets">
                            <div className="tit">
                                <h6>{HD_lANG['mating4'][globalLang]}</h6>
                                <div className="sub">{HD_lANG['mating5'][globalLang]}</div>
                            </div>
                            {
                                this.state.indexList ? (
                                    <ul className="list clearfix" >
                                        {
                                            this.state.indexList.map((item, index) => (
                                                <li key={item.dogId} onClick={this.selectMate.bind(this, item)}>
                                                    <div className={'vertical pic item-bd-' + getBgColorClass(item.genesStr, 7)} >
                                                        <img src={this.state.imgHost + item.genesStr + '.png'} alt="pet"/>
                                                    </div>
                                                    <div className="info">HelloDog#{item.dogName}<i>{item.generation}{HD_lANG['mating2'][globalLang]}</i><i>{switchCoolDownIndex(item.coolDownIndex)}</i></div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ) : <div className="empty">{HD_lANG['mating8'][globalLang]}</div>
                            }
                            
                            
                            <PageComponent total={this.state.totalNum}
                                       current={this.state.current}
                                       totalPage={this.state.totalPage}
                                       goValue={this.state.goValue}
                                       pageClick={this.pageClick.bind(this)}
                                       goPrev={this.goPrevClick.bind(this)}
                                       goNext={this.goNext.bind(this)}
                                       switchChange={this.goSwitchChange.bind(this)}/>

                            <div className="btn-wrap">
                                <div className="btn" onClick={this.mating}>{HD_lANG['mating6'][globalLang]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}   

export default Breed