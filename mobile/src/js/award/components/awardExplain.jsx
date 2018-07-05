import React from 'react';
import common from '../../common.js'

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        common.setPageTitle(HD_lANG['index13'][globalLang])
    }
    render(){

        return(
            <div className="awardExplain-wrap">
                <div className="explain">
                    <div className="s-wrap">
                        <div className="tit">{HD_lANG['index13'][globalLang]}</div>
                        <div className="artice">
                            <p>{HD_lANG['awardExplain0'][globalLang]}</p>
                            <p>{HD_lANG['awardExplain1'][globalLang]}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export default Index;