import React from 'react';
import img1 from "../../../images/tips/1.png";
import img2 from "../../../images/tips/2.png";
import img3 from "../../../images/tips/3.png";
import img4 from "../../../images/tips/4.png";
import img5 from "../../../images/tips/5.png";
import img6 from "../../../images/tips/6.png";
import img7 from "../../../images/tips/7.png";
import img8 from "../../../images/tips/8.png";
import img9 from "../../../images/tips/9.png";

class Tips extends React.Component {
    constructor(props){
        super(props);


    }
    createMarkup(str) {
        return {__html: str};
    }
    componentWillMount(){
        document.title = HD_lANG['tips-tit'][globalLang];
    }
    render(){
        return(
            <div className="tips-list-box">
                <p  dangerouslySetInnerHTML={this.createMarkup(HD_lANG['tips-0'][globalLang])}>

                </p>
                <p>{HD_lANG['tips-1'][globalLang]}</p>
                <img src={img1} alt=""/>
                <p>{HD_lANG['tips-2'][globalLang]}</p>
                <img src={img2} alt=""/>
                <p>{HD_lANG['tips-3'][globalLang]}</p>
                <img src={img3} alt=""/>
                <p>{HD_lANG['tips-4'][globalLang]}</p>
                <img src={img4} alt=""/>
                <p>{HD_lANG['tips-5'][globalLang]}</p>
                <img src={img5} alt=""/>
                <p>{HD_lANG['tips-6'][globalLang]}</p>
                <img src={img6} alt=""/>
                <p>{HD_lANG['tips-7'][globalLang]}</p>
                <img src={img7} alt=""/>
                <p>{HD_lANG['tips-8'][globalLang]}</p>
                <img src={img8} alt=""/>
                <p>{HD_lANG['tips-9'][globalLang]}</p>
                <img src={img9} alt=""/>
            </div>
        )
    }
}

export default Tips;
