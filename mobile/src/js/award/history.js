require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/award/history.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import History from './components/History.jsx';

function StatApp(){
    return(
        <div>
            <Header title={HD_lANG['history-title'][globalLang]}/>
            <History />
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