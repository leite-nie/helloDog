import React from 'react';
import img1 from '../../../images/wallet-my-1.png';
import img2 from '../../../images/wallet-my-2.png';
import winAlert  from '../../winAlert.js';

import common from '../../common';

class MyWallet extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            privateKey : "",
            inputPassVal : HD_lANG['importTit0'][globalLang],
            passVal : "",
            passVal2 : ""
        }
        this.importWallet = this.importWallet.bind(this);
        this.getPrivateKey = this.getPrivateKey.bind(this);
        this.changePassWord1 = this.changePassWord1.bind(this);
        this.changePassWord2 =this.changePassWord2.bind(this);
    }
    importWallet(){

        let privateVal = this.state.privateKey;
        let passVal = this.state.passVal;
        let passVal2 = this.state.passVal2;
        if( passVal == passVal2 && passVal.length == 6 ){ //密码正确
            if( web3.utils.isHexStrict(privateVal) && privateVal.length >= 66){
                //创建一个空钱包
                let data = web3.eth.accounts.wallet.create(0);
                console.log(data);
                common.loading()
                setTimeout(()=>{
                    let data2 = web3.eth.accounts.wallet.add(privateVal);
                    localStorage.setItem("address",data2.address);
                    localStorage.setItem("privateKey",data2.privateKey);
                    localStorage.setItem("passWord",passVal);
                    common.setCookie("privateKey",data2.privateKey,'d7');
                    common.setCookie("passWord",passVal,"d7");
                    //console.log(data2);
                    
                    setTimeout(()=>{
                       //data[0] 为导入私钥时候，钱包自动生成的第一个账号
                        web3.eth.accounts.wallet.save(passVal);
                        $http('/user/userInfo', {walletAddress : data2.address}).then(function(res) {
                            common.removeLoading()
                            var isHasUserInfo = "0";
                            if(res.code == "0000"){

                                if(!res.returnObj){
                                    isHasUserInfo = "0"
                                }else{
                                    isHasUserInfo = "1"
                                }

                            }else {
                                isHasUserInfo = "0"
                            }
                            
                            try{
                               // alert("密码："+passVal)
                                let str = data2.address+"="+passVal;

                                if( common.isIos() ){
                                    //alert("准备调用didFinishCreateWallet+saveCoreInfoForKey")
                                    window.webkit.messageHandlers.didFinishCreateWallet.postMessage(isHasUserInfo);
                                    window.webkit.messageHandlers.saveCoreInfoForKey.postMessage(str);

                                }else{

                                    window.ScriptAction.saveCoreInfoForKey(str);
                                    window.ScriptAction.didFinishCreateWallet(isHasUserInfo);
                                }
                                console.log(1)
                            }catch (e){
                                console.log(e)
                                setTimeout(()=>{
                                    window.location.href = "/mobile/wallet/myWallet.html"
                                },300)
                            }
                        })
                    },200)
                },200)
            }else {
                winAlert.show(HD_lANG['importTit1'][globalLang])
            }
        }else{
            winAlert.show(HD_lANG['importTit2'][globalLang]);
            return false;
        }


    }
    changePassWord2(event){
        let value = event.currentTarget.value;
        if(value.length ==6 ){
            this.setState({
                passVal : value
            })
        }
    }
    changePassWord1(event){
        let value = event.currentTarget.value;
        if(value.length ==6 ){
            this.setState({
                passVal2 : value
            })
        }
    }
    getPrivateKey(event){
        let value = event.currentTarget.value;
        if(value.substring(0,2) != '0x'){
            value = '0x'+value;
        }
        this.setState({
            privateKey : value
        })

    }
    componentWillMount(){
        document.title = HD_lANG['importTit'][globalLang];
    }
    onCopy(){
        this.setState({
            copied: true,
            copyText : HD_lANG['importTit3'][globalLang]
        });
    }

    render(){
        return(
            <div className="import-wallet-wrap">
                <h2>{HD_lANG['importTit4'][globalLang]}</h2>
                <p>{HD_lANG['importTit5'][globalLang]}</p>
                <p>{HD_lANG['importTit6'][globalLang]}</p>
                <h3>{HD_lANG['importTit7'][globalLang]}</h3>
                <input type="password" placeholder={HD_lANG['importTit10'][globalLang]} maxLength="6" onChange={this.changePassWord1} />
                <h3>{HD_lANG['importTit8'][globalLang]}</h3>
                <input type="password" placeholder={HD_lANG['importTit11'][globalLang]} maxLength="6" onChange={this.changePassWord2} />
                <h3>{HD_lANG['importTit9'][globalLang]}</h3>
                <input type="text" placeholder={HD_lANG['importTit12'][globalLang]}  onChange={this.getPrivateKey} />
                <button onClick={this.importWallet}>{HD_lANG['importTit13'][globalLang]}</button>
            </div>
        )
    }
}



export default MyWallet;