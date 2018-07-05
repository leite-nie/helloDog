require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/list/list.scss");
require("../../css/page.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import List from './components/List.jsx';
import Footer from '../base/components/footer.jsx';

require("../base/abi.js");

function ListBox(){
    
    var navSelect = 2;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <List />
            <Footer />
        </div>
    )
}

function App(){
    
    ReactDom.render(
        <ListBox />,
        document.getElementById('list')
    )
}
helloDogInit(App);