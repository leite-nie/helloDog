require("../../css/reset.scss");
require("../../css/common.scss");
require("../../css/index/friends.scss");
import React from 'react';
import ReactDom from 'react-dom';
import HeaderBox from '../base/components/Header.jsx';
import Friends from './components/Friends.jsx';
import Footer from '../base/components/footer.jsx';
require("../base/abi.js");
function FriendsBox(){

    var navSelect = 6;

    return(
        <div>
            <HeaderBox data={navSelect} />
            <Friends  />
            <Footer />
        </div>
    )
}

function startLogin() {

    ReactDom.render(
        <FriendsBox   />,
        document.getElementById('app')
    )
}



helloDogInit(startLogin);

