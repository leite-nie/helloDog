require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/page.scss");
require("../../css/index/history.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import History from './components/history.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");
function NoticeBox(){



    var navSelect = 100;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <History  />
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