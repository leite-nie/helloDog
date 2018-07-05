import React from 'react';
import img1 from '../../../images/img0327/friending-1.png';
import img2 from '../../../images/img0327/friending-2.png';
import img3 from '../../../images/img0327/friending-3.png';
import img4 from '../../../images/img0327/friending-4.png';

import img6 from '../../../images/img0327/friending-6.png';
//import eventUtil from  '../../base/components/checkEventPlan.js';
class footer extends React.Component {
    render(){
        return(
            <footer className="footer-box">
                {/*<div className="check-event">
                    <div className="show-btn">
                        <span></span>交易
                    </div>
                    <div className="check-wrap">
                        <div className="hide-btn">一</div>
                        <div className="check-box">
                            <h2>正在进程操作</h2>
                            <p>您的交易已经发出。根据以太坊网络状况的不同，这个过程最多可能需要花费几个小时的时间。请耐心等待交易完成，稍等片刻。</p>
                            <h3>交易散列</h3>
                            <div>
                                <input type="text" className="trans-input" />
                            </div>
                            <div className="button-box">
                                <span>关闭</span>
                                <span>查询散列</span>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className="footer-link">
                    <div className="clearfix">
                        <a href="/mydog/petCenter.html">{HD_lANG['footer0'][globalLang]}</a>
                        <a href="/about.html">{HD_lANG['footer1'][globalLang]}</a>
                        <a href="/account/translist.html">{HD_lANG['footer2'][globalLang]}</a>
                        <a href="/hellodogwhitebook.pdf">{HD_lANG['footer3'][globalLang]}</a>
                        <a href="/list/list.html">{HD_lANG['footer4'][globalLang]}</a>
                        <a href="/devLogs.html">{HD_lANG['footer5'][globalLang]}</a>
                        <a href="/question.html">{HD_lANG['footer6'][globalLang]}</a>
                        <a href="//shang.qq.com/wpa/qunwpa?idkey=7b68498af2d309efd9d0a10152155f48a522816ff40c851f18abbe6da2398d17" target="_blank">{HD_lANG['footer7'][globalLang]}</a>
                    </div>
                    <div className="share">
                        <span>{HD_lANG['footer8'][globalLang]}</span>
                        <a href="https://twitter.com/HellodogC" target="_blank"><img src={img1} alt="" /></a>
                        <a href="https://www.facebook.com/hellodogs.co/" target="_blank"><img src={img2} alt="" /></a>
                        <a href="https://discord.gg/jP6xTHw" target="_blank"><img src={img3} alt="" /></a>
                        <a href="https://t.me/hellodogs_8" target="_blank"><img src={img4} alt="" /></a>

                        <a href="//shang.qq.com/wpa/qunwpa?idkey=7b68498af2d309efd9d0a10152155f48a522816ff40c851f18abbe6da2398d17" target="_blank"><img src={img6} alt="" /></a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default footer;