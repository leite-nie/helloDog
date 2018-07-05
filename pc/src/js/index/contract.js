require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/contract.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Contract from './components/contract.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");


function ContractBox(){

    var navSelect = 4;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Contract  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <ContractBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);