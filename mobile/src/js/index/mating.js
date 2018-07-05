require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/index/mating.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Mating from './components/Mating.jsx';

function StatApp(){
    return(
        <div>
            <Header title={HD_lANG['petInfo5'][globalLang]}/>
            <Mating />
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