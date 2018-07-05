require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/index/detail.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Detail from './components/Detail.jsx';

function StatApp(){
    return(
        <div>
            <Header hearderSty="2" title={HD_lANG['petInfo-title'][globalLang]}/>
            <Detail />
            <Footer active="2"/>
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