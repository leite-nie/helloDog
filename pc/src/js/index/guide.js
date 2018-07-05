require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/guide.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Guide from './components/Guide.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");
function GuideBox(){

    // var navSelect = 5;

    return(
        <div>
            {/* <HeaderBox data={navSelect} /> */}
            <HeaderBox />
            <Guide  />
            <Footer />
        </div>
    )
}

function startLogin() {

    ReactDom.render(
        <GuideBox   />,
        document.getElementById('app')
    )
}



helloDogInit(startLogin);

