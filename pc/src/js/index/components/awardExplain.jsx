import React from 'react';



class AwardExplain extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isHide1 : false,
            isHide2 : false,
            isHide3 : false,
        }
    }
    componentWillMount(){
        var _type = getUrlPar("type");
        if(_type == 1){
            this.setState({
                isHide1: true
            })
            document.title  = HD_lANG['awardExplain-titlt1'][globalLang];
        }else if(_type == 2){
            this.setState({
                isHide2: true
            })
            document.title  = HD_lANG['awardExplain-titlt2'][globalLang];
        }else if(_type == 3){
            this.setState({
                isHide3: true
            })
            document.title  = HD_lANG['awardExplain-titlt3'][globalLang];
        }else{
            this.setState({
                isHide1: true
            })
            document.title  = "Hello Dog";
        }
    }
    createMarkup(str) {
        return {__html: str};
    }
    render(){
        return(
            <div className="award-wrap">
                <div className={!this.state.isHide1 ? "award-box-hide" : "award-box" }>
                    <h2>{HD_lANG['awardExplain-titlt1'][globalLang]}</h2>
                    <p>{HD_lANG['awardExplain0'][globalLang]}</p>
                    <p>{HD_lANG['awardExplain1'][globalLang]}</p>
                </div>
                <div className={!this.state.isHide2 ? "award-box-hide" : "award-box" }>
                    <h2>{HD_lANG['awardExplain-titlt2'][globalLang]}</h2>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain2'][globalLang]}</span>
                    </p>
                    <p className="clearfix" >
                        <span></span>
                        <span dangerouslySetInnerHTML={this.createMarkup(HD_lANG['awardExplain3'][globalLang])}>

                        </span>

                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span dangerouslySetInnerHTML={this.createMarkup(HD_lANG['awardExplain4'][globalLang])}>

                        </span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span dangerouslySetInnerHTML={this.createMarkup(HD_lANG['awardExplain5'][globalLang])}>

                        </span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span dangerouslySetInnerHTML={this.createMarkup(HD_lANG['awardExplain6'][globalLang])}>

                        </span>
                    </p>

                </div>
                <div className={!this.state.isHide3 ? "award-box-hide" : "award-box" }>
                    <h2>{HD_lANG['awardExplain-titlt3'][globalLang]}</h2>
                    <p>{HD_lANG['awardExplain11'][globalLang]}</p>
                    <div className="table-box">
                        <table>
                            <tbody>
                                <tr>
                                    <td>{HD_lANG['awardExplain20'][globalLang]}</td>
                                    <td>{HD_lANG['awardExplain21'][globalLang]}</td>
                                    <td>{HD_lANG['awardExplain22'][globalLang]}</td>
                                    <td>{HD_lANG['awardExplain23'][globalLang]}</td>
                                    <td>{HD_lANG['awardExplain24'][globalLang]}</td>
                                    <td>{HD_lANG['awardExplain25'][globalLang]}</td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-0'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em className="plus">+</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-0'][globalLang]}</td>
                                    <td>46%</td>
                                    <td>35%</td>
                                    <td>5%</td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-1'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-1'][globalLang]}</td>
                                    <td>16%</td>
                                    <td>18%</td>
                                    <td>3%</td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-2'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em className="plus">+</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-2'][globalLang]}</td>
                                    <td>10%</td>
                                    <td>14%</td>
                                    <td>2%</td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-3'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-3'][globalLang]}</td>
                                    <td>9%</td>
                                    <td>12%</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-4'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em className="plus">+</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-4'][globalLang]}</td>
                                    <td>8%</td>
                                    <td>8%</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-5'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em><em className="plus">+</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-5'][globalLang]}</td>
                                    <td>6%</td>
                                    <td>7%</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>{HD_lANG['awardExplain20-6'][globalLang]}</td>
                                    <td className="align-l"><em className="first">&nbsp;</em><em>&nbsp;</em><em>&nbsp;</em></td>
                                    <td>{HD_lANG['awardExplain22-6'][globalLang]}</td>
                                    <td>5%</td>
                                    <td>6%</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <p className="clearfix">
                        <span></span>
                        <span dangerouslySetInnerHTML={this.createMarkup(HD_lANG['awardExplain12-0'][globalLang])}></span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain12'][globalLang]}</span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain13'][globalLang]}</span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain14'][globalLang]}</span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain15'][globalLang]}</span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain16'][globalLang]}</span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain17'][globalLang]}</span>
                    </p>
                    <p className="clearfix">
                        <span></span>
                        <span>{HD_lANG['awardExplain18'][globalLang]}</span>
                    </p>
                    <p>
                        <em>{HD_lANG['awardExplain19'][globalLang]}</em>
                    </p>
                </div>
            </div>
        )
    }
}

export default AwardExplain;