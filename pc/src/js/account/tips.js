


require("../../css/reset.scss");

import React from 'react';
import ReactDom from 'react-dom';
import img1 from "../../images/tips/1.png";
import img2 from "../../images/tips/2.png";
import img3 from "../../images/tips/3.png";
import img4 from "../../images/tips/4.png";
import img5 from "../../images/tips/5.png";
import img6 from "../../images/tips/6.png";
import img7 from "../../images/tips/7.png";
import img8 from "../../images/tips/8.png";
import img9 from "../../images/tips/9.png";




function tipsApp(){
    ReactDom.render(
        <div className="tips-list-box">
            <p>步骤一：</p>
            <img src={img1} alt=""/>
            <p>步骤二：</p>
            <img src={img2} alt=""/>
            <p>步骤三：</p>
            <img src={img3} alt=""/>
            <p>步骤四：</p>
            <img src={img4} alt=""/>
            <p>步骤五：</p>
            <img src={img5} alt=""/>
            <p>步骤六：</p>
            <img src={img6} alt=""/>
            <p>步骤七：</p>
            <img src={img7} alt=""/>
            <p>步骤八：</p>
            <img src={img8} alt=""/>
            <p>步骤九：</p>
            <img src={img9} alt=""/>
        </div>,
        document.getElementById('tipsBox')
    );

}
tipsApp()