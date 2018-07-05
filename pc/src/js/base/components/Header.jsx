import React from 'react';

require("../language.js");

//定义通用导航条
class Header extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(
            <header>
                <div className="clearfix">
                    <TopLeft  />
                    <TopRight data={this.props.data} />
                </div>
            </header>
        )
    }
}

class TopLeft extends React.Component{
    constructor(props){
        super(props);
        this.state={
            endTime : 0,
            isRandom : ''
        }
    }
    getCountdown(endTime){
        // get finish


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
        $.ajax({
            url : api_host + "/lottery/lastOpen",
            data :{},
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code = "0000") {

                    _this.setState({
                        endTime : data.returnObj.nextOpenTime
                    });
                    if( data.returnObj.last){
                        _this.setState({
                            isRandom : data.returnObj.last.isRandom
                        });
                    }
                    setTimeout(()=>{
                        var _endTime = _this.state.endTime;
                        _endTime = Math.ceil((_endTime/1000));
                        if(_endTime > 0){
                            setInterval(()=>{
                                _endTime--;
                                _this.getCountdown(_endTime);
                            },1000);
                        }else{
                            document.getElementsByClassName("span-box")[0].innerHTML =HD_lANG['winning11'][globalLang];
                        }
                    },100)
                }
            }
        })
    }
    componentDidMount(){
        var _this = this;
        this.getCountDownTime();

    }
    render(){
        return(
            <div className="top-left">
                <a href="/index.html"><span className="logo-txt"></span></a>
                <div className="lottery-down">
                    <em>{HD_lANG['header0'][globalLang]}</em>
                    <div className="span-box">
                        <span id="hour1">0</span>
                        <span id="hour2">0</span>
                        <span id="hour3">0</span>
                        <span>{HD_lANG['header11'][globalLang]}</span>
                        <span id="minute1">0</span>
                        <span id="minute2">0</span>
                        <span>{HD_lANG['header12'][globalLang]}</span>
                        <span id="second1">0</span>
                        <span id="second2">0</span>
                        <span>{HD_lANG['header13'][globalLang]}</span>
                    </div>
                </div>
                {/*<span className={ this.state.isRandom === 1 ? "logo-img logo-img1" :  this.state.isRandom === 0 ? "logo-img logo-img0" : "logo-img" }></span>*/}
                <div className="test-inform">
                    <a href="http://www.haloudog.com/back0424/detail.html" target="_blank">{HD_lANG['winning25'][globalLang]}</a>
                </div>
            </div>
        )
    }
}



class TopRight extends React.Component{
    constructor(props){
        super(props);
        this.setCountry = this.setCountry.bind(this);


        this.state = {
            navFirstTxt : ' ',
            navFirstUrl : ''
        }

    }
    setCountry (event){
        event.preventDefault();
        var txt = event.currentTarget.text;
        //内测不开放语言版本
        if(txt.toLowerCase() == 'english'){
            localStorage.setItem('country','英国');
        }else if(txt == '中文'){
            localStorage.setItem('country','中国');
        }else if(txt == '日本語'){
            localStorage.setItem('country','日本語');
        }else if(txt == '俄罗斯'){
            localStorage.setItem('country','俄罗斯');
        }else if(txt == '한국어'){
            localStorage.setItem('country','韩国');
        }
        //한국어   韩文
        window.location.reload()
    }
    componentWilldMount(){

    }
    componentDidMount(){
        var _this = this;
        //setTimeout(function () {
            if( !window.defaultAccount ){
                _this.setState({
                    navFirstTxt:HD_lANG['header3'][globalLang],
                    navFirstUrl:"/account/login.html"
                })
            }else{
                _this.setState({
                    navFirstTxt:HD_lANG['header2'][globalLang],
                    navFirstUrl:"/index.html"
                })
            }
       // },100)
    }
    render(){
        var _selectNumber = this.props.data;

            return(
                <div className="top-right">
                    <div className="top-nav">
                        <a href={this.state.navFirstUrl} className={ _selectNumber == 0 ? "select" : "" }>{this.state.navFirstTxt}</a>
                        <a href="/mydog/petCenter.html" className={ _selectNumber == 1 ? "select" : "" }>{HD_lANG['header4'][globalLang]}</a>
                        <a href="/list/list.html" className={ _selectNumber == 2 ? "select" : "" }>{HD_lANG['header5'][globalLang]}</a>
                        <a href="/list/breed.html" className={ _selectNumber == 3 ? "select" : "" }>{HD_lANG['header6'][globalLang]}</a>
                        <a href="/mydog/rank.html" className={ _selectNumber == 4 ? "select" : "" }>{HD_lANG['rank-tit'][globalLang]}</a>
                        <a href="/notice.html" className={ _selectNumber == 5 ? "select" : "" }>{HD_lANG['header7'][globalLang]}</a>
                        <a href="/friends.html" className={ _selectNumber == 6 ? "select" : "" }>{HD_lANG['header8'][globalLang]}</a>
                        {/* <a href="/feedback.html" className={ _selectNumber == 6 ? "select" : "" }>{HD_lANG['header9'][globalLang]}</a> */}

                        {/*{this.state.datas.map(function(name,i) {
                            return <a href={name.url} key={name.url} className={ _selectNumber == i ? "select" : "" }>{name.name}</a>;
                        })}*/}
                    </div>
                    <div className="inter-lang">
                        <a href="#" onClick={this.setCountry}>English</a>
                        <a href="#" onClick={this.setCountry}>中文</a>
                        <a href="#" onClick={this.setCountry}>日本語</a>
                        <a href="#" onClick={this.setCountry}>한국어</a>
                    </div>
                </div>
            )

    }
}






export default Header;