import React from 'react';
import common from '../../common.js'

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    render(){
        if(common.isApp()){
            return null
        }
        if(this.props.isHideFooter){
            return false;
        }
        return(
            <div className='footer'>
                <ul>
                    <li>
                        <a href="/mobile/index.html" className={this.props.active == 1 ? 'active' : ''} onClick={this.pushMethod.bind(this,"/mobile/index.html")}>
                            <span className="icon-home">{HD_lANG['header5'][globalLang]}</span>
                        </a>
                    </li>
                    <li>
                        <a href="/mobile/myDog/myDog.html" className={this.props.active == 2 ? 'active' : ''} onClick={this.pushMethod.bind(this,"/mobile/myDog/myDog.html")}>
                            <span className="icon-foot">{HD_lANG['petCenter-title'][globalLang]}</span>
                        </a>
                    </li>
                    <li>
                        <a href="/mobile/worldcup/index.html" className={this.props.active == 5 ? 'active' : ''} onClick={this.pushMethod.bind(this,"/mobile/worldcup/worldcup.html")}>
                            <span className="icon-cup">{HD_lANG['header11'][globalLang]}</span>
                        </a>
                    </li>
                    <li>
                        <a href="/mobile/award/award.html" className={this.props.active == 3 ? 'active' : ''} onClick={this.pushMethod.bind(this,"/mobile/award/award.html")}>
                            <span className="icon-award">{HD_lANG['index14'][globalLang]}</span>
                        </a>
                    </li>
                    <li>
                        <a href="/mobile/myself/myself.html" className={this.props.active == 4 ? 'active' : ''} onClick={this.pushMethod.bind(this,"/mobile/myself/myself.html")}>
                            <span className="icon-myself">{HD_lANG['petCenter5'][globalLang]}</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}



export default Header;