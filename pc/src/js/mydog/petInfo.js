
require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/mydog/petInfo.scss");
require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import PetInfo from './components/PetInfo.jsx';
import Footer from '../base/components/footer.jsx';

require("../base/abi.js");



function PetInfoBox(){
    return(
        <div>
            <HeaderBox />
            <PetInfo></PetInfo>
            <Footer />
        </div>
    )
}

function App(){

    ReactDom.render(
        <PetInfoBox />,
        document.getElementById('app')
    )
}
helloDogInit(App);