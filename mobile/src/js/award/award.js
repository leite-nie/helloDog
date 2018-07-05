require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/award/award.scss");

import React from 'react';
import ReactDom from 'react-dom';
// import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import Award from './components/Award.jsx';

function StatApp(){
    return(
        <div>
            {/* <Header/> */}
            <Award />
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