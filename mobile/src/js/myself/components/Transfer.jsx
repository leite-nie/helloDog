import React from 'react';
import $ from 'n-zepto';
import common from '../../common.js';
import winAlert from '../../winAlert.js';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ogcAmount: '',
            redoundMoney : '',
        }
    }
    componentWillMount (){
        common.setPageTitle(HD_lANG['friends9'][globalLang]);
        this.getMasterInfo();
    }
    // 获取个人信息
    getMasterInfo() {
        var _this = this;
        $http('/user/userInfo', {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' ){
                _this.setState({
                    ogcAmount: data.returnObj.canGetOGC,
                    redoundMoney : data.returnObj.redoundMoney,
                })
            }
        })
    }
    transferOgc(event) {
        var toAddress = this.refs.toAddress.value.trim();
        var amount = this.refs.amount.value.trim();
        let _thisTime = new Date().getTime();
        if(!web3.utils.isAddress(toAddress)) {
            winAlert.show(HD_lANG['alert17'][globalLang]);
            return;
        }
        if(!amount) {
            winAlert.show(HD_lANG['alert18'][globalLang]);
            return;
        }
        if(Number(amount) < 1) {
            winAlert.show(HD_lANG['alert13'][globalLang]);
            return;
        }
        if(Number(amount) > 999999999.99) {
            winAlert.show(HD_lANG['alert14'][globalLang]);
            return;
        }
        if(Number(amount) > Number(this.state.redoundMoney)) {
            winAlert.show(HD_lANG['alert15'][globalLang]);
            return;
        }
        if(!window.messagesKey){
            winAlert.show(HD_lANG['cup10'][globalLang]);
            return false;
        }
        let signatureJson = web3.eth.accounts.sign("helloDog"+_thisTime,messagesKey);
        signatureJson = JSON.stringify(signatureJson);
        signatureJson = encodeURI(signatureJson)
        common.loading()
        $http('/user/transferOgc', {
            fromAddress: window.defaultAccount,
            toAddress: toAddress,
            amount: amount,
            signatureJson : signatureJson

        }).then(function(data) {
            common.removeLoading()
            if(data.code == '0000') {
                winAlert.show(HD_lANG['myWallet10'][globalLang], function() {
                    common.getClientPushMethod('/mobile/myself/myself.html', event)
                });
            }else {
                winAlert.show(HD_lANG['alert16'][globalLang]);
            }
        })
    }

    getAllAmount(event){
        let value = this.state.redoundMoney;
        document.getElementById("valId").value = value;
    }
    render(){
        return(
            <div className="transfer-wrap">
                <div className="top">
                    <span>{this.state.redoundMoney}</span>
                    <i>(OGC)</i>
                </div>
                <div className="title">{HD_lANG['myself10'][globalLang]}</div>
                <div className="input">
                    <input type="text" placeholder={HD_lANG['myWallet12'][globalLang]} ref="toAddress" />
                </div>
                <div className="tips">
                    {HD_lANG['alert19'][globalLang]}
                </div>
                <div className="title">
                    <span>{HD_lANG['myself11'][globalLang]}：{this.state.redoundMoney}个</span>
                    {HD_lANG['myself12'][globalLang]}
                </div>
                <div className="input">
                    <input type="tel" placeholder="0.00" ref="amount" id="valId"  />
                    <span onClick={this.getAllAmount.bind(this)}>{HD_lANG['myself13'][globalLang]}</span>
                </div>
                <button className="btn" onClick={this.transferOgc.bind(this)}>{HD_lANG['myself14'][globalLang]}</button>
            </div>
        )
    }
}



export default Index;