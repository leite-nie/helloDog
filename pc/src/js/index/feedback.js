require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/feedback.scss");

import React from 'react';
import ReactDom from 'react-dom';
require("../base/abi.js");
import HeaderBox from '../base/components/Header.jsx';
import Feedback from './components/Feedback.jsx';
import Footer from '../base/components/footer.jsx';

function FeedbackBox(){
    var navSelect = 6;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Feedback  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <FeedbackBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);