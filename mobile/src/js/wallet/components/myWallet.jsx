import React from 'react';

import img1 from '../../../images/wallet-my-1.png';
import img2 from '../../../images/wallet-my-2.png';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from 'qrcodejs2'

import pwdBox  from '../../passwordBox.min.js';
import winAlert  from '../../winAlert.js';
import common from "../../common";

import tPopBox  from '../../transactionPop.js'

window.didFinishCaptureQRCode =function(str) {
    var _arr = str.split(":");
    var _str = _arr.length > 1 ? _arr[1] : str;

    document.getElementById("otherUserAddress").value = _str;
}


class MyWallet extends React.Component {
    constructor(props){
        super(props);
        this.logoutWallet = this.logoutWallet.bind(this);
        //this.setPassWord = this.setPassWord.bind(this);
        this.backPrivateKey = this.backPrivateKey.bind(this);
        this.backPrivateKey2 = this.backPrivateKey2.bind(this);
        this.confirmLogout = this.confirmLogout.bind(this);
        this.cancelLogout = this.cancelLogout.bind(this);
        this.setNewPassWord = this.setNewPassWord.bind(this);
        this.scanCode = this.scanCode.bind(this);
        this.closePop = this.closePop.bind(this);
        this.onCopy = this.onCopy.bind(this);
        this.onCopy2 = this.onCopy2.bind(this);
        this.backBegin = this.backBegin.bind(this);
        this.receiveEth = this.receiveEth.bind(this);
        this.sendEth = this.sendEth.bind(this);
        this.sendEthTransaction = this.sendEthTransaction.bind(this);
        this.sendInputChange = this.sendInputChange.bind(this);
        this.sendInputChange2 = this.sendInputChange2.bind(this);
        let walletObj = localStorage.getItem('createAddress');
        let address = localStorage.getItem('createAddress');
        let privateKey = localStorage.getItem('createPrivateKey');
        this.state = {
            lockIsHidden : true, //以下6个 控制div的显隐
            logoutIsHidden : true,
            setPassIsHidden : true,
            backKeyIsHidden : true,
            logoutLastIsHidden : true,
            receiveEthIsHidden : true,
            sendEthIsHidden : true,
            isImportFirst : false, //5个 标识密码是否被填写
            isImportSecond : false,
            isImportThird : false,
            isImportFourth : false,
            isImportFiveth : false,
            address :"",
            privateKey : "",
            copyText : HD_lANG['myWallet10'][globalLang],
            copyText2 : HD_lANG['myWallet1'][globalLang],
            copyText3 : HD_lANG['myWallet2'][globalLang],
            copied : false,
            inputPassVal : HD_lANG['myWallet3'][globalLang],
            needToPass : "yes",  //是否需要用户输入密码
            isBackPriKeyBtn : false,
            amount : "0",
            sendAmount : 0,
            sendAddress : "",
            total : 0
        }

    }
    receiveEth(){
        this.setState({
            receiveEthIsHidden :false,
            lockIsHidden : false
        })
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)
    }
    sendEth(){
        this.setState({
            sendEthIsHidden : false,
            lockIsHidden : false
        })
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)
    }
    hideFooter(){
        var newState = this.state.lockIsHidden ? false : true;
        this.props.changeState(newState);
    }
    sendEthTransaction(){ //发送交易
        let _this = this;
        let amount = this.state.sendAmount;
        if( amount <= 0 ){
            winAlert.show(HD_lANG['myWallet4'][globalLang])
            return false;
        }
        if( Number(this.state.amount) < Number( amount )){
            winAlert.show(HD_lANG['myWallet5'][globalLang]);
            return false;
        }
        amount = web3.utils.toWei(amount);
        let toAddress2 = document.getElementById("otherUserAddress").value;
        let fromAddress  = localStorage.getItem('address');
        let gas = web3.utils.toWei("0.01","Gwei")

        if( !web3.utils.isAddress(fromAddress) ){
            winAlert.show(HD_lANG['myWallet6'][globalLang]);
            return false;
        }
        if( !web3.utils.isAddress(toAddress2) ){
            winAlert.show(HD_lANG['myWallet7'][globalLang]);
            return false;
        }



        tPopBox.show({
            title: HD_lANG['myWallet8'][globalLang],
            address: toAddress2,
            gasLimit: 23000,
            btnText: HD_lANG['myWallet9'][globalLang]
        }, function(toAddress,gasPrice) {
            common.removeLoading();
            let obj = {

                from : fromAddress,
                to : toAddress2,
                value : amount,
                gas : 23000,
                gasPrice : gasPrice
            };
            web3.eth.sendTransaction(obj,function(err,res){
                if(!err){
                    winAlert.show(HD_lANG['myWallet10'][globalLang],function(){
                        _this.setState({
                            lockIsHidden : true,
                            sendEthIsHidden : true
                        });

                        setTimeout(()=>{
                            _this.hideFooter();
                        },200)
                    });

                    console.log(res)
                }else{
                    winAlert.show(HD_lANG['myWallet11'][globalLang])
                    console.log(err)
                }
            })

        });



    }
    sendInputChange(event){
        let val = event.currentTarget.value;
        this.setState({
            sendAmount : val
        })
        console.log(val)
    }
    sendInputChange2(event){

    }
    componentDidMount(){

        let _this = this;
        setTimeout(()=>{
            _this.getMyDogList();
            if(!localStorage.getItem('web3js_wallet')){

                try{
                    if( common.isIos() ){
                        window.webkit.messageHandlers.presentNewPage.postMessage("/mobile/wallet/begin.html");
                    }else{
                        window.ScriptAction.presentNewPage("/mobile/wallet/begin.html");
                    }
                }catch (e){
                    window.location.href= "/mobile/wallet/begin.html";
                }
                return false;
            }else if( !walletIsUnLock ){
                //alert('mywallet length:'+web3.eth.accounts.wallet.length)
                _this.inputPassWord();
                return false;
            }else{
                //web3.eth.accounts.wallet.load(passWord);
                setTimeout(()=>{
                    _this.getWalletInfo();
                    setTimeout(()=>{
                        new QRCode(document.getElementById('qrcode'), localStorage.getItem("address"));
                    },1000)
                },500)
            }
        },1000)
    }
    componentWillMount(){
        //alert("willmount")
        common.setPageTitle(HD_lANG['myWalletTit'][globalLang])


        //本地存储 钱包不存在
        if(!localStorage.getItem('web3js_wallet')){
            //alert("web3js_wallet不存在")
            window.location.href = "/mobile/wallet/begin.html";
        }
    }
    onCopy(){
        this.setState({
            copied: true,
            copyText : HD_lANG['importTit3'][globalLang]
        });
    }
    onCopy2(){
        this.setState({
            copied: true,
            copyText2 : HD_lANG['importTit3'][globalLang]
        });
    }
    onCopy3(){
        let _this = this;
        let shareObj ={
            type : 1,
            content : this.state.address,
            title : HD_lANG['myWallet12'][globalLang]
        }
        shareObj = JSON.stringify(shareObj);
        try{
            if(common.isIos()){
                window.webkit.messageHandlers.shareWithUmeng.postMessage(shareObj)
            }else{
                window.ScriptAction.shareWithUmeng(shareObj);
            }
        }catch (e){
            this.setState({
                copied: true,
                copyText3 : HD_lANG['importTit3'][globalLang]
            });
        }
    }
    closePop(){

        this.setState({
            logoutIsHidden : true,
            lockIsHidden : true,
            setPassIsHidden : true,
            backKeyIsHidden : true,
            logoutLastIsHidden : true,
            receiveEthIsHidden : true,
            sendEthIsHidden : true,
        });
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)

    }
    backPrivateKey(){
        this.setState({
            lockIsHidden : false,
            backKeyIsHidden : false,
            isBackPriKeyBtn : true,
            copied: false,
            copyText : HD_lANG['myWallet0'][globalLang]
        })
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)
    }
    backPrivateKey2(){
        this.setState({

            lockIsHidden : false,
            backKeyIsHidden : false,
            copied: false,
            copyText : HD_lANG['myWallet0'][globalLang]
        })
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)
    }
    backBegin(){
        //清除当前钱包
        let address = localStorage.getItem("address");
        web3.eth.accounts.wallet.clear();
        localStorage.removeItem("address");
        //sessionStorage.removeItem("privateKey");
        common.delCookie('privateKey')
        common.delCookie('passWord')
        localStorage.removeItem('web3js_wallet');


        //alert(localStorage.getItem('web3js_wallet'))
        //setTimeout(()=>{
        try{
            if( common.isIos() ){
                window.webkit.messageHandlers.didExitWallet.postMessage(address)
            }else{
                //alert("准备调用didExitWallet")
                window.ScriptAction.didExitWallet(address);
            }
        }catch (e){
            window.location.href = "/mobile/wallet/begin.html";
        }
        //},500)


    }
    logoutWallet(){
        this.setState({
            isBackPriKeyBtn :false,
            logoutIsHidden : false,
            lockIsHidden : false
        })
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)
    }



    getWalletInfo(){

        let _address = localStorage.getItem("address");
        //let _privateKey = sessionStorage.getItem("privateKey");
        let _privateKey = common.getCookie("privateKey") || localStorage.getItem("privateKey");
        let _amount = "0";
        let _this =this;
        _this.setState({
            address : _address,
            privateKey :_privateKey,

        })
        web3.eth.getBalance(_address).then(function(data){
            _amount= web3.utils.fromWei(data).substring(0,8);
            _this.setState({

                amount:_amount
            })

        })


    }
    getMyDogList(type, page, pageSize) {
        var _this = this

        $http('/dog/myDogList', {
            walletAddress: defaultAccount,
            listType : 0,    //0-所有 1-官方 2-出售 3-租赁
            toPage : 1,
            pageSize : 10
        }).then(function(data) {
            if(data.code == '0000') {
                _this.setState({
                    total: data.returnObj.total,
                })
            }
        })
    }
    setNewPassWord(){
        let _this = this;
        let _isSecondInputPassWorld = false; //是否是第二次输入新密码
        pwdBox.init('','',HD_lANG['myWallet13'][globalLang],' ');
        pwdBox.show(function(res){
            if(res.status){
                if(!_isSecondInputPassWorld){
                    let userPass = res.password;
                    let data = null;
                    try{
                        data = web3.eth.accounts.wallet.load(userPass);
                    }catch(e){}
                    if( !data ){ //密码错误 !data
                        document.getElementsByClassName("notice")[0].innerHTML = HD_lANG['myWallet14'][globalLang];
                    }else{
                        _isSecondInputPassWorld = true;
                        pwdBox.password = '';
                        pwdBox.inited = false;
                        pwdBox.onChange();
                        document.getElementsByClassName("notice")[0].innerHTML = " ";
                        document.getElementsByClassName("pwd-title")[0].innerHTML = HD_lANG['myWallet15'][globalLang];
                        //PwdBox.reset();
                    }
                }else{
                    console.log(res.password);
                    let _pass = res.password;
                    let _res = web3.eth.accounts.wallet.save(_pass);
                    //sessionStorage.setItem("passWord",_pass);
                    common.setCookie("passWord",_pass,"d1");
                    localStorage.setItem("passWord",_pass);
                    try{
                        let str = localStorage.getItem("address")+"="+_pass;
                        if( common.isIos() ){
                            window.webkit.messageHandlers.saveCoreInfoForKey.postMessage(str)
                        }else{
                            window.ScriptAction.saveCoreInfoForKey(str);
                        }
                    }catch (e){}
                    setTimeout(()=>{
                        pwdBox.reset();
                    },600)
                }
            }else{
                //alert(JSON.stringify(arguments));
            }
        });
    }
    inputPassWord(){
        let _this = this;

        pwdBox.init('','',HD_lANG['myWallet16'][globalLang],' ');
        pwdBox.show(function(res){
            if(res.status){
                //重置输入
                let userPass = res.password;
                let data = null;
                try{
                    data = web3.eth.accounts.wallet.load(userPass);
                }catch(e){}
                if( !data ){ //密码错误
                    document.getElementsByClassName("notice")[0].innerHTML = HD_lANG['myWallet14'][globalLang];
                }else{
                    document.getElementsByClassName("notice")[0].innerHTML = "";
                    localStorage.setItem("address",data[0].address);
                    common.setCookie("privateKey",data[0].privateKey,'d7');
                    //sessionStorage.setItem("passWord",userPass);
                    common.setCookie("passWord",userPass,"d1");
                    localStorage.setItem("passWord",userPass);
                    localStorage.setItem("privateKey",data[0].privateKey);
                    new QRCode(document.getElementById('qrcode'), data[0].address);

                    _this.getWalletInfo();
                    setTimeout(()=>{
                        //关闭并重置密码输入
                        pwdBox.reset();
                    },1000)
                }

            }else{
                //alert(JSON.stringify(arguments));
            }
        });
    }
    confirmLogout(){
        let isCopy = this.state.copied;
        if(isCopy){
            if( this.state.isBackPriKeyBtn ){
                this.setState({
                    backKeyIsHidden : true,
                    lockIsHidden : true
                })
            }else{
                this.setState({
                    logoutLastIsHidden : false,
                    logoutIsHidden : true,
                    backKeyIsHidden : true,
                    lockIsHidden : false
                })
            }
            let _this = this;
            setTimeout(()=>{
                _this.hideFooter();
            },200)
        }else {
            winAlert.show(HD_lANG['myWallet17'][globalLang])
        }
    }
    cancelLogout(){
        this.setState({
            logoutIsHidden : true,
            lockIsHidden : true,
            backKeyIsHidden : true,
            logoutLastIsHidden : true
        })
        let _this = this;
        setTimeout(()=>{
            _this.hideFooter();
        },200)
    }
    scanCode(){
        try{
            if( common.isIos() ){
                window.webkit.messageHandlers.startCaptureQRCode.postMessage(null)
            }else{
                window.ScriptAction.startCaptureQRCode();
            }
        }catch (e){
            winAlert.show(HD_lANG['myWallet18'][globalLang])
        }
    }
    shareAddress(){

    }
    render(){
        return(
            <div className="my-wallet-wrap">
                <div className="my-wallet-box">
                    <div className="top">
                        <div className="img-btn" onClick={this.receiveEth}>
                            <img src={img1} alt=""/>
                            <p>{HD_lANG['myWallet19'][globalLang]}</p>
                        </div>
                        <div className="img-btn"  onClick={this.sendEth}>
                            <img src={img2} alt=""/>
                            <p>{HD_lANG['myWallet8'][globalLang]}</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <p>{HD_lANG['myWallet20'][globalLang]}</p>
                            <span>{this.state.amount}ETH</span>
                        </li>
                        <li>
                            <p>{HD_lANG['myWallet21'][globalLang]} </p>
                            <span id="test2">{this.state.total}</span>
                        </li>
                        <li>
                            <p>{HD_lANG['myWallet12'][globalLang]} </p>
                            <span className="address">{this.state.address}</span>
                        </li>
                        <li onClick={this.backPrivateKey}>
                            <p className="gray">{HD_lANG['myWallet22'][globalLang]}</p>
                            <em></em>
                        </li>
                        <li onClick={this.setNewPassWord}>
                            <p className="gray">{HD_lANG['myWallet23'][globalLang]}</p>
                            <em></em>
                        </li>
                        <li onClick={this.logoutWallet}>
                            <p className="gray">{HD_lANG['myWallet24'][globalLang]}</p>
                            <em className="last"></em>
                        </li>
                    </ul>
                </div>
                <div className={this.state.logoutLastIsHidden ? " logout-last-hidden" : "logout-wallet logout-last"}>
                    <h2>{HD_lANG['myWallet24'][globalLang]}</h2>
                    <div className="text">
                        <p>{HD_lANG['importTit5'][globalLang]}</p>
                        <p>{HD_lANG['importTit6'][globalLang]}</p>
                    </div>
                    <div className="btn">
                        <span onClick={this.backBegin}>退出</span>
                        <span onClick={this.cancelLogout}>取消</span>
                    </div>
                </div>
                <div  id="btn" className={this.state.logoutIsHidden ? "logout-wallet logout-wallet-hidden" : "logout-wallet"}>
                    <h2>{HD_lANG['myWallet24'][globalLang]}</h2>
                    <div className="text">
                        <p>{HD_lANG['importTit5'][globalLang]}</p>
                        <p>{HD_lANG['importTit6'][globalLang]}</p>
                    </div>
                    <div className="btn">
                        <span onClick={this.backPrivateKey2}>{HD_lANG['myWallet27'][globalLang]}</span>
                        <span onClick={this.cancelLogout}>{HD_lANG['myWallet26'][globalLang]}</span>
                    </div>
                </div>
                <div className={this.state.setPassIsHidden ? "set-pass set-pass-hidden" : "set-pass"}>
                    <h2>{HD_lANG['myWallet23'][globalLang]}</h2>



                </div>
                <div className={this.state.backKeyIsHidden ? "back-privateKey back-privateKey-hidden" : "back-privateKey"} >
                    <h2>{HD_lANG['myWallet28'][globalLang]}</h2>
                    <div className="text">
                        <p>{HD_lANG['myWallet29'][globalLang]}</p>
                        <p>{HD_lANG['myWallet30'][globalLang]}</p>
                        <div className="my-key">
                            <p>{HD_lANG['myWallet31'][globalLang]}</p>
                            <span>{this.state.privateKey}</span>
                        </div>
                        <div className="copy-btn">
                            <CopyToClipboard text={this.state.privateKey} onCopy={this.onCopy}>
                                <span>{this.state.copyText}</span>
                            </CopyToClipboard>

                        </div>
                    </div>

                    <div className="btn">
                        <span onClick={this.confirmLogout}>{HD_lANG['myWallet32'][globalLang]}</span>
                        <span onClick={this.cancelLogout}>{HD_lANG['myWallet26'][globalLang]}</span>
                    </div>
                </div>
                <div className={this.state.receiveEthIsHidden ? "receive-eth receive-eth-hidden" :"receive-eth"}>
                    <h2>{HD_lANG['myWallet19'][globalLang]}</h2>
                    <p className="first">{HD_lANG['myWallet33'][globalLang]}</p>
                    <p className="first">{HD_lANG['myWallet34'][globalLang]}</p>
                    <div id="qrcode" className="code-box"></div>
                    <p className="third">
                        {this.state.address}
                    </p>


                    <div className="share">
                        <CopyToClipboard text={this.state.address} onCopy={this.onCopy2}>
                            <span>{this.state.copyText2}</span>
                        </CopyToClipboard>

                        <CopyToClipboard text={this.state.address} onCopy={this.onCopy3.bind(this)}>
                            <span>{this.state.copyText3}</span>
                        </CopyToClipboard>


                    </div>
                </div>
                <div className={this.state.sendEthIsHidden ? "send-eth send-eth-hidden" :"send-eth"}>
                    <h2>{HD_lANG['myWallet38'][globalLang]}</h2>
                    <p className="first">{HD_lANG['myWallet35'][globalLang]}</p>
                    <span className="erwei-code-btn" onClick={this.scanCode}>{HD_lANG['myWallet36'][globalLang]}</span>
                    <p className="second">{HD_lANG['myWallet37'][globalLang]}</p>
                    <div className="input-parent"><input type="text" className="first-input" onChange={this.sendInputChange2} placeholder={HD_lANG['myWallet38'][globalLang]} id="otherUserAddress" /></div>
                    <div className="input-parent"><input type="number" placeholder="0.0001ETH" onChange={this.sendInputChange} /></div>
                    <button onClick={this.sendEthTransaction}>{HD_lANG['myWallet9'][globalLang]}</button>
                </div>
                <div className={this.state.lockIsHidden ? "hidden" : "lock-screen"} onClick={this.closePop}></div>
            </div>
        )
    }
}



export default MyWallet;