require("../../css/mReset.scss");
require("../../css/mCommon.scss");
require("../../css/wallet/mywallet.scss");

import React from 'react';
import ReactDom from 'react-dom';
import Header from '../common/components/Header.jsx';
import Footer from '../common/components/Footer.jsx';
import MyWallet from './components/myWallet.jsx';

class StatApp extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isHideFooter :false
        }
    }
    changeState(bool){
        this.setState({isHideFooter: bool});
    }
    render(){
        return(
            <div>
            <Header hearderSty="2"  title="我的钱包"/>
            <MyWallet changeState={this.changeState.bind(this)} />
            <Footer isHideFooter={this.state.isHideFooter} active="4"/>
            </div>
        )
    }
}



function  app() {
    ReactDom.render(
        <StatApp />,
        document.getElementById('app')
    )
}
app();