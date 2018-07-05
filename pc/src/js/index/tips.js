require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/tips.scss");

import React from 'react';
import ReactDom from 'react-dom';
require("../base/abi.js");
import HeaderBox from '../base/components/Header.jsx';
import Tips from './components/tips.jsx';
import Footer from '../base/components/footer.jsx';

function TipsBox(){



    var navSelect = 100;

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