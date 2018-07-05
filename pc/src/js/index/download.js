require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/download.scss");

import React from 'react';
import ReactDom from 'react-dom';
require("../base/abi.js");
import HeaderBox from '../base/components/Header.jsx';
import Tips from './components/download.jsx';
import Footer from '../base/components/footer.jsx';

function TipsBox(){



    var navSelect = 6;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Tips  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <TipsBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);