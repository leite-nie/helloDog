import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import WinAlert from '../../base/components/winAlert.jsx';

// 分享组件
// require('../../lib/share/social-share.min.js')
require('../../../css/lib/share/share.min.scss')


class Share extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div className="share-wrap social-share"
                 data-initialized="false"
                 data-description={HD_lANG['friends8'][globalLang]}
                 data-weibo-title={HD_lANG['friends8'][globalLang]}
                 data-qq-title={HD_lANG['friends8'][globalLang]}
                 data-url={this.props.data.addressVal + this.props.data.accountId}
                 data-wechat-qrcode-title={HD_lANG['friends6'][globalLang]}
                 data-wechat-qrcode-helper={HD_lANG['friends7'][globalLang]}
            >
                <span className="label">{HD_lANG['friends5'][globalLang]}：</span>
                <a href="#" className="share-icon icon-qq"></a>
                <a href="#" className="share-icon icon-wechat"></a>
                <a href="#" className="share-icon icon-weibo"></a>
            </div>
        )
    }
}
class Friends extends React.Component {
    constructor(props) {
        super(props);

        this.onCopy = this.onCopy.bind(this);
        this.state = {
            copied: false,
            addressVal: base_host + '/?invitationCode=',
            accountId : ""
        }
    }
    getUserInfo (){
        var _this = this;
        if(!defaultAccount || defaultAccount == "0x6bC4327c3A97CcEA19F61BEf89280B55f330122d"){
            window.location.href = "/account/login.html"
            return false;
        }
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
                       accountId:data.returnObj.userId
                    })
                    setTimeout(()=>{
                        require('../../lib/share/social-share.min.js');
                    },500)
                }
            }
        })
    }
    componentDidMount() {


    }
    componentWillMount(){
        this.getUserInfo();
    }
    onCopy(e) {//copy事件
        this.setState({copied: true});
        WinAlert.show(HD_lANG['saveinfo0'][globalLang]) 
    }

    render(){
        return(
            <div className="friends">
                <div className="fri-wrap">
                    <div className="tit">{HD_lANG['friends1'][globalLang]}</div>

                    <div className="invite">
                        <div className="invite-wrap">
                            <div className="row">
                                <label htmlFor="addr">{HD_lANG['friends2'][globalLang]}：</label>
                                <input type="text" id="addr" className="addr" defaultValue={defaultAccount} readOnly={true} />
                            </div>

                            <div className="row">
                                <label htmlFor="url">{HD_lANG['friends3'][globalLang]}：</label>
                                <input type="text" id="url" className="url" readOnly={true} value={this.state.addressVal+this.state.accountId}/>
                                <CopyToClipboard text={this.state.addressVal+this.state.accountId} onCopy={this.onCopy}>
                                    <div className="btn-copy">{HD_lANG['friends4'][globalLang]}</div>
                                </CopyToClipboard>
                            </div>

                            <div className="row share">
                                <Share data={this.state} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Friends;