import React from 'react';
import $ from 'n-zepto';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import common from '../../common.js';
import winAlert from '../../winAlert.js';


class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false,
            addressVal: 'http://www.haloudog.com/mobile/activity.html?invitationCode=',
            accountId : "",
            invitaionNum : 0,
            invitationCode: '',
            ogcAmount: 0,
            coefficient: 0,
            redoundMoney : '',
            isGet : '',
            total: 0,
            // styleWidth1: 0,
            // styleWidth2: 0
        }
    }
    componentDidMount() {
        this.getUserInfo();
        this.getMyDogList(0, 1, 1)
        common.setPageTitle(HD_lANG['header8'][globalLang])
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    onCopy(e) {//copy事件
        this.setState({copied: true});
        winAlert.show(HD_lANG['alert7'][globalLang])
    }
    getUserInfo (){
        var _this = this;
        $http('/user/userInfo', {walletAddress : defaultAccount}).then(function(data) {
            if(data.code == "0000") {
                if(!data.returnObj){
                    return false;
                }
                _this.setState({
                    accountId:data.returnObj.userId,
                    canGetOGC: data.returnObj.canGetOGC,
                    redoundMoney : data.returnObj.redoundMoney,
                    coefficient: data.returnObj.coefficient,
                    invitaionNum : data.returnObj.invitaionNum,
                    invitationCode : data.returnObj.invitationCode,
                    isGet: (data.returnObj.canGetOGC <=0 ? 0 : data.returnObj.isGet)
                    // styleWidth1 : ( (data.returnObj.invitaionNum > 20 ? 20 : data.returnObj.invitaionNum) /20 + "%"),
                    // styleWidth2 : ( (data.returnObj.invitaionNum > 60 ? 60 : data.returnObj.invitaionNum)/60  + "%"),
                })

            }
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
    gototransfer(url, event) {
        this.pushMethod(url, event)
    }
    share(){
        let _this = this;
        let shareObj = {
            type : 2,
            content : HD_lANG['header10'][globalLang],
            title : HD_lANG['header8'][globalLang],
            url : this.state.addressVal + this.state.invitationCode,
        }
        let str = JSON.stringify(shareObj);
        try{
            if(common.isIos()){
                window.webkit.messageHandlers.shareWithUmeng.postMessage(str)
            }else{
                window.ScriptAction.shareWithUmeng(str);
            }
        }catch (e){
            window.location.href = shareObj.url
        }
    }
    // 领取回报
    getCoefficient() {
        if(!this.state.isGet){
            return false;
        }
        common.loading()
        $http('/user/getCoefficient', {
            walletAddress: window.defaultAccount,
        }).then(function(data) {
            common.removeLoading()
            // redoundMoney
            if(data.code == '0000') {
                winAlert.show(HD_lANG['alert8'][globalLang], function() {
                    window.location.reload()
                });
                // this.setState((preState) => {
                //     return {
                //         ogcAmount: Number(data.returnObj.redoundMoney) + Number(preState.ogcAmount)
                //     }
                // })
            }else{
                winAlert.show(HD_lANG['alert10'][globalLang]);
            }
            if(data.code == '1227') {
                winAlert.show(HD_lANG['alert9'][globalLang]);
            }
        })
    }
    render(){
        return(
            <div className="invite-wrap">
                <div className="invite-ban"></div>
                <div className="invite-box">
                    <div className="top clearfix">
                        <div className="top-left">{HD_lANG['friends6'][globalLang]}</div>
                        <div className="top-rgt">
                            <span>{this.state.redoundMoney}</span>
                            <i>(OGC)</i>
                        </div>
                    </div>
                    <div className="getOgc-box">
                        <h2>
                            <span>{this.state.canGetOGC}</span>
                            <i>(OGC)</i>
                        </h2>
                        <h3>{HD_lANG['friends7'][globalLang]}：{this.state.coefficient}</h3>
                        <div className="two-btn">
                            <button onClick={this.getCoefficient.bind(this)} className={!this.state.isGet ? "noclick" : ""} >{HD_lANG['friends8'][globalLang]}</button>
                            <button onClick={this.gototransfer.bind(this, '/mobile/myself/transfer.html')}>{HD_lANG['friends9'][globalLang]}</button>
                            <button onClick={this.gototransfer.bind(this, '/mobile/myself/ogclist.html')}>{HD_lANG['friends16'][globalLang]}</button>
                        </div>
                    </div>
                    <div className="ogc-txt">{HD_lANG['friends10'][globalLang]}
                        {HD_lANG['friends11'][globalLang]}</div>
                    <div className="ogc-list">
                        <p>{HD_lANG['friends12'][globalLang]}</p>
                        <span>+0.2{HD_lANG['friends7'][globalLang]}</span>
                        <em>{this.state.invitaionNum}/30</em>
                    </div>
                    <div className="ogc-tips">
                        {HD_lANG['friends17'][globalLang]}{this.state.total}
                    </div>
                    <div className="ogc-tips">
                        {HD_lANG['friends18'][globalLang]}
                    </div>
                    <div className="user-invite-code">
                        <CopyToClipboard text={this.state.invitationCode} onCopy={this.onCopy.bind(this)}>
                            <span>{HD_lANG['friends4'][globalLang]}</span>
                        </CopyToClipboard>
                        <div className="code">
                            <em>{HD_lANG['friends13'][globalLang]}</em>
                            <i>{this.state.invitationCode}</i>
                        </div>
                    </div>
                    <button className="share-btn" onClick={this.share.bind(this)}>{HD_lANG['friends5'][globalLang]}</button>
                    <div className="share-text">
                        {HD_lANG['friends14'][globalLang]}
                        {HD_lANG['friends15'][globalLang]}
                    </div>
                </div>
                {/*<div className="invite-ban"></div>
                
                <div className="invite-rate">
                    <div className="s-wrap">
                        <div className="tit">
                            <span>一重礼</span>
                        </div>
                        <div className="txt">邀请20个好友即可获得1代狗</div>
                        <div className="rate-wrap">
                            <span className="total">{this.state.invitaionNum}/20</span>
                            <span className="fill" style={{width:  this.state.styleWidth1 == "0%" ? "2%" : this.state.styleWidth1,}}></span>
                        </div>
                    </div>
                </div>

                <div className="invite-rate">
                    <div className="s-wrap">
                        <div className="tit">
                            <span>二重礼</span>
                        </div>
                        <div className="txt">邀请60个好友即可获得0代狗</div>
                        <div className="rate-wrap">
                            <span className="total">{this.state.invitaionNum}/60</span>
                            <span className="fill" style={{width: this.state.styleWidth2 == "0%" ? "2%" : this.state.styleWidth2}}></span>
                        </div>
                    </div>
                </div>

                <div className="invite-art">
                    <div className="s-wrap">
                        成功邀请好友并注册钱包，邀请20人你将获得一只1代狗，邀请越多奖励越多，最高邀请60可获得0代狗，兑换奖励请可入官方QQ群：547351294联系客服。
                    </div>
                </div>

                <div className="btn-wrap">
                    <div className="s-wrap">
                        <CopyToClipboard text={this.state.addressVal+this.state.accountId} onCopy={this.onCopy.bind(this)}>
                            <div className="btn-def">复制邀请链接</div>
                        </CopyToClipboard>
                    </div>
                </div>*/}

            </div>
        )
    }
}



export default Index;