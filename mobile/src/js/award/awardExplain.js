require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/award/awardExplain.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import AwardExplain from './components/AwardExplain.jsx';

function StatApp(){
    return(
        <div>
            <Header title={HD_lANG['index13'][globalLang]}/>
            <AwardExplain />
            <Footer active="3"/>
        </div>
    )
}

function  app() {
    ReactDom.render(
        <StatApp />,
        document.getElementById('app')
    )
}
app();