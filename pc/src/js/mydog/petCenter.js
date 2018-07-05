require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/mydog/petCenter.scss");
require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import PetCenter from './components/PetCenter.jsx';
import Footer from '../base/components/footer.jsx';

require("../base/abi.js");



function PetCenterBox(){
    var navSelect = 1;
    return(
        <div>
            <HeaderBox  data={navSelect} />
            <PetCenter />
            <Footer />
        </div>
    )
}

function App(){

    ReactDom.render(
        <PetCenterBox />,
        document.getElementById('app')
    )
}
helloDogInit(App);