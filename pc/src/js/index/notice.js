require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/notice.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Notice from './components/notice.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");
function NoticeBox(){

    var navSelect = 5;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Notice  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <NoticeBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);