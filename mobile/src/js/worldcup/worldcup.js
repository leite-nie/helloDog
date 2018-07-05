require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/worldcup/worldcup.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Begin from './components/worldcup.jsx';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
function StatApp(){
    return(
        <div>
        <Header hearderSty="1" title={HD_lANG['cup6'][globalLang]}/>
        <Begin></Begin>
        <Footer active="100"/>
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