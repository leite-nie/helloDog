import React from 'react';

class About extends React.Component {

    render(){
        return(
            <div className="about">
                <div className="wrap">
                    <div className="section section-1">
                        <div className="tit"><span>{HD_lANG['about1'][globalLang]}</span></div>
                        <div className="article">{HD_lANG['about2'][globalLang]}</div>
                        <div className="pic"></div>
                    </div>
                    
                    <div className="section section-2">
                        <div className="tit"><span>{HD_lANG['about3'][globalLang]}</span></div>
                        <div className="article">{HD_lANG['about4'][globalLang]}</div>
                        <div className="pic"></div>
                    </div>

                    <div className="section section-3">
                        <div className="tit"><span>{HD_lANG['about5'][globalLang]}</span></div>
                        <div className="article">{HD_lANG['about6'][globalLang]}</div>
                        <div className="pic"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;