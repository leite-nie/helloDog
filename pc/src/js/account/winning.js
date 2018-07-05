require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/account/winning.scss");


import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import Winning from './components/winning.jsx';

require("../base/abi.js");


function SaveInfoBox(){

    var navSelect = 100;
    return(
        <div>
            <HeaderBox data={navSelect} />
            <Winning  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <SaveInfoBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);

