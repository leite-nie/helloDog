require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/account/account.scss");


import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import SaveInfo from './components/SaveInfo.jsx';

require("../base/abi.js");


function SaveInfoBox(){

    var navSelect = 100;
    return(
        <div>
            <HeaderBox data={navSelect} />
            <SaveInfo  />
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

