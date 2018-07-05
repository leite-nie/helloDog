require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/account/transfer.scss");


import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import LoginInfo from './components/transfer.jsx';

require("../base/abi.js");



function LoginBox(){

    var navSelect = 0;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <LoginInfo  />
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

