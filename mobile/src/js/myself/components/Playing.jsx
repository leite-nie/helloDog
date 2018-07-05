import React from 'react';
import common from '../../common.js';

import img1 from '../../../images/playing/0_1.png'
import img2 from '../../../images/playing/0_2.png'
import img3 from '../../../images/playing/0_3.png'
import img4 from '../../../images/playing/0_4.png'
import img5 from '../../../images/playing/0_5.png'
import img6 from '../../../images/playing/0_6.png'
import img7 from '../../../images/playing/0_7.png'
import img8 from '../../../images/playing/0_8.png'
import img9 from '../../../images/playing/0_9.png'
import img10 from '../../../images/playing/0_10.png'
import img11 from '../../../images/playing/0_11.png'
import img12 from '../../../images/playing/0_12.png'
import img13 from '../../../images/playing/0_13.png'

class Index extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        common.setPageTitle(HD_lANG['myself4'][globalLang])
    }
    render(){
        return(
            <div className="playing-wrap">
                <div className="notice-ban"></div>

                <div className="playing-section">
                    <div className="artilce">
                        <img src={img1} alt="playing"/>
                        <img src={img2} alt="playing"/>
                        <img src={img3} alt="playing"/>
                        <img src={img4} alt="playing"/>
                        <img src={img5} alt="playing"/>
                        <img src={img6} alt="playing"/>
                        <img src={img7} alt="playing"/>
                        <img src={img8} alt="playing"/>
                        <img src={img9} alt="playing"/>
                        <img src={img10} alt="playing"/>
                        <img src={img11} alt="playing"/>
                        <img src={img12} alt="playing"/>
                        <img src={img13} alt="playing"/>
                    </div>
                </div>
            </div>
        )
    }
}



export default Index;