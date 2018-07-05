    import React from 'react';

import img1 from '../../../images/guide/guide-1.jpg'
import img2 from '../../../images/guide/guide-2.jpg'
import img3 from '../../../images/guide/guide-3.jpg'
import img4 from '../../../images/guide/guide-4.jpg'
import img5 from '../../../images/guide/guide-5.jpg'
import img6 from '../../../images/guide/guide-6.jpg'
import img7 from '../../../images/guide/guide-7.jpg'
import img8 from '../../../images/guide/guide-8.jpg'
import img9 from '../../../images/guide/guide-9.jpg'
import img10 from '../../../images/guide/guide-10.jpg'
import img11 from '../../../images/guide/guide-11.jpg'
import img12 from '../../../images/guide/guide-12.jpg'
import img13 from '../../../images/guide/guide-13.jpg'

class Guide extends React.Component {
    render(){
        return(
            <div className="guide">
                <div className="wrap">
                    <div className="section section-1">
                        <div className="tit"><span>{HD_lANG['guide1'][globalLang]}</span></div>
                        <div className="article">
                            {HD_lANG['guide2'][globalLang]}
                            <p>{HD_lANG['guide3'][globalLang]}</p>
                            <img src={img1} alt="guide" />
                            <p>{HD_lANG['guide4'][globalLang]}</p>
                            <img src={img2} alt="guide" />
                            <p>{HD_lANG['guide5'][globalLang]}</p>
                            <img src={img3} alt="guide" />
                            <p>{HD_lANG['guide6'][globalLang]}</p>
                            <img src={img4} alt="guide" />
                            <p>{HD_lANG['guide7'][globalLang]}</p>
                            <img src={img5} alt="guide" />
                            <p>{HD_lANG['guide8'][globalLang]}</p>
                            <img src={img6} alt="guide" />
                            <img src={img7} alt="guide" />
                            <p>{HD_lANG['guide9'][globalLang]}</p>
                            <img src={img8} alt="guide" />
                            <p>{HD_lANG['guide10'][globalLang]}</p>
                            <img src={img9} alt="guide" />
                            <p>{HD_lANG['guide11'][globalLang]}</p>
                            <img src={img10} alt="guide" />
                            <p>{HD_lANG['guide12'][globalLang]}</p>
                            <p>{HD_lANG['guide13'][globalLang]}</p>
                            <img src={img11} alt="guide" />
                            <p>{HD_lANG['guide14'][globalLang]}</p>
                            <img src={img12} alt="guide" />
                            <p>{HD_lANG['guide15'][globalLang]}</p>
                            <img src={img13} alt="guide" />
                            <p>{HD_lANG['guide16'][globalLang]}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Guide;