require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/page.scss");
require("../../css/list/saleIng.scss");

import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import Sale from './components/saleIng.jsx';

require("../base/abi.js");



function SaleBox(){

    var navSelect = 2;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Sale  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <SaleBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);