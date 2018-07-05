import React from 'react';
import common from '../../common.js'
import tPopBox  from '../../transactionPop.js'
import winAlert  from '../../winAlert.js'

import img2 from '../../../images/master-portrait.png';
common.getNonceVal();
// 按钮
class ButtonActive extends React.Component {
    constructor(props) {
        super(props);
        this.saleCancel = this.saleCancel.bind(this)
        this.breedCancel = this.breedCancel.bind(this)
    }
    componentDidMount() {
        common.setPageTitle(HD_lANG['petInfo-title'][globalLang])
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    // 未登陆则跳转
    redirect(event) {
        var _this = this;
        if(walletIsUnLock == 0){
            event.preventDefault();
            winAlert.show(HD_lANG['alert21'][globalLang], function() {
                _this.pushMethod('/mobile/wallet/myWallet.html', event)
            })
            return false;
        }
        if(!this.props.state.email || !this.props.state.nickName){
            event.preventDefault();
            this.pushMethod('/mobile/myself/setting.html', event);
            return false;
        }
        return true;
    }
    // 拦截操作
    preventNext(lotteryLevel, event){
        if(!this.redirect(event)){
            return false;
        }
        if(lotteryLevel > 0){
            winAlert.show(HD_lANG['alert4'][globalLang])
            event.preventDefault()
            return;
        }
        // 提交
        this.buy();
    }
    
    // 取消出售 
    saleCancel(event) {
        this.redirect(event)
        var _this = this;
        let dogId = common.getUrlPar('dogId');
        common.loading();
        buyDogMeta.methods.cancelAuction(dogId).estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['petInfo6-4'][globalLang],
                address: _address,
                gasLimit: gasLimit + 500,
                btnText: HD_lANG['petCenter20'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                buyDogMeta.methods.cancelAuction(dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                    common.removeLoading();
                    if(!error){
                        try{
                            common.setHashVal(result)
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang], function() {
                            common.popRootPage()
                        })
                    }else{
                        winAlert.show(HD_lANG['alert5'][globalLang])
                    }
                })
            });
        }).catch(function(error) {
            common.removeLoading();
            winAlert.show(HD_lANG['alert5'][globalLang], function() {
                window.location.reload()
            })
        })
    }

    // 取消租借
    breedCancel(event) {
        this.redirect(event)
        let _this = this;
        let dogId = common.getUrlPar('dogId');
        common.loading();
        siringMetacoin.methods.cancelAuction(dogId).estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['petInfo6-5'][globalLang],
                address: _address2,
                gasLimit: gasLimit + 500,
                btnText: HD_lANG['petCenter20'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                siringMetacoin.methods.cancelAuction(dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                    common.removeLoading();
                    if(!error){
                        try{
                            common.setHashVal(result)
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang], function() {
                            common.popRootPage()
                        })
                    }else{
                        winAlert.show(HD_lANG['alert5'][globalLang])
                    }
                })
            });
        }).catch(function(error) {
            common.removeLoading();
            winAlert.show(HD_lANG['alert5'][globalLang], function() {
                window.location.reload()
            })
        })
    }
    
    // 接生
    giveBirth(event) {
        this.redirect(event)
        let _this = this;
        let dogId = common.getUrlPar('dogId');
        common.loading();
        dogMetacoin.methods.giveBirth(dogId).estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['petCenter26'][globalLang],
                address: address,
                gasLimit: gasLimit * 1.5,
                btnText: HD_lANG['petCenter20'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                dogMetacoin.methods.giveBirth(dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit * 1.5}, function(error, result) {
                    common.removeLoading();
                    if(!error) {
                        console.log(result);
                        try{
                            common.setHashVal(result)
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang], function() {
                            common.popRootPage()
                        })
                    }else{
                        winAlert.show(HD_lANG['alert5'][globalLang])
                    }
                })
            });
        }).catch(function(error) {
            common.removeLoading();
            winAlert.show(HD_lANG['alert5'][globalLang], function() {
                window.location.reload()
            })
        })
    }

    // 购买
    buy() {
        var _this = this;
        var dogId = common.getUrlPar('dogId');

        common.loading();
        buyDogMeta.methods.getCurrentPrice(dogId).call().then(function(res) {
            var price = Number(web3.utils.fromWei(res.toString())) + 0.0005;
            if(price > defaultAccountBalance) {
                common.removeLoading();
                winAlert.show(HD_lANG['alert2'][globalLang])
                return;
            }
            price = price.toString();
            
            dogMetacoin.methods.bidOnSaleAuction(dogId).estimateGas({from: defaultAccount, value: web3.utils.toWei(price)}).then(function(gasLimit) {
                common.removeLoading();
                tPopBox.show({
                    title: HD_lANG['petInfo6-1'][globalLang],
                    address: address,
                    price: price,
                    transText: HD_lANG['petInfo6-6'][globalLang],
                    gasLimit: gasLimit + 500,
                    btnText: HD_lANG['petCenter20'][globalLang]
                }, function(toAddress, gasPrice) {
                    common.loading();
                    dogMetacoin.methods.bidOnSaleAuction(dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ), gasPrice:gasPrice, gas: gasLimit + 500, value: web3.utils.toWei(price.toString()), from: defaultAccount}, function(error, result) {
                        common.removeLoading();
                        if(!error) {

                            try{
                                common.setHashVal(result)
                                common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                            }catch (e){
                                localStorage.setItem("hash",result);
                            }
                            winAlert.show(HD_lANG['alert1'][globalLang], function() {
                                common.popRootPage()
                            })
                        }else{

                            winAlert.show(HD_lANG['alert5'][globalLang])
                        }
                    })
                });
            }).catch(function(error) {
                common.removeLoading();
                winAlert.show(HD_lANG['alert5'][globalLang], function() {
                    window.location.reload()
                })
            })
        }).catch(function(error){
            common.removeLoading();
            winAlert.show(HD_lANG['alert5'][globalLang], function() {
                window.location.reload()
            })
        })
        
    }

    // 转赠
    present(event) {
        event.preventDefault();
        var _this = this;
        let dogId = common.getUrlPar('dogId');
        // 赠送

        tPopBox.show({
            title: HD_lANG['petCenter10'][globalLang],
            toAddress: '123',
            gasLimit: '310000',
            btnText: HD_lANG['petCenter20'][globalLang]
        }, function(toAddress,gasPrice) {
            if(!web3.utils.isAddress(toAddress)){
                winAlert.show(HD_lANG['alert6'][globalLang]);
                return;
            }
            common.loading();
            dogMetacoin.methods.transfer(toAddress, dogId).estimateGas({from: defaultAccount}).then(function(gasLimit) {
                dogMetacoin.methods.transfer(toAddress, dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                    common.removeLoading();
                    if(!error) {
                        console.log(result);
                        try{
                            common.setHashVal(result)
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang], function() {
                            common.popRootPage()
                            // window.location.href = "/mobile/myDog/myDog.html";
                        })
                    }else{
                        winAlert.show(HD_lANG['alert5'][globalLang])
                    }
                })
            }).catch(function(error) {
                common.removeLoading();
                winAlert.show(HD_lANG['alert5'][globalLang], function() {
                    window.location.reload()
                })
            })
        });
      
    }

    // 兑奖


    render() {
        // 是否是我的狗狗
        let isMyDog = this.props.isMyDog;
        let dogId = this.props.state.dog.dogId;
        let status = this.props.state.dog.status;
        let lotteryLevel = this.props.state.dog.lotteryLevel;
        
        if(isMyDog){        // 我的狗
            let differBlock = Number(this.props.state.dog.endBolckNumber)-Number(this.props.state.currentBlock);
            if(this.props.state.dog.dogId == 0 || this.props.state.dog.dogId == 1){     //创世狗
                return null;
            }
            if(this.props.state.dog.variation !=0 ){ //变异
                return null;
            }
            if(differBlock > 0 && lotteryLevel == '0') {   //繁殖冷却中且未中奖
                return null;
            }
            if(status == '0'){  //空闲
                return (
                    <div>
                        {/* 赠送 */}
                        <a href="javascript:;" className="btn-def" onClick={this.present.bind(this)}><span className="icon-present">{HD_lANG['petCenter10'][globalLang]}</span></a>
                        {/* 寄售 */}
                        <a href={"/mobile/index/saleIng.html?dogId=" + dogId} onClick={this.pushMethod.bind(this, "/mobile/index/saleIng.html?dogId=" + dogId)} className="btn-def"><span className="icon-tag">{HD_lANG['list0'][globalLang]}</span></a>
                        {/* 繁殖 */}
                        <a href={"/mobile/index/breed.html?dogId=" + dogId} onClick={this.pushMethod.bind(this, "/mobile/index/breed.html?dogId=" + dogId)} className="btn-def"><span className="icon-leaf2">{HD_lANG['petInfo6-2'][globalLang]}</span></a>
                        {/* 兑奖 */}
                        {lotteryLevel > 0 && <a href={"/mobile/index/winning.html?dogId=" + dogId} onClick={this.pushMethod.bind(this, "/mobile/index/winning.html?dogId=" + dogId)} className="btn-def"><span className="icon-reward">{HD_lANG['petCenter14'][globalLang]}</span></a>}
                    </div>
                )
            }
            if(status == '1'){     // 1、出售中
                // 取消寄售
                return <a href="javascript:;" className="btn-def" onClick={this.saleCancel}><span className="icon-tag">{HD_lANG['petInfo6-4'][globalLang]}</span></a>
            }
            if(status == '2'){     // 2、上架出租（租借）
                // 取消租借
                return <a href="javascript:;" className="btn-def" onClick={this.breedCancel}><span className="icon-leaf2">{HD_lANG['petInfo6-5'][globalLang]}</span></a>
            }
            if(status == '3'){     // 3、怀孕中（接生）
                return (
                    <div>
                        {/* <a href="javascript:;" className="btn-def" onClick={this.giveBirth.bind(this)}><span className="icon-tag">{HD_lANG['petCenter26'][globalLang]}</span></a> */}
                        {lotteryLevel > 0 && <a href={"/mobile/index/winning.html?dogId=" + dogId} onClick={this.pushMethod.bind(this, "/mobile/index/winning.html?dogId=" + dogId)} className="btn-def"><span className="icon-reward">{HD_lANG['petCenter14'][globalLang]}</span></a>}
                    </div>
                )
            }
            return null;
        }else{                      // 别人的狗
            if(status == '1'){      // 出售中
                // 购买
                return <div className="btn-def btn-sty2" onClick={this.preventNext.bind(this, lotteryLevel)}>{HD_lANG['petInfo6-1'][globalLang]}</div>
            }
            if(status == '2' && this.props.state.dog.dogId != 0 && this.props.state.dog.dogId != 1) {
                // 虚拟交配
                return <a href={"/mobile/index/mating.html?dogId=" + dogId} className="btn-def btn-sty2" onClick={this.pushMethod.bind(this, "/mobile/index/mating.html?dogId=" + dogId)}>{HD_lANG['petCenter11'][globalLang]}</a>
            }
            return null;
        }
    }
}

class Detail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dog: {},
            dogFather: {},
            dogMather: {},
            dogGgen0: {},
            userInfo: {},
            imgHost: '',
            likeNumber: {},
            currentPrice: 0,
            currentBlock: 0,

            //个人信息
            email: '',
            nickName: '',

            // 编辑狗狗名字
            isEdit: false,

            //狗狗名字
            dogName: '',
        }

        this.getCurrentPrice = this.getCurrentPrice.bind(this)
        this.changeDogName = this.changeDogName.bind(this)
    }
    componentWillMount() {
        let dogId = common.getUrlPar('dogId');
        this.getDogInfo(dogId);
        this.getMyInfo();
        

    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $http("/dog/dogInfo", {
            dogId : dogId
        }).then(function(data) {
            if(data.code == '0000' && data.returnObj){
                _this.setState({
                    dog: data.returnObj.dog,
                    dogFather: data.returnObj.dogFather,
                    dogMather: data.returnObj.dogMather,
                    dogGgen0: data.returnObj.dogGgen0,
                    userInfo: data.returnObj.userInfo,
                    imgHost: data.returnObj.imgHost,
                    likeNumber: data.returnObj.likeNumber,
                    dogName: data.returnObj.dog.dogName,
                })
                _this.getCurrentPrice()
            }
        })
    }
    // 获取个人信息
    getMyInfo() {
        var _this = this;
        $http("/user/userInfo", {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' && data.returnObj){
                _this.setState({
                    email: data.returnObj.email,
                    nickName: data.returnObj.nickName,
                })
            }
        })
    }
    addVote(dogId, event){
        if(!window.defaultAccount){
            winAlert.show(HD_lANG['alert22'][globalLang]);
            return false;
        }
        var _val = event.target.innerText;
        _val = Number(_val);
        var _obj = $(event.target);
        $http('/dog/thumbsUp', {
            dogId: dogId,
            walletAddress: window.defaultAccount
        }).then(function(data) {
            if(data.code = "0000") {
                _obj.text(HD_lANG['list22'][globalLang] + ' ' + data.returnObj.thumbsUp)
            }
        })
    }
    // 计算当前价格
    getCurrentPrice() {
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
                    currentPrice: parseInt(_currentPrice*100000)/100000,
                    currentBlock: currentBlock
                })
            }
        })
    }

    // 切换宠物昵称编辑状态
    changePetEdit(dogId, event) {
        event.persist();
        var _this = this;
        var dogName = this.state.dogName.trim();
        // if(!dogName){
        //     winAlert.show(HD_lANG['winning15'][globalLang])
        //     return;
        // }
        // // 汉字算2字节
        // if(dogName.replace(/[^\x00-\xff]/g,"aa").length > 7){
        //     winAlert.show(HD_lANG['winning16'][globalLang])
        //     return;
        // }
        this.setState(function(prevState, props) {
            return {
                isEdit: !prevState.isEdit
            }
        }, function() {
            var _inputDom = _this.refs.petEdit;
            if(_inputDom){
                _inputDom.focus();
            }else{
                _this.updateDogInfo(dogId, dogName)
            }
        })
    }

    // 修改狗狗名字
    updateDogInfo(dogId, dogName) {
        dogName = dogName.trim();
        if(!dogName){
            this.setState({
                dogName: this.state.dog.dogName
            })
            winAlert.show(HD_lANG['winning15'][globalLang])
            return;
        }
        // 汉字算2字节
        if(dogName.replace(/[^\x00-\xff]/g,"aa").length > 6){
            winAlert.show(HD_lANG['winning16'][globalLang])
            return;
        }
        $http('/dog/updateDogInfo', {
            walletAddress : defaultAccount,
            dogId : dogId,
            dogName: dogName
        }).then(function(data) {
            if(data.code == '0000'){
                winAlert.show(HD_lANG['alert8'][globalLang])
            }
        })
    }
    changeDogName(event) {
        this.setState({
            dogName: event.target.value
        })
    }
    render(){
        // 防止异步图片404
        if(!this.state.imgHost) {
            return null
        }
        let dog = this.state.dog;
        let dogId = dog.dogId;
        let coolDownIndex = dog.coolDownIndex;
        let coolGeneration= dog.generation
        let startPrice = dog.startPrice;
        let endPrice = dog.endPrice;
        let currentPrice = this.state.currentPrice;
        let imgUrl = this.state.imgHost + dog.genesStr + '.png';
        var isMyDog;
        if(defaultAccount) {
            isMyDog = this.state.userInfo.address.toLowerCase() == defaultAccount.toLowerCase() ? true : false;
        }else{
            isMyDog = false;
        }
        var status = '';
        var icon = '';
        let differBlock = Number(dog.endBolckNumber)-Number(this.state.currentBlock);
        if(dog.status == 0){
            if(differBlock > 0 && this.state.currentBlock != 0){
                status = HD_lANG['list14-0'][globalLang];
                icon = 'icon-tag';
            }else{
                status = ''
            }
        }
        if(dog.status == 1){
            icon = 'icon-tag';
            status = HD_lANG['list14-1'][globalLang];
        }
        if(dog.status == 2){
            icon = 'icon-leaf2';
            status = HD_lANG['list14-2'][globalLang];
        }
        if(dog.status == 3){
            icon = 'icon-preg';
            status = HD_lANG['list14-3'][globalLang];
        }
        let time = this.state.currentBlock == 0 ? '' : common.getCoolTime(differBlock);
        return(
            <div className={dog.dogId == 0 || dog.dogId == 1 ? 'detail-wrap zero' : 'detail-wrap'}>
                <div className={'layout-ban item-bd-' + common.getBgColorClass(dog.genesStr, 7)}>
                    <a href="javascript:;" className="left-icon">
                        <span className={'stg ' + icon} >{status + time}</span>
                    </a>
                    {/* <a href="#" className="right-icon"></a> */}
                    <img src={imgUrl} className="dogImg" alt="pet"/>
                </div>

                <div className="section">
                    <div className="summary">
                        <div className="s-wrap">
                            {/* <div className="tit dogName">{dog.dogName}</div> */}
                            <div className="tit dogName">
                                {dog.dogId == 0 || dog.dogId == 1 ? (
                                    HD_lANG['list20'][globalLang]
                                ) : (
                                    this.state.isEdit ? <input type="text" ref='petEdit' maxLength={7} defaultValue={this.state.dogName} onChange={this.changeDogName}/> : this.state.dogName
                                )}
                                {dog.dogId != 0 && dog.dogId != 1 && isMyDog
                                    ? <span className={this.state.isEdit ? 'submit' : 'edit'} onClick={(e) => this.changePetEdit(dog.dogId, e)}></span>
                                    : ''
                                }
                            </div>
                            <div className="info">
                                <span className="stg dogName">ID{dog.dogId}</span>
                                {dog.dogId == 0 || dog.dogId == 1 ? (
                                    null
                                ) : (
                                    <span>
                                        <span className={"stg gen" + dog.generation}>{dog.generation}{HD_lANG['list7'][globalLang]}</span>
                                        <span className="stg">{HD_lANG['petInfo15'][globalLang]}</span>
                                        <span>{common.switchCoolDownIndex(dog.coolDownIndex)}</span>
                                        <a href={"/mobile/index/rest.html?dogId=" + dog.dogId} onClick={this.pushMethod.bind(this, "/mobile/index/rest.html?dogId=" + dog.dogId)} className="rest">{HD_lANG['petInfo4'][globalLang]}</a>
                                    </span>
                                )}
                                {/* <span className="stg">{HD_lANG['petInfo15'][globalLang]}</span>
                                <span>{common.switchCoolDownIndex(dog.coolDownIndex)}</span>
                                <a href={"/mobile/index/rest.html?dogId=" + dog.dogId} onClick={this.pushMethod.bind(this, "/mobile/index/rest.html?dogId=" + dog.dogId)} className="rest">{HD_lANG['petInfo4'][globalLang]}</a> */}
                            </div>
                            <div className="master-info">
                                <div className="pic">
                                    <img src={img2} alt="pet"/>
                                </div>
                                <div className="txt">
                                    <div className="nickname">{this.state.userInfo.nickName}</div>
                                    <div className="tag">{HD_lANG['petInfo13'][globalLang]}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="assist">
                        <div className="s-wrap">
                            <div className="btn icon-heart" onClick={this.addVote.bind(this, dog.dogId)}>{HD_lANG['list22'][globalLang]}&nbsp;{this.state.likeNumber[dogId]}</div>
                        </div>
                    </div>

                    {isMyDog && 
                        <div className="btn-wrap2">
                            <div className="s-wrap clearfix">
                                <ButtonActive state={this.state} currentPrice={currentPrice} isMyDog={isMyDog}></ButtonActive>
                            </div>
                        </div>
                    }

                    {this.state.dog.endPrice > 0 &&
                        <div className="forthwith">
                            <div className="s-wrap">
                                <div className="tit">{HD_lANG['petInfo7'][globalLang]}</div>
                                <div className="price icon-menu2">{currentPrice}</div>
                            </div>
                        </div>
                    }

                    {/* <div className="surplus">
                        <div className="s-wrap">
                            <div className="tit">剩余时间</div>
                            <div className="time">15小时</div>
                        </div>
                    </div> */}
                    
                    {!isMyDog && 
                        <div className="btn-wrap">
                            <div className="s-wrap clearfix">
                                <ButtonActive state={this.state} currentPrice={currentPrice} isMyDog={isMyDog}></ButtonActive>
                            </div>
                        </div>
                    }

                    {/* <div className="price-chart">
                        <div className="s-wrap">
                            <div id="chart" className="chart"></div>
                        </div>
                    </div> */}

                    {dog.dogId != 0 && dog.dogId != 1 ? (
                        <div className="petAttr">
                            <div className="s-wrap">
                                <div className="tit">{dog.variation == 0 ? HD_lANG['petInfo11'][globalLang] : HD_lANG['petInfo11-0'][globalLang]}</div>
                                <ul className="list clearfix">
                                    {dog.genesStr.slice(0, 7).split('').map((item, index) => (
                                        <li key={index}>
                                            <img src={img_host + 'img/gem/' + (index + 1) + '/' + common.getBgColorClass(this.state.dog.genesStr, index) + '.png'} alt="gem"/>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : ''}

                    {dog.generation != '0' &&
                        <div className="petFamily">
                            <div className="s-wrap">
                                <div className="tit">0{HD_lANG['list7'][globalLang]}</div>
                                <ul className="list">
                                    <li className={"item-bd-" + common.getBgColorClass(this.state.dogGgen0.genesStr, 7)}>
                                        <a href={"/mobile/list/detail.html?dogId=" + this.state.dogGgen0.dogId} onClick={this.pushMethod.bind(this,"/mobile/index/detail.html?dogId=" + this.state.dogGgen0.dogId)} className="vertical">
                                            <img src={this.state.imgHost + this.state.dogGgen0.genesStr + '.png'} alt="pet"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                    
                    {dog.generation != '0' &&
                        <div className="petFamily">
                            <div className="s-wrap">
                                <div className="tit">{HD_lANG['petInfo12'][globalLang]}</div>
                                <ul className="list">
                                    <li className={'item-bd-' + common.getBgColorClass(this.state.dogFather.genesStr, 7)}>
                                        <a href={"/mobile/index/detail.html?id=" + this.state.dogFather.dogId} onClick={this.pushMethod.bind(this,"/mobile/index/detail.html?dogId=" + this.state.dogFather.dogId)} className="vertical">
                                            <img src={this.state.imgHost + this.state.dogFather.genesStr + '.png'} alt="pet"/>
                                        </a>
                                    </li>
                                    <li className={'item-bd-' + common.getBgColorClass(this.state.dogMather.genesStr, 7)}>
                                        <a href={"/mobile/index/detail.html?id=" + this.state.dogMather.dogId} onClick={this.pushMethod.bind(this,"/mobile/index/detail.html?dogId=" + this.state.dogMather.dogId)} className="vertical">
                                            <img src={this.state.imgHost + this.state.dogMather.genesStr + '.png'} alt="pet"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Detail;