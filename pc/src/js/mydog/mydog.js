require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/mydog/mydog.scss");

require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import MyDogList from './components/MyDogList.jsx';
import Footer from '../base/components/footer.jsx';
import Web3 from 'web3';
require("../base/abi.js");


function MyDogContent(){
    return(
        <div>
            <HeaderBox />
            <MyDogList />
            <Footer />
        </div>
    )
}


function App(){
    

    ReactDom.render(
        <MyDogContent />,
        document.getElementById('myDog')
    )
}

helloDogInit(App);


