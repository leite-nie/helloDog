require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/page.scss");
require("../../css/list/list.scss");

import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Footer from '../base/components/footer.jsx';
import Breed from './components/breed.jsx';

require("../base/abi.js");



function BreedBox(){

    var navSelect = 3;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Breed  />
            <Footer />
        </div>
    )
}

function App() {

    ReactDom.render(
        <BreedBox   />,
        document.getElementById('app')
    )
}



helloDogInit(App);
