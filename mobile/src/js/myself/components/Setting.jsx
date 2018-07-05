import React from 'react';
import $ from 'n-zepto';
import common from '../../common.js';
import winAlert from '../../winAlert.js';

class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            inviteCode: "",
            nickName : "",
            isSend : false,
            isSign: false,
            mobile : "",
            verifyCode : "",
            isNeedInputMobile : false
        }
    }
    componentWillMount (){
        var _this = this;
        _this.setState({
            addressVal: (defaultAccount || "")
        })
        _this.getUserInfo();
        common.setPageTitle(HD_lANG['myself5'][globalLang])
    }
    getEmail(event){
        this.setState({email: event.target.value});
    }
    getNickName(event){
        this.setState({nickName: event.target.value});
    }
    getInviteCode(event){
        let val = event.target.value;
        this.setState({inviteCode: val});
        if(val){
            this.setState({isNeedInputMobile:true})
        }else{
            this.setState({isNeedInputMobile:false})
        }
    }
    getUserInfo (){
        let _this = this;
        $http('/user/userInfo', {walletAddress : defaultAccount}).then(function(data) {
            if(data.code == "0000"){
                if(!data.returnObj){
                    return false;
                }
                _this.setState({
                    email: data.returnObj.email,
                    nickName: data.returnObj.nickName,
                    isSign: true,
                })
            }
        })


    }
    saveUserInfo(){
        var _data = {};
        let _this = this;
        _data.walletAddress = this.state.addressVal;
        _data.email = this.state.email;
        _data.nickName = this.state.nickName;
        _data.invitationCode = this.state.inviteCode;
        _data.mobile = this.state.mobile;
        _data.verifyCode = this.state.verifyCode;
        var _reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        var _reg2 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if( !_reg.test(_data.email) ){
            winAlert.show(HD_lANG['saveinfo1'][globalLang]);
            return false;
        }
        if( !_data.nickName ){
            winAlert.show(HD_lANG['saveinfo2'][globalLang]);
            return false;
        }

        if(_data.invitationCode){ //邀请码存在，则手机号码，必填
            if( !_reg2.test(_data.mobile)){
                winAlert.show(HD_lANG['saveinfo19'][globalLang]);
                return false;
            }
            if( _data.verifyCode.length != 6){
                winAlert.show(HD_lANG['saveinfo20'][globalLang]);
                return false;
            }
        }


        common.loading();
        $http('/user/update', _data).then(function(data) {
            common.removeLoading();
            if(data.code == "0000"){
                try{
                    if( common.isIos() ){
                        window.webkit.messageHandlers.didFinishCreateEmail.postMessage(null)
                    }else{

                        window.ScriptAction.didFinishCreateEmail();
                    }
                }catch (e){}
                winAlert.show(HD_lANG['saveinfo4'][globalLang],function () {
                    try{
                        if( common.isIos() ){
                            window.webkit.messageHandlers.popLastPage.postMessage(null)
                        }else{

                            window.ScriptAction.popLastPage();
                        }
                    }catch (e){
                        window.location.href = "/mobile/myself/myself.html";
                    }
                });
                setTimeout(()=>{
                    try{
                        if( common.isIos() ){
                            window.webkit.messageHandlers.popLastPage.postMessage(null)
                        }else{

                            window.ScriptAction.popLastPage();
                        }
                    }catch (e){
                        window.location.href = "/mobile/myself/myself.html";
                    }
                },1000)
            }
        })

    }
    getMobileNumeber(event){
        this.setState({mobile: event.target.value});
        //console.log(this.state.mobile)
    }
    getMobileCode(event){

        this.setState({verifyCode: event.target.value});
    }
    getMobileCodeFunc(){
        let _this = this;
        if(this.state.isSend){
            return false;
        }
        var _mobileNumber = this.state.mobile;
        var _reg2 = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if( !_reg2.test(_mobileNumber) ){
            winAlert.show(HD_lANG['saveinfo19'][globalLang]);
            return false;
        }
        $http('/user/sendMobileVerify', {mobile : _mobileNumber}).then(function(data) {
            if(data.code == "0000"){
                if(!data.returnObj){
                    _this.setState({
                        isSend: true
                    });
                   _this.downTime();
                }

            }else{
                winAlert.show(HD_lANG['alert11'][globalLang])
            }
        })
    }
    downTime(){
        let _this = this;
        var _obj = document.getElementById("downTime");
        var _time = 60;
        var _timer = setInterval(()=>{
            _time--;
            _obj.innerHTML =  _time + "s";
            if(_time <= 0){

                clearInterval(_timer);
                _this.setState({
                    isSend: false
                });
                _obj.innerHTML =  HD_lANG['myself15'][globalLang]
            }
        },1000)
    }
    createMarkup() {
        return {__html: HD_lANG['myself16'][globalLang]};
    }
    render(){
        return(
            <div className="setting-wrap">
                <ul className="settig-list">
                    <li className="clearfix">
                        <span>{HD_lANG['myself6'][globalLang]}</span>
                        <input type="text" placeholder={HD_lANG['saveinfo14'][globalLang]} value={this.state.nickName} onChange={this.getNickName.bind(this)} />
                        {/* <input type="text"  placeholder={this.state.nickName?this.state.nickName:HD_lANG['saveinfo14'][globalLang]} defaultValue={this.state.nickName} onChange={this.getNickName.bind(this)} /> */}
                    </li>
                    <li className="clearfix">
                        <span>{HD_lANG['myself7'][globalLang]}</span>
                        <input type="text" placeholder={HD_lANG['saveinfo13'][globalLang]} value={this.state.email} onChange={this.getEmail.bind(this)}  />
                        {/* <input type="text"  placeholder={this.state.email?this.state.email:  HD_lANG['saveinfo13'][globalLang]} defaultValue={this.state.email} onChange={this.getEmail.bind(this)}  /> */}
                    </li>

                    {this.state.isSign ? "" :<li className="clearfix invite-li" dangerouslySetInnerHTML={this.createMarkup()}></li>}
                    {this.state.isSign ? "" :<li className="clearfix">
                        <span>{HD_lANG['myself8'][globalLang]}</span>
                        <input type="text" maxLength={"5"} placeholder={HD_lANG['saveinfo15'][globalLang]} onChange={this.getInviteCode.bind(this)}  />
                    </li>}
                    {this.state.isSign ? "" : this.state.isNeedInputMobile ? <li className="clearfix">
                        <span>{HD_lANG['myself17'][globalLang]}</span>
                        <input type="number" placeholder={HD_lANG['saveinfo16'][globalLang]} onChange={this.getMobileNumeber.bind(this)}  />
                    </li> : ""}
                    {this.state.isSign ? "" :this.state.isNeedInputMobile ? <li className="clearfix code-li">
                        <span>{HD_lANG['myself18'][globalLang]}</span>
                        <input type="text" placeholder={HD_lANG['saveinfo17'][globalLang]} onChange={this.getMobileCode.bind(this)} maxLength="6"  />
                        <em id="downTime" className={this.state.isSend ? "noclick" : ""} onClick={this.getMobileCodeFunc.bind(this)}>{HD_lANG['myself19'][globalLang]}</em>
                    </li>:""}

                    <li className="clearfix last">
                        <button onClick={this.saveUserInfo.bind(this)}>{HD_lANG['saveinfo18'][globalLang]}</button>
                    </li>

                </ul>
            </div>
        )
    }
}



export default Index;