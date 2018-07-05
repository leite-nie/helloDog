import React from 'react';
import common from '../../common.js'

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profit: 0
        }
    }
    componentDidMount() {
        common.setPageTitle(HD_lANG['earning1'][globalLang])
    }
    componentWillMount(){
        this.getMyInfo()
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
     // 获取个人信息
    getMyInfo() {
        var _this = this;
        $http("/user/userInfo", {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' && data.returnObj){
                _this.setState({
                    profit: data.returnObj.profit,
                })
            }else if(data.code == "1200"){ //该地址 没有保存用户名和邮箱
                _this.pushMethod('/mobile/myself/setting.html')
                // try{
                //     if( common.isIos() ){
                //         window.webkit.messageHandlers.pushNewPage.postMessage("/mobile/myself/setting.html");
                //     }else{
                //         window.ScriptAction.pushNewPage("/mobile/myself/setting.html");
                //     }
                // }catch (e){
                //     window.location.href = "/mobile/myself/setting.html";
                // }
            }
        })
    }
    render(){
        return(
            <div className="acquire-wrap">
                <div className="acquire-cnt">
                    <div className="tit">{HD_lANG['earning7'][globalLang]}<span className="stg">{this.state.profit}ETH</span></div>

                    <a href="/mobile/myself/earnings.html" onClick={this.pushMethod.bind(this,"/mobile/myself/earnings.html")}  className="btn-def btn-sty2">
                        <span className="icon-doc">{HD_lANG['earning8'][globalLang]}</span>
                    </a>
                    
                    <a href="/mobile/myself/zeroBonus.html" onClick={this.pushMethod.bind(this,"/mobile/myself/zeroBonus.html")}  className="btn-def btn-sty2">
                        <span className="icon-doc">{HD_lANG['earning13'][globalLang]}</span>
                    </a>

                    <a href="/mobile/myself/redeem.html" onClick={this.pushMethod.bind(this,"/mobile/myself/redeem.html")}  className="btn-def btn-sty2">
                        <span className="icon-doc">{HD_lANG['redeem2'][globalLang]}</span>
                    </a>

                    <div className="info">
                        <p>
                            {HD_lANG['earning0'][globalLang]}
                        </p>
                        <p>
                            {HD_lANG['earning10'][globalLang]}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail;