require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/wallet/begin.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Begin from './components/begin.jsx';
function StatApp(){
    return(
        <Begin></Begin>
    )
}

function  app() {
    ReactDom.render(
        <StatApp />,
        document.getElementById('app')
    )
}
app();