require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/index/index.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Index from './components/Index.jsx';

import logo from '../../images/logo.png'

function StatApp(){
    return(
        <div>
            <Header hasBack="1" logo={logo}/>
            <Index></Index>
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