import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import winAlert from '../../winAlert.js';
import common from '../../common.js'

import img1 from '../../../images/headImg.png';

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            nickName: '',
            addressVal: 0,
            profit: 0,
            total: 0,
            redoundMoney : 0,
            ogcAmount :0,
            copied: false,
        }
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    componentWillMount(){

    }
    componentDidMount() {
        common.setPageTitle(HD_lANG['myself-tit'][globalLang])
        let _this = this;
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
            //window.location.href = "/mobile/wallet/begin.html";
        }else if(window.html5NeedToPass ){ //网页版需要输入密码
            try{
                if( common.isIos() ){
                    window.webkit.messageHandlers.presentNewPage.postMessage("/mobile/wallet/myWallet.html");
                }else{
                    window.ScriptAction.presentNewPage("/mobile/wallet/myWallet.html");
                }
            }catch (e){
                window.location.href= "/mobile/wallet/myWallet.html";
            }
            return false;
        }else{

        }
        setTimeout(()=>{
            _this.getMasterInfo();
            _this.getUserBalance();
            _this.getMyDogList(0, 1, 1);
        },300)

    }

    // 获取个人信息
    getMasterInfo() {
        var _this = this;
        $http('/user/userInfo', {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' ){

                _this.setState({
                    nickName: data.returnObj.nickName,
                    addressVal: data.returnObj.address,
                    redoundMoney: data.returnObj.redoundMoney,
                    //profit: data.returnObj.profit,
                })
            }else if(data.code == "1200"){
                try{
                    if( common.isIos() ){
                        window.webkit.messageHandlers.pushNewPage.postMessage("/mobile/myself/setting.html");
                    }else{
                        window.ScriptAction.pushNewPage("/mobile/myself/setting.html");
                    }
                }catch (e){
                    window.location.href= "/mobile/myself/setting.html";
                }
            }
        })
    }

    onCopy(e) {//copy事件
        this.setState({copied: true});
        winAlert.show(HD_lANG['alert7'][globalLang])
    }

    getUserBalance(){
        let _this = this;
        web3.eth.getBalance(defaultAccount).then(function(data){
            let _amount= web3.utils.fromWei(data).substring(0,8);
            _this.setState({
                profit : _amount,

            })

        })
    }
    // 获取狗狗
    getMyDogList(type, page, pageSize) {
        var _this = this
        _this.setState({
            curType: type
        })
        $http('/dog/myDogList', {
            walletAddress: defaultAccount,
            listType : type,    //0-所有 1-官方 2-出售 3-租赁
            toPage : page,
            pageSize : this.state.pageSize
        }).then(function(data) {
            if(data.code == '0000') {
                _this.setState({
                    total: data.returnObj.total,
                })
            }
        })
    }
    render(){
        return(
            <div className="myself-wrap">
                <div className="myself-info">
                    <div className="cnt">
                        <div className="pic">
                            <img src={img1} alt="headImg"/>
                        </div>
                        <CopyToClipboard text={this.state.addressVal} onCopy={this.onCopy.bind(this)}>
                            <div className="addr">{HD_lANG['saveinfo6'][globalLang]}<div className="stg">{this.state.addressVal}</div></div>
                        </CopyToClipboard>
                        <div className="total">
                            <div className="cell">
                                <span className="num">{this.state.total}</span>
                                <span className="txt">{HD_lANG['myself1'][globalLang]}</span>
                            </div>
                            <div className="cell">
                                <span className="num">{this.state.profit}</span>
                                <span className="txt">{HD_lANG['myself2'][globalLang]}(ETH)</span>
                            </div>

                            <div className="cell">
                                <span className="num">{this.state.redoundMoney}</span>
                                <span className="txt" onClick={this.pushMethod.bind(this,"/mobile/myself/invite.html")}>{HD_lANG['myself2'][globalLang]}(OGC)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="/mobile/myself/invite.html"  onClick={this.pushMethod.bind(this,"/mobile/myself/invite.html")} className="advertise">
                    {/*<div className="tit">邀请有礼</div>
                    <div className="sub">邀请好友注册即可获得二重大礼包</div>
                    <span className="icon-arrows"></span>*/}
                </a>

                <div className="myself-nav">
                    <ul>
                        <li>
                            <a href="/mobile/wallet/myWallet.html" onClick={this.pushMethod.bind(this,"/mobile/wallet/myWallet.html")}>
                                <span className="icon-wallet3">{HD_lANG['myself3'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/index/acquire.html" onClick={this.pushMethod.bind(this,"/mobile/index/acquire.html")}>
                                <span className="icon-earnings3">{HD_lANG['petCenter3'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/myself/translist.html" onClick={this.pushMethod.bind(this,"/mobile/myself/translist.html")}>
                                <span className="icon-translist">{HD_lANG['translist-tit'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/myself/notice.html" onClick={this.pushMethod.bind(this,"/mobile/myself/notice.html")}>
                                <span className="icon-notice">{HD_lANG['header7'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/myself/playing.html" onClick={this.pushMethod.bind(this,"/mobile/myself/playing.html")}>
                                <span className="icon-method" >{HD_lANG['myself4'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/myself/question.html" onClick={this.pushMethod.bind(this,"/mobile/myself/question.html")}>
                                <span className="icon-question">{HD_lANG['footer6'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/myself/feedback.html" onClick={this.pushMethod.bind(this,"/mobile/myself/feedback.html")}>
                                <span className="icon-reply">{HD_lANG['feedback-tit'][globalLang]}</span>
                            </a>
                        </li>
                        <li>
                            <a href="/mobile/myself/setting.html" onClick={this.pushMethod.bind(this,"/mobile/myself/setting.html")}>
                                <span className="icon-setting">{HD_lANG['myself5'][globalLang]}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}



export default Index;