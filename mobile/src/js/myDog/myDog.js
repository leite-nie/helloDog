require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/myDog/myDog.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import MyDog from './components/MyDog.jsx';

function StatApp(){
    return(
        <div>
            <Header title={HD_lANG['petCenter-title'][globalLang]}/>
            <MyDog />
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