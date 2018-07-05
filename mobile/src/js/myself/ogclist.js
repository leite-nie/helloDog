require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/myself/ogclist.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Setting from './components/Ogclist.jsx';

function StatApp(){
    return(
        <div>
            <Header hearderSty="2" title={HD_lANG['friends9'][globalLang]}/>
            <Setting />
            <Footer active="4" />
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