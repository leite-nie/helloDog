import React from 'react';
import $ from 'jquery';
import img1 from '../../../images/img0327/devLogs1.jpg';

class notice extends React.Component {
    constructor(props){
        super(props);
        this.showContent = this.showContent.bind(this);

    }
    showContent(event){
        var _obj = event.currentTarget;
        var $obj2 = $(_obj);
        var $obj = $(_obj).parent().siblings(".down");

        if($obj2.hasClass("select")){
            $obj.stop(true,true).slideUp();
            $obj2.removeClass("select")
        }else{
            $obj.stop(true,true).slideDown();
            $obj2.addClass("select")
        }

    }
    componentWillMount(){
        document.title = HD_lANG['devlogs-title'][globalLang];
    }
    render(){
        return(
            <div>
                <div className="notice-banner"></div>
                <div className="notice-box">
                    <ul>
                        <li>
                            <h3><span>2018-4-13</span> {HD_lANG['devlogs-0'][globalLang]}</h3>
                            <div className="content">
                                <p><img src={img1} alt=""/></p>
                                <p>{HD_lANG['devlogs-1'][globalLang]}</p>
                                <p>{HD_lANG['devlogs-2'][globalLang]}</p>
                                <p>{HD_lANG['devlogs-3'][globalLang]}</p>
                                <p>{HD_lANG['devlogs-4'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <h3><span>2018-4-21</span>{HD_lANG['devlogs-5'][globalLang]} </h3>
                            <div className="content">


                                <p>{HD_lANG['devlogs-6'][globalLang]}</p>
                                <p>{HD_lANG['devlogs-7'][globalLang]}</p>
                                <p>{HD_lANG['devlogs-8'][globalLang]}</p>
                                <p>{HD_lANG['devlogs-9'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default notice;