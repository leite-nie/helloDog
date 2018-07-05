require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/index/rest.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Rest from './components/Rest.jsx';

function StatApp(){
    return(
        <div>
            <Header hearderSty="2" title={HD_lANG['petInfo4'][globalLang]}/>
            <Rest />
            <Footer active="1"/>
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