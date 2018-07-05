require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/myself/feedback.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Feedback from './components/Feedback.jsx';

function StatApp(){
    return(
        <div>
            <Header hearderSty="2" title={HD_lANG['feedback-tit'][globalLang]}/>
            <Feedback />
            <Footer active="4"/>
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