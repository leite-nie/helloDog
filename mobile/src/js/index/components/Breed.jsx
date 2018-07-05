import React from 'react';
import common from '../../common.js'
import tPopBox  from '../../transactionPop.js'
import winAlert  from '../../winAlert.js'
common.getNonceVal();
class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            curTab: 1,
            dog: {},
            userInfo: {},
            imgHost: '',
        }
    }
    componentWillMount() {
        let dogId = common.getUrlPar('dogId')
        this.getDogInfo(dogId)
        common.setPageTitle(HD_lANG['petInfo-title1'][globalLang])
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    // tab切换
    changeTab(num, event) {
        this.setState({
            curTab: num
        })
    }
    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $http('/dog/dogInfo', {
            dogId : dogId
        }).then(function(data) {
            if(data.code == '0000'){
                _this.setState({
                    dog: data.returnObj.dog,
                    userInfo: data.returnObj.userInfo,
                    imgHost: data.returnObj.imgHost
                })
            }
        })
    }
    // 上架
    sellDog() {
        var _this = this;
        let dogId = common.getUrlPar('dogId');
        var startPrice = this.refs.startPrice.value.toString();
        var endPrice = this.refs.endPrice.value.toString();
        var startDuration = this.refs.startDuration.value;
        var _startPrice = web3.utils.toWei(startPrice);
        var _endPrice = web3.utils.toWei(endPrice);
        var _startDuration = Number(startDuration)*3600*24;
       
        common.loading();
        dogMetacoin.methods.createSiringAuction(dogId,_startPrice,_endPrice,_startDuration).estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['petInfo-title1'][globalLang],
                address: address,
                chargeScope: startPrice + ' - ' + endPrice,
                gasLimit: gasLimit + 500,
                btnText: HD_lANG['petCenter20'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                dogMetacoin.methods.createSiringAuction(dogId,_startPrice,_endPrice,_startDuration).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                    common.removeLoading();
                    if(!error){
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
            winAlert.show(HD_lANG['alert5'][globalLang])
        })
    }
    render(){
        if(!this.state.imgHost) {
            return null
        }
        let imgUrl = this.state.dog.variation == 0 ? this.state.imgHost + this.state.dog.genesStr + '.png' : "http://www.haloudog.com/img/otherdog/variation.png";
        let curTab = this.state.curTab;
        let dogId = common.getUrlPar('dogId')
        
        return(
            <div className="breed-wrap">
                <div className={'layout-ban item-bd-' + common.getBgColorClass(this.state.dog.genesStr, 7)}>
                    {/* <a href="javascript:;" className="right-icon"></a> */}
                    <img src={this.state.imgHost + this.state.dog.genesStr + '.png'} alt="pet"/>
                </div>

                <div className="section">
                    <div className="sect-titlt">
                        <div className="s-wrap">
                            <div className="tit"><span className="stg icon-leaf3">{HD_lANG['petCenter32'][globalLang]}</span></div>
                            
                            <div className="sect-tab">
                                <div className={curTab == 1 ? 'active' : ''} onClick={this.changeTab.bind(this, 1)}>{HD_lANG['petCenter33'][globalLang]}</div>
                                <div className={curTab == 2 ? 'active' : ''} onClick={this.changeTab.bind(this, 2)}>{HD_lANG['petCenter34'][globalLang]}</div>
                            </div>
                            
                            <div className="sub">
                                <span className="stg">{this.state.dog.dogName}</span>{HD_lANG['petCenter35'][globalLang]}
                            </div>
                        </div>
                    </div>

                    <div className="btn-wrap">
                        <div className="s-wrap">
                            {curTab == 1 ? (
                                <div className="saleIng-sum">
                                        <div className="set-price">
                                            <div className="row">
                                                <span className="label">{HD_lANG['saleing3'][globalLang]}</span>
                                                <div className="r-cont icon-menu">
                                                    <input type="number" ref="startPrice" className="input-num" defaultValue="0.01"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <span className="label">{HD_lANG['saleing4'][globalLang]}</span>
                                                <div className="r-cont icon-menu">
                                                    <input type="number" ref="endPrice" className="input-num" defaultValue="0.005"/>
                                                </div>
                                            </div>
                                            <div className="row row-day">
                                                <span className="label">{HD_lANG['saleing5'][globalLang]}</span>
                                                <div className="r-cont">
                                                    <input type="number" ref="startDuration" className="input-num" defaultValue="2"/>
                                                </div>
                                                <span className="txt">{HD_lANG['saleing6'][globalLang]}</span>
                                            </div>
                                        </div>
                                        <div className="btn-def" onClick={this.sellDog.bind(this)}>{HD_lANG['saleing7'][globalLang]}</div>
                                    </div>
                                ) : (
                                    <a href={"/mobile/index/mating.html?dogId=" + dogId} onClick={this.pushMethod.bind(this, "/mobile/index/mating.html?dogId=" + dogId)} className="btn-def">{HD_lANG['saleing8'][globalLang]}</a>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;