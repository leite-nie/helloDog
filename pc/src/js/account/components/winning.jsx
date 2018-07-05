import React from 'react';


import WinAlert  from '../../base/components/winAlert.jsx';
window.WinAlert = WinAlert;
import {switchCoolDownIndex,getBgColorClass} from '../../base/common.js'
class Winning extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            winLevel : "",//0-6
            leastAmount : "0",
            level : 0,
            imgHost : "",
            dogObj : {},
            lotteryAmount :0,
            ajaxMessage : ""
        }
        this.cancelConvert = this.cancelConvert.bind(this);
        this.confirmConvert = this.confirmConvert.bind(this);
    }
    cancelConvert(){
        window.location.href = '/mydog/petCenter.html'
    }
    confirmConvert(){
        let level = this.state.level;
        let _id =  getUrlPar("id");
        if(level==0){
            WinAlert.show(HD_lANG['winning5'][globalLang]);
        }else if(this.state.dogObj.status == 1){
            WinAlert.show(HD_lANG['winning6'][globalLang]);
        }else if(this.state.dogObj.status == 2){
            WinAlert.show(HD_lANG['winning7'][globalLang]);
        }else {
            dogMetacoin.registerLottery(_id,{gasPrice:defaultGasPrice,from:defaultAccount},function (err,res) {
                if(!err){
                    localStorage.setItem("hash",res);
                    WinAlert.show("<p style='font-size:24px; color: red;'>"+HD_lANG['winning8'][globalLang]+"</p><p>"+HD_lANG['winning9'][globalLang]+"</p>",function () {
                        window.location.href = "/mydog/petCenter.html";
                    });

                }
            })
        }
    }
    getDogInfo(){
        let _id =  getUrlPar("id");
        let _this = this;
        $.ajax({
            url : api_host + "/dog/dogInfo",
            data :{
                dogId :_id
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {
                    let dogObj =data.returnObj.dog;
                    let level = dogObj.lotteryLevel;
                    _this.setState({
                        winLevel : HD_lANG['winning0-'+level+''][globalLang],
                        level : level,
                        imgHost : data.returnObj.imgHost,
                        dogObj : data.returnObj.dog
                    })
                }
            }
        });
        $.ajax({
            url : api_host + "/lottery/registLottery",
            data :{
                dogId :_id
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000") {

                    _this.setState({
                        lotteryAmount : (data.returnObj.lotteryAmount).toString().substring(0,6)
                    })
                }else if(data.code == "1401") {
                    _this.setState({
                        ajaxMessage : HD_lANG['ajaxMessage1'][globalLang]
                    })
                }else if(data.code == "1402") {
                    _this.setState({
                        ajaxMessage : HD_lANG['ajaxMessage2'][globalLang]
                    })
                }else if(data.code == "1403") {
                    _this.setState({
                        ajaxMessage : HD_lANG['ajaxMessage3'][globalLang]
                    })
                }
            }
        });
    }
    componentWillMount(){
        document.title = HD_lANG['winning-title'][globalLang];
        this.getDogInfo();
    }
    render(){
        return(
            <div className="win-area">
                <div className="win-top"></div>
                <div className="win-box">
                    <div className="sub-win">
                        <h2>{this.state.winLevel}</h2>
                        {this.state.lotteryAmount == 0 ? <h3>{this.state.ajaxMessage}</h3> :
                        <h3>{HD_lANG['winning1'][globalLang]}{this.state.lotteryAmount}ETH</h3>
                        }
                        <div className={"img-box img-bg" + getBgColorClass(this.state.dogObj.genesStr, 7)}>
                            {!this.state.imgHost ? "" :
                            <img src={this.state.imgHost +this.state.dogObj.genesStr + ".png" } alt="" />
                            }
                        </div>
                        <div className="dog-attr"><p><span>{this.state.dogObj.dogName}</span><em>·</em>{this.state.dogObj.generation}{HD_lANG['list7'][globalLang]}<em>·</em>{switchCoolDownIndex(this.state.dogObj.coolDownIndex)}</p></div>
                        <div className="btn">
                            <span onClick={this.cancelConvert}>{HD_lANG['winning2'][globalLang]}</span>
                            {this.state.lotteryAmount == 0 ? "" :
                            <span onClick={this.confirmConvert} className="select">{HD_lANG['winning3'][globalLang]}</span>
                            }
                        </div>
                        <div className="txt">{HD_lANG['winning4'][globalLang]}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Winning;