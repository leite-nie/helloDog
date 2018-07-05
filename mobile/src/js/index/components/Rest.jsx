import React from 'react';
import common from '../../common.js'

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dog: {},
            imgHost: ''
        }
    }
    componentWillMount() {
        let dogId = common.getUrlPar('dogId');
        this.getDogInfo(dogId)
        common.setPageTitle(HD_lANG['petInfo4'][globalLang])
    }
    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $http("/dog/dogInfo", {
            dogId : dogId
        }).then(function(data) {
            if(data.code == '0000' && data.returnObj){
                _this.setState({
                    dog: data.returnObj.dog,
                    imgHost: data.returnObj.imgHost
                })
            }
        })
    }
    render(){
        // 防止异步图片404
        if(!this.state.imgHost) {
            return null
        }
        let dog = this.state.dog;
        let coolDownIndex = this.state.dog.coolDownIndex
        let imgUrl = this.state.imgHost + this.state.dog.genesStr + '.png';
        return(
            <div className="rest-wrap">
                <div className={'layout-ban item-bd-' + common.getBgColorClass(this.state.dog.genesStr, 7)}>
                    {/* <a href="/" className="left-icon icon-tag3"><span className="icon-menu">0.002</span></a> */}
                    {/* <a href="/" className="right-icon"></a> */}
                    <img src={imgUrl} className={dog.dogId == 0 || dog.dogId == 1 ? 'zero' : ''} alt="pet"/>
                </div>

                <div className="section">
                    <div className="hint-box">
                        <div className="s-wrap">
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
            </div>
        )
    }
}

export default Detail;