import React from 'react';
import WinAlert from '../../base/components/winAlert.jsx';
import {getBgColorClass} from '../../base/common.js'

class SaleIng extends React.Component {

    constructor(props) {
        super(props)
        this.getDogInfo = this.getDogInfo.bind(this)
        this.sellDog = this.sellDog.bind(this)

        this.state = {
            dog: {},
            userInfo: {},
            imgHost: '',
        }
    }

    componentWillMount() {

        document.title = HD_lANG['petCenter13'][globalLang];
        let dogId = window.getUrlPar('id')
        this.getDogInfo(dogId)
    }

    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $.ajax({
            type: 'get',
            url : api_host + "/dog/dogInfo",
            data :{
                dogId : dogId
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000'){
                    _this.setState({
                        dog: data.returnObj.dog,
                        userInfo: data.returnObj.userInfo,
                        imgHost: data.returnObj.imgHost
                    })
                }
            }
        })
    }

    // 上架
    sellDog() {
        var dogId = getUrlPar('id');
        var _startPrice = this.refs.startPrice.value;
        var _endPrice = this.refs.endPrice.value;
        var _startDuration = this.refs.startDuration.value;
        _startPrice = Number(_startPrice);
        _startPrice = web3.toWei(_startPrice);
        _endPrice = Number(_endPrice);
        _endPrice = web3.toWei(_endPrice);
        _startDuration = Number(_startDuration)*3600*24;

        var action = getUrlPar('action');
        // 出售
        if(action == '1'){
            dogMetacoin.createSaleAuction(dogId,_startPrice,_endPrice,_startDuration, {gasPrice:defaultGasPrice,from: defaultAccount},function (error,result) {
                if(!error){
                    WinAlert.show(HD_lANG['alert1'][globalLang],function () {
                        localStorage.setItem("hash",result);
                        setTimeout(()=>{
                            window.location.href = "/mydog/petCenter.html";
                        },500)
                    })
                }
            })
        }
        // 挂到市场去给其他狗配种（育种）
        if(action == '2'){
            dogMetacoin.createSiringAuction(dogId,_startPrice,_endPrice,_startDuration, {gasPrice:defaultGasPrice,from: defaultAccount},function (error,result) {
                if(!error){
                    localStorage.setItem("hash",result);
                    WinAlert.show(HD_lANG['alert1'][globalLang],function () {
                        setTimeout(()=>{
                            window.location.href = "/mydog/petCenter.html";
                        },500)
                    })
                }
            })
        }
        
    }
    createMarkup(str,data) {
        if(!data.length) {
            return {__html: str};
        }else if(data.length == 1){
            str = str.replace('placeholder1',data[0]);
            return {__html: str};
        }else if(data.length == 2){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]);
            return {__html: str};
        }
    }
    render(){
        if(!this.state.imgHost) {
            return null
        }
        let imgUrl = this.state.dog.variation == 0 ? this.state.imgHost + this.state.dog.genesStr + '.png' : "http://www.haloudog.com/img/otherdog/variation.png";
        return(
            <div className="sale-area">
                <div className={"sale-top item-bd-" + getBgColorClass(this.state.dog.genesStr, 7)}></div>
                <div className="sale-box">
                    <div className="sub-sale">
                        <div className="step">
                            <span><em>{HD_lANG['saleing0'][globalLang]}</em></span>
                            <span><em>{HD_lANG['saleing1'][globalLang]}</em></span>
                            <span><em>{HD_lANG['saleing2'][globalLang]}</em></span>
                        </div>
                        <div className="img-box">
                            <img src={imgUrl} alt=""/>
                            <h2>{this.state.dog.dogName}</h2>
                            <h3 className={name.generation == 0 ? "isGen0" : ""}>{this.state.dog.generation}{HD_lANG['list7'][globalLang]}</h3>
                            <p  dangerouslySetInnerHTML={this.createMarkup(HD_lANG['saleing8'][globalLang],[this.state.dog.dogName])}></p>
                        </div>
                        <div className="amount-box">

                            <label className="AuctionForm-row" htmlFor="field-startPrice">
                                <span className="AuctionForm-title">{HD_lANG['saleing3'][globalLang]}</span>
                                <span className="AuctionForm-unit">Ξ</span>
                                <input type="number" step="0.001" min="0" ref="startPrice" className="AuctionForm-value" defaultValue="0.01" id="input-startPrice" />
                            </label>
                            <label className="AuctionForm-row" htmlFor="field-endPrice">
                                <span className="AuctionForm-title">{HD_lANG['saleing4'][globalLang]}</span>
                                <span className="AuctionForm-unit">Ξ</span>
                                <input type="number" step="0.001" min="0" ref="endPrice" className="AuctionForm-value" defaultValue="0.005" id="input-endPrice" />
                            </label>
                            <label className="AuctionForm-row" htmlFor="field-duration">
                                <span className="AuctionForm-title">{HD_lANG['saleing5'][globalLang]}</span>
                                <span className="AuctionForm-unit">{HD_lANG['saleing6'][globalLang]}</span>
                                <input type="number" step="0.5" min="0" ref="startDuration" className="AuctionForm-value" defaultValue="2" id="input-duration" />
                            </label>
                            <div className="AuctionForm-row--submit">
                                <button className="AuctionForm-button" type="button" onClick={this.sellDog}>{HD_lANG['saleing7'][globalLang]}</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaleIng;