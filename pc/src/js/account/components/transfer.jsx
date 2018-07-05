import React from 'react';
import $ from 'jquery';
import WinAlert from '../../base/components/winAlert.jsx';
class notice extends React.Component {
    constructor(props){
        super(props);


        this.state = {

            redoundMoney : 0
        }
    }

    componentWillMount(){
        document.title = HD_lANG['transfer0'][globalLang]
    }
    componentDidMount() {


        this.getMasterInfo();
    }
    // 获取个人信息
    getMasterInfo() {
        var _this = this;
        $.ajax({
            url : api_host + "/user/userInfo",
            data :{
                walletAddress : defaultAccount,
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000' ){
                    _this.setState({
                        redoundMoney : data.returnObj.redoundMoney,
                    })
                }else{
                    WinAlert.show(HD_lANG[data.code][globalLang]);
                }
            }
        })

    }
    getMessageHash(msg){
        return web3.sha3('\x19Ethereum Signed Message:\n' + msg.length + msg)
    }
    signMessage(callback){ //转账签名
        var message = "hellodDog"+(+new Date());

        var messageHash = this.getMessageHash(message);
        let obj = {};
        web3.personal.sign(web3.toHex(message),defaultAccount,function(err,data){
            if(!err){
                var sig = data;
                sig = sig.substr(2, sig.length);
                var r = '0x' + sig.substr(0, 64);
                var s = '0x' + sig.substr(64, 64);
                //var v = web3.toDecimal(sig.substr(128, 2)) + 27;
                var v ='0x'+ sig.substr(128, 2)
                obj.messageHash = messageHash;
                obj.r = r;
                obj.v = v;
                obj.s = s;
                console.log(obj)
                obj = JSON.stringify(obj);
                obj = encodeURI(obj)
                if(typeof callback == 'function'){
                    return  callback(obj);
                }
            }else{
                console.log(err)
            }
        })

    }
    editAllOgc(){
        document.getElementById("amount").value = this.state.redoundMoney;
    }
    transferFunc(){
        let _this = this;
        var toAddress = this.refs.toAddress.value.trim();
        var amount = this.refs.amount.value.trim();
        let _thisTime = new Date().getTime();
        if(!web3.isAddress(toAddress)) {
            WinAlert.show(HD_lANG['alert17'][globalLang]);
            return;
        }
        if(!amount) {
            WinAlert.show(HD_lANG['alert18'][globalLang]);
            return;
        }
        if(Number(amount) <1) {
            WinAlert.show(HD_lANG['alert13'][globalLang]);
            return;
        }
        if(Number(amount) > 999999999.99) {
            WinAlert.show(HD_lANG['alert14'][globalLang]);
            return;
        }
        if(Number(amount) > Number(this.state.redoundMoney)) {
            WinAlert.show(HD_lANG['alert15'][globalLang]);
            return;
        }

        this.signMessage(function(signatureJson){
            $.ajax({
                url : api_host + "/user/transferOgc",
                data :{
                    fromAddress: window.defaultAccount,
                    toAddress: toAddress,
                    amount: amount,
                    signatureJson : signatureJson
                },
                dataType : "jsonp",
                jsonp:'callback',
                success:function (data) {
                    if(data.code == '0000' ){
                        WinAlert.show(HD_lANG['winning17'][globalLang])
                        _this.setState({
                            redoundMoney : data.returnObj.fromAccount.redoundMoney,
                        })
                    }else{
                        WinAlert.show();
                    }
                }
            })

        })
    }
    render(){
        return(
            <div>
                <div className="transfer-top">
                    <h2>{HD_lANG['transfer0'][globalLang]}</h2>
                </div>
                <div className="notice-box">

                    <div className="tit-1">
                        {this.state.redoundMoney}<span>(OGC)</span>
                    </div>
                    <div className="input-list list-1">
                        <input type="text" placeholder={HD_lANG['transfer1'][globalLang]}  ref="toAddress" />
                    </div>
                    <div className="tips">{HD_lANG['transfer2'][globalLang]}</div>
                    <div className="tit-2 clearfix">
                        <span className="r">{HD_lANG['transfer4'][globalLang]}{this.state.redoundMoney}</span>
                        <span className="l">{HD_lANG['transfer3'][globalLang]}</span>
                    </div>
                    <div className="input-list  list-2">
                        <input type="text" placeholder={"1"} id="amount"  ref="amount" />
                        <span onClick={this.editAllOgc.bind(this)}>{HD_lANG['transfer5'][globalLang]}</span>
                    </div>
                    <div className="btn">
                        <span onClick={this.transferFunc.bind(this)}>{HD_lANG['transfer6'][globalLang]}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default notice;