import React from 'react';
import common from '../../common.js'

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    goBack() {
        var historyUrl = document.referrer;
        if( historyUrl.indexOf("/begin.html") > -1 ){
            window.location.href = "/mobile/myself/setting.html";
            return false;
        }else{
            window.history.go(-1)
        }
    }
    render(){
        if(common.isApp()){
            return null
        }
        // 头部样式2
        let hearderSty = this.props.hearderSty
        // 返回按钮
        let hasBackBtn = this.props.hasBack

        return(
            <div className={hearderSty ? 'header header2' : 'header'}>
                <div className="left-icons">
                    {!hasBackBtn ? <a href="javascript:;" className="back icon-back" onClick={this.goBack.bind(this)}></a> : null}
                </div>
                <h1>
                    {this.props.title && this.props.title}
                    {this.props.logo && <img src={this.props.logo} alt="logo" />}
                </h1>
                <div className="right-icons">
                    <a href="/mobile/index/acquire.html" onClick={this.pushMethod.bind(this,"/mobile/index/acquire.html")} className="icon-earnings"></a>
                    <a href="/mobile/wallet/myWallet.html" onClick={this.pushMethod.bind(this, "/mobile/wallet/myWallet.html")} className="icon-wallet"></a>
                </div>
            </div>
        )
    }
}



export default Header;