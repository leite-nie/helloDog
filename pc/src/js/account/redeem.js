require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/account/record.scss");


import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import Reddem from './components/redeem.jsx';
require("../../css/page.scss");
require("../base/abi.js");



function ReddemBox(){

    var navSelect = 100;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Reddem  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <ReddemBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);