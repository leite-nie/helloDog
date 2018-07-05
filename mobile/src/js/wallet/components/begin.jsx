import React from 'react';
import img1 from '../../../images/wallet-begin-1.png';
import tPopBox  from '../../transactionPop.js';
import pwdBox  from '../../passwordBox.min.js';
import common from "../../common";


class WalletBegin extends React.Component {
    constructor(props){
        super(props);
        this.createWallet = this.createWallet.bind(this);
        this.importWallet = this.importWallet.bind(this);
        this.setPassWord = this.setPassWord.bind(this);

        this.state = {
            lockIsHidden : true, //以下4个 控制div的显隐
            setPassIsHidden : true,
            address : "",
            privateKey : ""

        }
    }
    importWallet(){
        try{
            if( common.isIos() ){
                window.webkit.messageHandlers.prepareImportWallet.postMessage("/mobile/wallet/importWallet.html");
            }else{
                window.ScriptAction.prepareImportWallet("/mobile/wallet/importWallet.html");
            }

        }catch (e){
            window.location.href = "/mobile/wallet/importWallet.html"
        }


    }
    createWallet(){
        localStorage.removeItem('web3js_wallet');
        web3.eth.accounts.wallet.clear();
        let data = web3.eth.accounts.wallet.create(1);
        localStorage.setItem("address",data[0].address);
        common.setCookie("privateKey",data[0].privateKey,'d7');

        this.setPassWord();

    }

    setPassWord(){
        pwdBox.init('','',HD_lANG['beginTit0'][globalLang],' ');
        pwdBox.show(function(res){
            if(res.status ){
                //重置输入
                setTimeout(()=>{
                    document.querySelector(".notice").innerHTML = HD_lANG['beginTit5'][globalLang];
                    console.log(res.password);
                    let _pass = res.password;
                    let _res = web3.eth.accounts.wallet.save(_pass);

                    if( _res ){
                        localStorage.setItem("passWord",_pass);
                        common.setCookie("passWord",_pass,"d1");
                        try{
                            let str = localStorage.getItem("address")+"="+_pass;
                            if( common.isIos() ){
                                window.webkit.messageHandlers.saveCoreInfoForKey.postMessage(str);
                                window.webkit.messageHandlers.didFinishCreateWallet.postMessage("0");
                            }else{
                                window.ScriptAction.saveCoreInfoForKey(str);
                                window.ScriptAction.didFinishCreateWallet("0");
                            }
                        }catch (e){
                            setTimeout(()=>{
                                pwdBox.reset();
                                common.getClientPushMethod('/mobile/wallet/myWallet.html')
                            },600)
                        }

                    }else {
                        //钱包创建失败
                        document.querySelector(".notice").innerHTML = HD_lANG['beginTit6'][globalLang];
                    }
                },500)
                //关闭并重置密码输入
            }else{

            }
        });

    }
    //保存用户邀请码
    //手机用户复制的邀请链接，打开的就是当前index.html
    saveInviteCode (){
        let inviteCode = common.getUrlPar("invitationCode");
        if( inviteCode ){
            localStorage.setItem("invitationCode",inviteCode)
        }
    }

    componentDidMount(){
        this.saveInviteCode();
    }

    componentWillMount(){
        document.title = HD_lANG['beginTit'][globalLang]


    }
    render(){
        return(
            <div className="begin-wrap">
                <h2>{HD_lANG['beginTit1'][globalLang]}</h2>
                <p>{HD_lANG['beginTit2'][globalLang]}</p>
                <img src={img1} alt=""/>
                <span className="create" onClick={this.createWallet}>{HD_lANG['beginTit3'][globalLang]}</span>
                <span className="import" onClick={this.importWallet}>{HD_lANG['beginTit4'][globalLang]}</span>
                <div className="tips">{HD_lANG['beginTit7'][globalLang]}
                </div>
                {/*<div className={this.state.setPassIsHidden ? "set-pass set-pass-hidden" : "set-pass"}>
                    <h2>设置钱包密码</h2>
                    <h3 className="pass-text">{this.state.inputPassVal}</h3>
                    <div className="btn">
                        <span><em className={this.state.isImportFirst ? "on" : ""}></em></span>
                        <span><em className={this.state.isImportSecond ? "on" : ""}></em></span>
                        <span><em className={this.state.isImportThird ? "on" : ""}></em></span>
                        <span><em className={this.state.isImportFourth ? "on" : ""}></em></span>
                        <span><em className={this.state.isImportFiveth ? "on" : ""}></em></span>
                    </div>
                    <input type="password" maxLength="5" onChange={this.changePassWord} id="passInput" />
                    <input type="password" maxLength="5" onChange={this.changePassWord2} id="passInput2" />
                </div>
                <div className={this.state.lockIsHidden ? "hidden" : "lock-screen"} onClick={this.closePop}></div>*/}
            </div>
        )
    }
}



export default WalletBegin;