import React from 'react';
import common from '../../common.js';
import winAlert from '../../winAlert.js';

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        common.setPageTitle(HD_lANG['feedback-tit'][globalLang])
    }
    submit() {
        var dogId = this.refs.dogId.value.trim();
        var transcationHash = this.refs.transcationHash.value.trim();
        var remark = this.refs.remark.value.trim();
        if(!dogId && !transcationHash && !remark){
            winAlert.show(HD_lANG['feedback4'][globalLang])
            return false;
        }
        $http('/feedback/add', {
            walletAddress: window.defaultAccount,
            dogId: dogId,
            remark: transcationHash,
            errorType: 1,
            transcationHash: remark
        }).then(function(data) {
            if(data.code == '0000') {
                winAlert.show(HD_lANG['alert1'][globalLang], function() {
                    common.popRootPage()
                })
            }
        })
    }
    render(){
        return(
            <div className="feedback-wrap">
                <div className="feedback-sect">
                    <div className="row clearfix">
                        <label htmlFor="dogId">{HD_lANG['feedback1'][globalLang]}</label>
                        <div className="cnt">
                            <input type="tel" id="dogId" ref="dogId"/>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <label htmlFor="transcationHash">{HD_lANG['feedback2'][globalLang]}</label>
                        <div className="cnt">
                            <input type="text" id="transcationHash" ref="transcationHash"/>
                        </div>
                    </div>
                    <div className="row clearfix">
                        <label htmlFor="tit">{HD_lANG['feedback3'][globalLang]}</label>
                        <div className="cnt">
                            <textarea id="remark" ref="remark"></textarea>
                        </div>
                    </div>
                    <div className="row row-btn">
                        <div className="btn-def btn-sty2" onClick={this.submit.bind(this)}>{HD_lANG['petCenter19'][globalLang]}</div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Index;