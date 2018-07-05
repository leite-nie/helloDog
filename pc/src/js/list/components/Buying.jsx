import React from 'react'
import WinAlert from '../../base/components/winAlert.jsx';

import {switchCoolDownIndex, getBgColorClass} from '../../base/common.js'

class Buying extends React.Component {
    constructor(props) {
        super(props)
        this.getDogInfo = this.getDogInfo.bind(this)
        this.getCurrentPrice = this.getCurrentPrice.bind(this)
        this.submit = this.submit.bind(this)

        this.state = {
            dog: {},
            userInfo: {},
            imgHost: '',
        }
    }

    componentWillMount() {
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

    // 获取当前价格
    getCurrentPrice(dogId, fn) {
        buyDogMeta.getCurrentPrice(dogId, function(error, result){
            if (!error){
                var price = result.toString()
                fn(price);
            }
        });
    }

    // 购买
    submit(currentPrice) {
        var dogId = getUrlPar('id');
        dogId = Number(dogId);

         this.getCurrentPrice(dogId, function(currentPrice) {
            currentPrice = Number(web3.fromWei(currentPrice)) + 0.0005;
            if(Number(currentPrice) > defaultAccountBalance) {
                WinAlert.show(HD_lANG['alert2'][globalLang])
                return;
            }
            dogMetacoin.bidOnSaleAuction(dogId,{gasPrice:defaultGasPrice,value: web3.toWei(currentPrice), from: defaultAccount},function (error,result) {
                if(!error){
                    localStorage.setItem("hash",result);
                    WinAlert.show(HD_lANG['alert1'][globalLang],function () {
                        setTimeout(()=>{
                            window.location.href = "/mydog/petCenter.html";
                        },500)
                    })
                }
            })
         })
    }

    render() {
        if(!this.state.imgHost){
            return null
        }
        let coolDownIndex = this.state.dog.coolDownIndex;
        let address = this.state.userInfo.address;
        let currentPrice = getUrlPar('curretP');
        let imgUrl = this.state.dog.variation == 0 ? this.state.imgHost + this.state.dog.genesStr + '.png' : "http://www.haloudog.com/img/otherdog/variation.png";

        return (
            <div className="petBuying">
                <div className={'banner item-bd-' + getBgColorClass(this.state.dog.genesStr, 7)}></div>

                <div className="buying-lay">
                    <div className={this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? 'wrap wrap-gens' : 'wrap'}>
                        <div className="summary">
                            <div className={this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? 'pic special-pic' : 'pic'}>
                                <img src={imgUrl} alt="pet"/>
                            </div>
                            <div className="tit">{this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? HD_lANG['list20'][globalLang] : this.state.dog.dogName}</div>
                            <div className="tit-sub">
                                <span>{this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? HD_lANG['list20'][globalLang] : this.state.dog.dogName}</span>
                                <span className={this.state.dog.generation == 0 ? "isGen0" : ""}>{this.state.dog.generation}{HD_lANG['petInfo3'][globalLang]}</span>

                                {this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? "" : <span>{HD_lANG['petInfo15'][globalLang]}</span>}
                                {this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? "" : <span>{switchCoolDownIndex(coolDownIndex)}</span>}
                                {this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? "" : <span className="rest">
                                    {HD_lANG['petInfo4'][globalLang]}<i className="icon-hint"></i>
                                </span>}

                                <div className="hint-box">
                                    <div className="hint-tit">{HD_lANG['petInfo4'][globalLang]}</div>
                                    <div className="hint-txt">{HD_lANG['petInfo4-1'][globalLang]}</div>
                                    <ul className="hint-list">
                                        <li className={(coolDownIndex ==0) ? 'active' : ''}>{HD_lANG['petInfo4-2'][globalLang]}:<em className="time">1{HD_lANG['petInfo4-10'][globalLang]}</em></li>
                                        <li className={(coolDownIndex ==1 || coolDownIndex ==2) ? 'active' : ''}>{HD_lANG['petInfo4-3'][globalLang]}:<em className="time">2{HD_lANG['petInfo4-10'][globalLang]} - 5{HD_lANG['petInfo4-10'][globalLang]}</em></li>
                                        <li className={(coolDownIndex ==3 || coolDownIndex==4) ? 'active' : ''}>{HD_lANG['petInfo4-4'][globalLang]}:<em className="time">10{HD_lANG['petInfo4-10'][globalLang]} - 30{HD_lANG['petInfo4-10'][globalLang]}</em></li>
                                        <li className={(coolDownIndex ==5 || coolDownIndex==6) ? 'active' : ''}>{HD_lANG['petInfo4-5'][globalLang]}:<em className="time">1{HD_lANG['petInfo4-11'][globalLang]} - 2{HD_lANG['petInfo4-11'][globalLang]}</em></li>
                                        <li className={(coolDownIndex ==7 || coolDownIndex==8) ? 'active' : ''}>{HD_lANG['petInfo4-6'][globalLang]}:<em className="time">4{HD_lANG['petInfo4-11'][globalLang]} - 8{HD_lANG['petInfo4-11'][globalLang]}</em></li>
                                        <li className={(coolDownIndex ==9 || coolDownIndex==10) ? 'active' : ''}>{HD_lANG['petInfo4-7'][globalLang]}:<em className="time">16{HD_lANG['petInfo4-11'][globalLang]} - 24{HD_lANG['petInfo4-11'][globalLang]}</em></li>
                                        <li className={(coolDownIndex ==11 || coolDownIndex==12) ? 'active' : ''}>{HD_lANG['petInfo4-8'][globalLang]}:<em className="time">2{HD_lANG['petInfo4-12'][globalLang]} - 3{HD_lANG['petInfo4-12'][globalLang]}</em></li>
                                        <li className={(coolDownIndex >=13) ? 'active' : ''}>{HD_lANG['petInfo4-9'][globalLang]}:<em className="time">5{HD_lANG['petInfo4-12'][globalLang]}</em></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {this.state.dog.dogId != 0 && this.state.dog.dogId != 1
                            ? <div className="gem">
                                <div className="tit">{HD_lANG['petInfo11'][globalLang]}</div>
                                    <ul className="list">
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(0),16)}><img src={api_img_host + 'img/gem/1/' +getBgColorClass(this.state.dog.genesStr, 0) + '.png'} alt="gem"/></li>
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(1),16)}><img src={api_img_host + 'img/gem/2/' +getBgColorClass(this.state.dog.genesStr, 1) + '.png'} alt="gem"/></li>
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(2),16)}><img src={api_img_host + 'img/gem/3/' +getBgColorClass(this.state.dog.genesStr, 2) + '.png'} alt="gem"/></li>
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(3),16)}><img src={api_img_host + 'img/gem/4/' +getBgColorClass(this.state.dog.genesStr, 3) + '.png'} alt="gem"/></li>
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(4),16)}><img src={api_img_host + 'img/gem/5/' +getBgColorClass(this.state.dog.genesStr, 4) + '.png'} alt="gem"/></li>
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(5),16)}><img src={api_img_host + 'img/gem/6/' +getBgColorClass(this.state.dog.genesStr, 5) + '.png'} alt="gem"/></li>
                                        <li title={HD_lANG['petInfo16'][globalLang]+parseInt(this.state.dog.genesStr.charAt(6),16)}><img src={api_img_host + 'img/gem/7/' +getBgColorClass(this.state.dog.genesStr, 6) + '.png'} alt="gem"/></li>
                                    </ul>
                            </div>: ''
                        }

                        <div className="price">
                            {HD_lANG['buying1'][globalLang]}:<span>{currentPrice}</span>
                        </div>

                        <div className="btn-wrap">
                            <a href="javascript: history.go(-1);" className="btn-back">{HD_lANG['buying2'][globalLang]}</a>
                            <a href="javascript:;" className="btn-submit" onClick={this.submit}>{HD_lANG['buying3'][globalLang]}</a>
                        </div>

                        <div className="hint">{HD_lANG['buying4'][globalLang]}{currentPrice}ETH{HD_lANG['buying5'][globalLang]}{address},Dog# {this.state.dog.dogId == 0 || this.state.dog.dogId == 1 ? HD_lANG['list20'][globalLang] : this.state.dog.dogName} {HD_lANG['buying6'][globalLang]}</div>
                    </div>
                </div>
            </div>
        )
    }
}   

export default Buying