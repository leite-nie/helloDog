import React from 'react';
import $ from 'jquery';
import img1 from '../../../images/img0327/question1.jpg';
import img2 from '../../../images/img0327/question2.jpg';
import img3 from '../../../images/img0327/question3.jpg';
import img4 from '../../../images/img0327/question4.jpg';
import img5 from '../../../images/img0327/question5.jpg';
class notice extends React.Component {
    constructor(props){
        super(props);
        this.showContent = this.showContent.bind(this);

    }
    showContent(event){
        var _obj = event.currentTarget;
        var $obj2 = $(_obj).children("span");
        var $obj = $(_obj).siblings(".down");

        if($obj2.hasClass("select")){
            $obj.stop(true,true).slideUp();
            $obj2.removeClass("select")
        }else{
            $obj.stop(true,true).slideDown();
            $obj2.addClass("select")
        }

    }
    componentWillMount(){
        document.title = HD_lANG['question-tit'][globalLang];
    }
    render(){
        return(
            <div>
                <div className="notice-banner"></div>
                <div className="notice-box">
                    <h2>{HD_lANG['question0'][globalLang]}</h2>
                    <ul>
                        <li>
                            <div className="tit" onClick={this.showContent}  >
                                <p>{HD_lANG['question1'][globalLang]}</p>
                                <span></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question1-0'][globalLang]}</p>
                                <p>{HD_lANG['question1-1'][globalLang]}</p>
                                <p>{HD_lANG['question1-2'][globalLang]}</p>
                                <p>{HD_lANG['question1-3'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question2'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question2-0'][globalLang]}</p>
                                <p>{HD_lANG['question2-1'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question3'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question3-0'][globalLang]}</p>
                                <p><img src={img1} alt=""/></p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question4'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question4-0'][globalLang]}</p>
                            </div>
                        </li>

                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question5'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question5-0'][globalLang]}</p>
                                <p><img src={img2} alt=""/></p>
                                <p>{HD_lANG['question5-1'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                    <h2>{HD_lANG['question6'][globalLang]}</h2>
                    <ul>

                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question7'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question7-0'][globalLang]}。</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question8'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question8-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question9'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question9-0'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                    <h2>{HD_lANG['question10'][globalLang]}</h2>
                    <ul>


                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question11'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question11-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question12'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question12-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question13'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question13-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question14'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question14-0'][globalLang]}</p>
                                <p>{HD_lANG['question14-1'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question15'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question15-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question16'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question16-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question17'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question17-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question18'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question18-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question19'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question19-0'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                    <h2>{HD_lANG['question20'][globalLang]}</h2>
                    <ul>


                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question21'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question21-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question22'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question22-0'][globalLang]}</p>
                                <p>{HD_lANG['question22-1'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question45'][globalLang]} </p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question45-0'][globalLang]}</p>
                                <p>{HD_lANG['question45-1'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question23'][globalLang]}？</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question23-0'][globalLang]}</p>
                                <p>{HD_lANG['question23-1'][globalLang]}</p>
                                <p>{HD_lANG['question23-2'][globalLang]}</p>
                                <p>{HD_lANG['question23-3'][globalLang]}</p>
                                <p>{HD_lANG['question23-4'][globalLang]}</p>
                                <p>{HD_lANG['question23-5'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question24'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question24-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question25'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question25-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question26'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question26-0'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>

                    <h2><p>{HD_lANG['question27'][globalLang]}</p></h2>
                    <ul>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question28'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question28-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question29'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question29-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question30'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question30-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question31'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question31-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question32'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question32-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question33'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question33-0'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                    <h2>{HD_lANG['question34'][globalLang]}</h2>
                    <ul>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question35'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question35-0'][globalLang]}</p>
                                <p>{HD_lANG['question35-1'][globalLang]}</p>
                                <p><img src={img3} alt=""/></p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question36'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question36-0'][globalLang]}</p>
                                <p>{HD_lANG['question36-1'][globalLang]}</p>
                                <p>{HD_lANG['question36-2'][globalLang]}</p>
                                <p>{HD_lANG['question36-3'][globalLang]}</p>

                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question37'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question37-0'][globalLang]}</p>
                                <p><img src={img4} alt=""/></p>
                                <p>{HD_lANG['question37-1'][globalLang]}</p>
                                <p><img src={img5} alt=""/></p>
                            </div>
                        </li>
                    </ul>
                    <h2>{HD_lANG['question38'][globalLang]}</h2>
                    <ul>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question39'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question39-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question40'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question40-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question41'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question41-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question42'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question42-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question43'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question43-0'][globalLang]}</p>
                            </div>
                        </li>
                        <li>
                            <div className="tit" onClick={this.showContent}>
                                <p>{HD_lANG['question44'][globalLang]}</p>
                                <span ></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['question44-0'][globalLang]}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default notice;