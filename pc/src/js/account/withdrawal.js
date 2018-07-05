require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/account/record.scss");


import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import Earning from './components/withdrawal.jsx';
require("../../css/page.scss");
require("../base/abi.js");


function EarningBox(){

    var navSelect = 100;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Earning  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <EarningBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);