require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/list/buying.scss");
require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Buying from './components/Buying.jsx';
import Footer from '../base/components/footer.jsx';

require("../base/abi.js");



function BuyingBox(){
    return(
        <div>
            <HeaderBox />
            <Buying />
            <Footer />
        </div>
    )
}

function App(){

    ReactDom.render(
        <BuyingBox />,
        document.getElementById('buyBox')
    )
}
helloDogInit(App);