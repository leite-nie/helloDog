import React from 'react';
import common from '../../common.js'
import tPopBox  from '../../transactionPop.js'
import winAlert  from '../../winAlert.js'
common.getNonceVal();
class Detail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            winLevel : "",  //0-6
            leastAmount : "0",
            level : 0,
            imgHost : "",
            dogObj : {},
            lotteryAmount :0,
            ajaxMessage : ""
        }
        this.confirmConvert = this.confirmConvert.bind(this);
    }
    componentWillMount(){
        this.getDogInfo();
        common.setPageTitle(HD_lANG['winning-title'][globalLang])
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    confirmConvert(){
        let _this = this;
        if(walletIsUnLock == 0){
            winAlert.show(HD_lANG['alert21'][globalLang], function() {
                _this.pushMethod('/mobile/wallet/myWallet.html', event)
            })
            return false;
        }
        let level = this.state.level;
        let _id =  common.getUrlPar("dogId");
        if(level==0){
            winAlert.show(HD_lANG['winning5'][globalLang]);
        }else if(this.state.dogObj.status == 1){
            winAlert.show(HD_lANG['winning6'][globalLang]);
        }else if(this.state.dogObj.status == 2){
            winAlert.show(HD_lANG['winning7'][globalLang]);
        }else {
            common.loading();
            dogMetacoin.methods.registerLottery(_id).estimateGas({from: defaultAccount}).then(function(gasLimit) {
                common.removeLoading();
                tPopBox.show({
                    title: HD_lANG['winning-title'][globalLang],
                    address: address,
                    gasLimit: gasLimit + 500,
                    btnText: HD_lANG['petCenter20'][globalLang]
                }, function(toAddress,gasPrice) {
                    common.loading();
                    dogMetacoin.methods.registerLottery(_id).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, gas: gasLimit + 500}, function(error, result) {
                        common.removeLoading()
                        if(!error){
                            console.log(result)
                            try{
                                common.setHashVal(result);
                                common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ));

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
                common.removeLoading()
                winAlert.show(HD_lANG['alert5'][globalLang], function() {
                    window.location.reload()
                })
            })
        }
    }
    getDogInfo(){
        let _id =  common.getUrlPar("dogId");
        let _this = this;
        $http('/dog/dogInfo', {
            dogId :_id
        }).then(function(data) {
            if(data.code == "0000") {
                _this.setState({
                    level : data.returnObj.dog.lotteryLevel,
                    imgHost : data.returnObj.imgHost,
                    dogObj : data.returnObj.dog
                })
            }
        })
        $http('/lottery/registLottery', {
            dogId :_id
        }).then(function(data) {
            if(data.code == "0000") {
                _this.setState({
                    lotteryAmount : (data.returnObj.lotteryAmount).toString().substring(0,6)
                })
            }else {
                _this.setState({
                    ajaxMessage : data.message
                })
            }
        })
    }

    render(){
        if(!this.state.imgHost) {
            return null
        }
        return(
            <div className="winning-wrap">
                <div className="win-title">{HD_lANG['winning0-'+this.state.level][globalLang]}</div>
                <div className="win-sub">{HD_lANG['winning1'][globalLang]}<span className="stg">{this.state.lotteryAmount}ETH</span></div>

                <div className={'item-view item-bd-' + common.getBgColorClass(this.state.dogObj.genesStr, 7)}>
                    <a href="javascript:;" className="pic">
                        <div className="top-tag visibility">
                            &nbsp;
                            {/* 空闲中 */}
                            {/* 等待领养<span className="icon icon-menu">0.005</span> */}
                        </div>
                        <img src={this.state.imgHost + this.state.dogObj.genesStr + '.png'} alt="pet"/>
                        <div className="bottom-tag visibility">
                            {/* 急速 */}
                        </div>
                    </a>
                </div>

                {/* <div className="gem">
                    <div className="s-wrap">
                        <div className="tit">开奖宝石</div>
                        <ul className="list clearfix">
                            {[1,2,3,4,5,6,7].map((item) => (
                                <li key={item}><img src='' alt="gem"/></li>
                            ))}
                        </ul>
                    </div>
                </div>
                        
                <div className="gem">
                    <div className="s-wrap">
                        <div className="tit">宝石属性</div>
                        <ul className="list clearfix">
                            {[1,2,3,4,5,6,7].map((item) => (
                                <li key={item}><img src='' alt="gem"/></li>
                            ))}
                        </ul>
                    </div>
                </div> */}

                <div className="btn-wrap">
                    <div className="s-wrap">
                        {this.state.lotteryAmount != 0 && <div className="btn-def btn-sty2" onClick={this.confirmConvert}>{HD_lANG['winning-title'][globalLang]}</div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;