require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/mydog/rank.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Rank from './components/Rank.jsx';
import Footer from '../base/components/footer.jsx';

require("../base/abi.js");

function MatingBox(){
    var navSelect = 4;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Rank />
            <Footer />
        </div>
    )
}

function App(){

    ReactDom.render(
        <MatingBox />,
        document.getElementById('app')
    )
}
helloDogInit(App);