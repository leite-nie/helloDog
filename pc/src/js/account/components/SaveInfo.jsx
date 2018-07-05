import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import $ from 'jquery';
import WinAlert from '../../base/components/winAlert.jsx';

class SaveInfo extends React.Component {
    constructor(props) {
        super(props);

        //web3.eth.getA


        this.onCopy = this.onCopy.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getNickName = this.getNickName.bind(this);
        this.saveInfoFunc = this.saveInfoFunc.bind(this);

        this.state = {
            copied : false,
            email : '',
            nickName : '',
            addressVal : '',
            alertText : ''
        }




    }
    onCopy(e) {//copy事件
        this.setState({copied: true});
        WinAlert.show(HD_lANG['saveinfo0'][globalLang])
    }
    getEmail(event){
        this.setState({email: event.target.value});
        //console.log(event.target.value)

    }
    getNickName(event){
        this.setState({nickName: event.target.value});
    }
    saveInfoFunc(event){
        var _data = {};
        let _this = this;
        _data.walletAddress = this.state.addressVal;
        _data.email = this.state.email;
        _data.nickName = this.state.nickName;
        _data.inviterId = localStorage.getItem("invitationCode");
        var _reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if( !_reg.test(_data.email) ){
            WinAlert.show(HD_lANG['saveinfo1'][globalLang]);
            return false;
        }
        if( !_data.nickName ){
            WinAlert.show(HD_lANG['saveinfo2'][globalLang]);
            return false;
        }
        var isChecked = document.getElementById("checkBtn").checked;
        if( !isChecked ){
            WinAlert.show(HD_lANG['saveinfo3'][globalLang]);
            return false;
        }
        $.ajax({
            url : api_host + "/user/update",
            data :_data,
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000"){
                    WinAlert.show(HD_lANG['saveinfo4'][globalLang]);
                    setTimeout(()=>{
                        window.location.href = "/list/list.html";
                    },500)
                }
            }
        })
    }
    
    getUserInfo (){
        var _this = this;
        $.ajax({
            url : api_host + "/user/userInfo",
            data :{

                walletAddress : defaultAccount
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {
                    if(!data.returnObj){
                        return false;
                    }
                    _this.setState({
                        email: data.returnObj.email,
                        nickName: data.returnObj.nickName
                    })
                }
            }
        })
    }
    componentWillMount (){
        var _this = this;
        document.title = HD_lANG['saveinfo-tit'][globalLang];
        //setTimeout(function () {

            _this.setState({

                addressVal: (defaultAccount == "0x6bC4327c3A97CcEA19F61BEf89280B55f330122d" ? "" :  defaultAccount || "")
            })

            _this.getUserInfo();
        //},1200)



    }

    componentDidMount (){

    }
    render(){

        return(
            <div className="info-main">

                <div className="info-box">
                    <div className="title">{HD_lANG['saveinfo5'][globalLang]}</div>
                    <div className="info-list">
                        <div className="list">
                            <p className="tit-name">{HD_lANG['saveinfo6'][globalLang]}</p>
                            <div className="add-div">
                                <input type="text" className="address"  readOnly={true} value={this.state.addressVal} />
                                <CopyToClipboard text={this.state.addressVal} onCopy={this.onCopy}>
                                    <span className="copy">{HD_lANG['saveinfo7'][globalLang]}</span>
                                </CopyToClipboard>
                            </div>

                        </div>
                        <div className="list">
                            <p className="tit-name">{HD_lANG['saveinfo8'][globalLang]}<span>*</span>：</p>
                            <input type="email" placeholder={HD_lANG['saveinfo13'][globalLang]} onChange={this.getEmail}  value={this.state.email} />
                        </div>
                        <div className="list">
                            <p className="tit-name">{HD_lANG['saveinfo9'][globalLang]}<span>*</span>：</p>
                            <input type="text" maxLength="14" placeholder={HD_lANG['saveinfo14'][globalLang]} onChange={this.getNickName} value={this.state.nickName} />
                        </div>
                        <div className="info-agreement">
                            <input type="checkbox"  id="checkBtn"  />
                            <span><a href="/contract.html" target="_blank">{HD_lANG['saveinfo10'][globalLang]}</a></span>
                        </div>
                        <div className="info-txt">
                            {HD_lANG['saveinfo11'][globalLang]}
                        </div>
                        <div className="info-btn"><button type="submit" onClick={this.saveInfoFunc}> {HD_lANG['saveinfo12'][globalLang]}</button></div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default SaveInfo;
