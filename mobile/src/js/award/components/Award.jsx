import React from 'react';
import common from '../../common.js'

class TopLeft extends React.Component{
    constructor(props){
        super(props);
        this.state={
            endTime : 0
        }
    }
    
    getCountdown(endTime){
        //var EndTime= new Date('2018/04/25 10:00:00');
        function getId(id) {
            return document.getElementById(id);
        }

        var NowTime = new Date();
        var t =endTime*1000;
        t = t<0 ? 0 : t;
        var h=Math.floor(t/1000/60/60);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
        h = h < 10 ? "00"+h : (h>99 ? h : "0"+h);
        m = m < 10 ? "0"+m : m;
        s = s < 10 ? "0"+s : s;
        if(t == 0){
            document.getElementsByClassName("span-box")[0].innerHTML = HD_lANG['winning11'][globalLang];
        }else{
            getId('hour1').innerHTML = h.toString().charAt(0);
            getId('hour2').innerHTML = h.toString().charAt(1);
            getId('hour3').innerHTML = h.toString().charAt(2);
            getId('minute1').innerHTML = m.toString().charAt(0);
            getId('minute2').innerHTML = m.toString().charAt(1);
            getId('second1').innerHTML = s.toString().charAt(0);
            getId('second2').innerHTML = s.toString().charAt(1);
        }
    }
    getCountDownTime(){
        let _this = this;
        $http('/lottery/lastOpen').then(function(data) {
            if(data.code = "0000") {

                _this.setState({
                    endTime : data.returnObj.nextOpenTime
                });

                setTimeout(()=>{
                    var _endTime = _this.state.endTime;
                    _endTime = Math.ceil((_endTime/1000));
                    if(_endTime > 0){
                        setInterval(()=>{
                            _endTime--;
                            _this.getCountdown(_endTime);
                        },1000);
                    }else{
                        document.getElementsByClassName("span-box")[0].innerHTML = HD_lANG['winning11'][globalLang];
                    }
                },100)
            }
        })
    }
    componentDidMount(){
        common.setPageTitle(HD_lANG['index14'][globalLang])
        var _this = this;
        this.getCountDownTime();
    }
    render(){
        return(
            <div className="lottery-down">
                <em>{HD_lANG['header0'][globalLang]}</em>
                <div className="span-box">
                    <span id="hour1">0</span>
                    <span id="hour2">0</span>
                    <span id="hour3">0</span>
                    <span>{HD_lANG['index23'][globalLang]}</span>
                    <span id="minute1">0</span>
                    <span id="minute2">0</span>
                    <span>{HD_lANG['index24'][globalLang]}</span>
                    <span id="second1">0</span>
                    <span id="second2">0</span>
                    <span>{HD_lANG['index25'][globalLang]}</span>
                </div>
            </div>
        )
    }
}

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            // 创世狗
            genesis: [],
            // 奖金池信息
            bonusPoolInfo: {},
            // 上一期开奖结果
            lotteryResult: null,

            imgHost: '',

            //创世狗红利
            GenesisProfit: 0,

            //当天繁殖收益(0代分红)
            toDayBirthDogProfit: 0,
        }
    }
    componentDidMount() {
        this.getIndexInfo();
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    getIndexInfo() {
        var _this = this
        $http('/index').then(function(data) {
            if(data.code == '0000') {
                _this.setState({
                    genesis: data.returnObj.Genesis,
                    bonusPoolInfo: data.returnObj.bonusPoolInfo,
                    lotteryResult: data.returnObj.lotteryResult,
                    imgHost: data.returnObj.imgHost,
                    GenesisProfit: data.returnObj.GenesisProfit,
                    toDayBirthDogProfit: data.returnObj.toDayBirthDogProfit,
                })
            }
        })
    }
    render(){
        let genesis = this.state.genesis
        let bonusPool = parseInt(Number(this.state.bonusPoolInfo.bonusPool)*10000)/10000
        let storagePool = parseInt(Number(this.state.bonusPoolInfo.storagePool)*10000)/10000
        let GenesisProfit = parseInt(Number(this.state.GenesisProfit)*2000)/1000
        let toDayBirthDogProfit = parseInt(Number(this.state.toDayBirthDogProfit)*10000)/10000
        let gems = [];
        if(this.state.lotteryResult) {
            let obj = JSON.parse(this.state.lotteryResult.lotteryResult)
            for(var i in obj){
                gems.push(obj[i])
            }
        }
        
        return(
            <div className="award-wrap">
                <TopLeft />
                <div className="bonus-pool">
                    <div className="s-wrap">
                        <div className="cell">
                            <span className="tit">{HD_lANG['index2'][globalLang]}</span>
                            <span className="total">{bonusPool}ETH</span>
                        </div>
                        <div className="cell">
                            <span className="tit">{HD_lANG['index3'][globalLang]}</span>
                            <span className="total">{storagePool}ETH</span>
                        </div>
                    </div>
                </div>

                <div className="bonus">
                    <div className="dividends">
                        <div className="txt">
                            {HD_lANG['index26'][globalLang]}<span className="stg">{toDayBirthDogProfit}ETH</span>
                        </div>
                    </div>
                </div>

                <div className="gem">
                    <div className="s-wrap">
                        <div className="award-tit"><span>{HD_lANG['index8'][globalLang]}</span></div>
                        {gems.length ? (
                            <ul className="list clearfix">
                                {gems.map((item, index) => (
                                    <li key={index}><img src={img_host+"img/gem/index-" + (index+1) + "/" + Number(item).toString(16)+".png"} alt="gem"/></li>
                                ))}
                            </ul>
                        ) : (
                            <div className="empty">
                                {HD_lANG['alert26'][globalLang]}
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="btn-wrap history-btn">
                    <a href="/mobile/award/history.html" className="btn-def" onClick={this.pushMethod.bind(this, "/mobile/award/history.html")}>{HD_lANG['index10'][globalLang]}</a>
                </div>
                                
                <div className="creation">
                    <div className="s-wrap">
                        <div className="award-tit"><span>{HD_lANG['list20'][globalLang]}</span></div>
                        <div className="dividends">
                            <div className="txt">
                                {HD_lANG['index26'][globalLang]}<span className="stg">{GenesisProfit}ETH</span>
                            </div>
                        </div>
                        <div className="cnt">
                        {genesis.length && 
                            genesis.map((item, index) => (
                                <div className="cell" key={item.dogId}>
                                    <div className="pic">
                                        <img src={this.state.imgHost + item.genesStr +".png"} alt="pet"/>
                                        <div className="price">
                                            {HD_lANG['index12'][globalLang]}<span className="stg">{item.startPrice}ETH</span>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <span>{item.dogName}</span>
                                        <span className="ellipsis">{item.userName}</span>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                </div>
                
                <div className="btn-wrap">
                    <a href="/mobile/award/awardExplain.html" className="btn-def" onClick={this.pushMethod.bind(this, "/mobile/award/awardExplain.html")}>{HD_lANG['index13'][globalLang]}</a>
                    <a href="/mobile/myself/playing.html" className="btn-def" onClick={this.pushMethod.bind(this, "/mobile/myself/playing.html")}>{HD_lANG['index13-1'][globalLang]}</a>
                </div>

            </div>
        )
    }
}



export default Index;