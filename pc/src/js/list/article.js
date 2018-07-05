
require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/list/article.scss");
require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import MyDogArticle from './components/ListDogArticle.jsx';
import Footer from '../base/components/footer.jsx';
import Web3 from 'web3';
require("../base/abi.js");

function MyDogArticleBox(){
    return(
        <div>
            <HeaderBox />
            <MyDogArticle />
            <Footer />
        </div>
    )
}
function App() {

    ReactDom.render(
        <MyDogArticleBox />,
        document.getElementById('listDogArt')
    )
}

helloDogInit(App);