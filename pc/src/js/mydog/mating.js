require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/mydog/mating.scss");
require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Mating from './components/Mating.jsx';
import Footer from '../base/components/footer.jsx';

require("../base/abi.js");



function MatingBox(){
    return(
        <div>
            <HeaderBox />
            <Mating />
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