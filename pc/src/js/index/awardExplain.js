require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/award.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import AwardExplain from './components/awardExplain.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");
function AwardBox(){

    var navSelect = 100;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <AwardExplain  />
            <Footer />
        </div>
    )
}

function startLogin() {

    ReactDom.render(
        <AwardBox   />,
        document.getElementById('app')
    )
}



helloDogInit(startLogin);
