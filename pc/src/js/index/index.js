require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/index.scss");


import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import FooterBox from '../base/components/footer.jsx';
import MainBox from './components/MainList.jsx';
require("../base/abi.js");

function IndexMainContent(){
    return(
        <div>
            <HeaderBox />
            <MainBox />
            <FooterBox />
        </div>
    )
}

function App(){
    ReactDom.render(
        <IndexMainContent />,
        document.getElementById('indexMain')
    );

}

helloDogInit(App);




