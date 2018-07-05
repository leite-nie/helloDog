import React from 'react';

import img1 from '../../../images/img0327/login-1.png';
import img2 from '../../../images/img0327/login-2.png';
import img3 from '../../../images/img0327/login-3.png';
import img4 from '../../../images/img0327/loginImg1.png';

class LoginTipsList extends  React.Component{
    constructor(props){
        super(props);
        this.showContent = this.showContent.bind(this);
        this.state = {
            className : "content"
        }
    }
    showContent(event){
        var _obj = event.currentTarget;
        var $obj = $(_obj).siblings(".content");
        if($obj.hasClass("contentShow")){
            $obj.removeClass("contentShow").slideUp();
        }else{
            $obj.addClass("contentShow").slideDown();
        }

    }

    componentWillMount(){
        document.title = HD_lANG['login-tit'][globalLang];
        setInterval(()=>{
            if(window.defaultAccount && window.defaultAccount != '0x6bC4327c3A97CcEA19F61BEf89280B55f330122d'){
                window.location.href = "/account/info.html";
            }
        },1200)
    }
    render(){
        return(
            <div className="login-list">
                
                <div className="nav-box">
                    <a href="javascript:void(0)" className="select">{HD_lANG['login0'][globalLang]}</a>
                    <a href="/list/list.html">{HD_lANG['login1'][globalLang]}</a>
                </div>
                <h3>{HD_lANG['login2'][globalLang]}</h3>
                <h4>{HD_lANG['login3'][globalLang]}</h4>
                <h5>{HD_lANG['login4'][globalLang]}</h5>
                <h6><img src={img4} alt=""/></h6>
                <div className="guide-box">
                   
                    <div className="tit">{HD_lANG['login5'][globalLang]}</div>
                    <ul>
                        <li>
                            <p className="p-tit" onClick={this.showContent}>{HD_lANG['login6'][globalLang]}</p>
                            <div className={this.state.className}>
                                <p>{HD_lANG['login6-0'][globalLang]}</p>
                                <img src={img1} alt=""/>
                                <p>{HD_lANG['login6-1'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <p className="p-tit" onClick={this.showContent}>{HD_lANG['login7'][globalLang]}</p>
                            <div className="content">
                                <img src={img2} alt=""/>
                                <p>{HD_lANG['login7-0'][globalLang]}</p>
                                <p>{HD_lANG['login7-1'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <p className="p-tit" onClick={this.showContent}>{HD_lANG['login8'][globalLang]}</p>
                            <div className="content">
                                <img src={img3} alt=""/>
                                <p>{HD_lANG['login8-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <p className="p-tit" onClick={this.showContent}>{HD_lANG['login9'][globalLang]}</p>
                            <div className="content">

                                <p>{HD_lANG['login9-0'][globalLang]}</p>
                                <p>{HD_lANG['login9-1'][globalLang]}</p>
                            </div>
                        </li>

                        <li>
                            <p className="p-tit" onClick={this.showContent}>{HD_lANG['login10'][globalLang]}</p>
                            <div className="content">

                                <p>{HD_lANG['login10-0'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}



class LoginMustText extends React.Component{
    render(){
        return(
            <div className="game-must">
               <p>{HD_lANG['login11'][globalLang]}</p>
               <p>{HD_lANG['login12'][globalLang]}</p>
               <p>{HD_lANG['login13'][globalLang]}</p>
            </div>
        )
    }
}



class login extends React.Component {
    /*constructor(props){
        super(props);
        try{
            var _isMetaMask = web3.currentProvider.isMetaMask;
        }catch (e){
            var _isMetaMask = false;
        }

        this.state={
            isMetaMask : _isMetaMask
        }
    }*/
    render(){
        return(
            <div className="login-main">
                <LoginMustText />
                <LoginTipsList />
            </div>
        )
    }
}

export default login;