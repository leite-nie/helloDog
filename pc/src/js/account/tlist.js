require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/account/list.scss");
require("../../css/page.scss");

import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import List from './components/tlist.jsx';

require("../base/abi.js");


function LoginBox(){

    var navSelect = 100;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <List />
            <Footer />
        </div>
    )
}



function App() {

    ReactDom.render(
        <LoginBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);