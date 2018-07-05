import React from 'react';
import common from '../../common.js'
import tPopBox  from '../../transactionPop.js'
import winAlert  from '../../winAlert.js'
common.getNonceVal();
class Detail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            dog: {},
            userInfo: {},
            imgHost: '',
        }
    }

    componentWillMount() {
        let dogId = common.getUrlPar('dogId')
        this.getDogInfo(dogId)
        common.setPageTitle(HD_lANG['list0'][globalLang])
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $http('/dog/dogInfo', {
            dogId: dogId
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
        if(walletIsUnLock == 0){
            winAlert.show(HD_lANG['alert21'][globalLang], function() {
                _this.pushMethod('/mobile/wallet/myWallet.html')
            })
            return false;
        }
        let dogId = common.getUrlPar('dogId');
        var startPrice = this.refs.startPrice.value.toString();
        var endPrice = this.refs.endPrice.value.toString();
        var startDuration = this.refs.startDuration.value;
        var _startPrice = web3.utils.toWei(startPrice);
        var _endPrice = web3.utils.toWei(endPrice);
        var _startDuration = Number(startDuration)*3600*24;
    
        common.loading();
        dogMetacoin.methods.createSaleAuction(dogId,_startPrice,_endPrice,_startDuration).estimateGas({from: defaultAccount}).then(function(gasLimit) {
            common.removeLoading();
            tPopBox.show({
                title: HD_lANG['list0'][globalLang],
                address: address,
                price: startPrice + ' - ' + endPrice,
                gasLimit: gasLimit + 500,
                btnText: HD_lANG['saleing9'][globalLang]
            }, function(toAddress,gasPrice) {
                common.loading();
                dogMetacoin.methods.createSaleAuction(dogId,_startPrice,_endPrice,_startDuration).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit+500}, function(error, result) {
                    common.removeLoading();
                    if(!error){
                        console.log(result);
                        try{
                            common.setHashVal(result);
                            common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                        }catch (e){
                            localStorage.setItem("hash",result);
                        }
                        winAlert.show(HD_lANG['alert1'][globalLang], function() {
                            common.popRootPage()
                        })
                    }else{
                        winAlert.show(HD_lANG['alert5'][globalLang], function() {
                            window.location.reload()
                        })
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

    render(){
        if(!this.state.imgHost) {
            return null
        }
        return(
            <div className="saleIng-wrap">
                <div className={'layout-ban item-bd-' + common.getBgColorClass(this.state.dog.genesStr, 7)}>
                    {/* <a href="#" className="right-icon"></a> */}
                    <img src={this.state.imgHost + this.state.dog.genesStr + '.png'} alt="pet"/>
                </div>

                <div className="section">
                    <div className="saleIng-sum">
                        <div className="s-wrap">
                            <div className="sect-titlt">
                                <div className="tit"><span className="stg icon-tag">{HD_lANG['saleing10'][globalLang]}</span></div>
                                <div className="sub">
                                    <span className="stg">{this.state.dog.dogName}</span>{HD_lANG['petCenter35'][globalLang]}
                                </div>
                            </div>
                            
                            <div className="set-price">
                                <div className="row">
                                    <span className="label">{HD_lANG['saleing3'][globalLang]}</span>
                                    <div className="r-cont icon-menu">
                                        <input type="number" className="input-num" ref="startPrice" defaultValue="0.01"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <span className="label">{HD_lANG['saleing4'][globalLang]}</span>
                                    <div className="r-cont icon-menu">
                                        <input type="number" className="input-num" ref="endPrice" defaultValue="0.005"/>
                                    </div>
                                </div>
                                <div className="row row-day">
                                    <span className="label">{HD_lANG['saleing5'][globalLang]}</span>
                                    <div className="r-cont">
                                        <input type="number" className="input-num" ref="startDuration" defaultValue="2"/>
                                    </div>
                                    <span className="txt">{HD_lANG['saleing6'][globalLang]}</span>
                                </div>
                            </div>
                            <div className="btn-def" onClick={this.sellDog.bind(this)}>{HD_lANG['saleing7'][globalLang]}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;