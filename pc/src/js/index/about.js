require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/about.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import About from './components/About.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");
function AboutBox(){

    // var navSelect = 5;

    return(
        <div>
            {/* <HeaderBox data={navSelect} /> */}
            <HeaderBox />
            <About  />
            <Footer />
        </div>
    )
}

function startLogin() {

    ReactDom.render(
        <AboutBox   />,
        document.getElementById('app')
    )
}



helloDogInit(startLogin);

