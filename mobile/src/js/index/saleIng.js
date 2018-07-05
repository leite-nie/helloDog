require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/index/saleIng.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import SaleIng from './components/SaleIng.jsx';

function StatApp(){
    return(
        <div>
            <Header hearderSty="2" title={HD_lANG['list0'][globalLang]}/>
            <SaleIng />
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