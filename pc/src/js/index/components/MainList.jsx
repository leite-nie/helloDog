import React from 'react';

import img from  '../../../images/img0327/index-1.png';




class IndexTop extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            text1 : "",
            text2 :""
        }
    }
    getVariationEvent(){

    }
    getGenesisEvent(){

    }
    scrollToLeft(){

        let left = 0;
        let interFunc;
        function scrollFunc(obj) {
            left--;

            if( left <= -700 ){
                left = 100;
            }


            obj.css({left:left});
        }
        $(".text-p").on("mouseover",function () {
            clearInterval(interFunc);

        })

        $(".text-p").on("mouseout",function () {
            interFunc = setInterval(()=>{
                scrollFunc($(".text-p"));
            },30)
        })
        interFunc = setInterval(()=>{
            scrollFunc($(".text-p"));
        },30)
    }
    componentWillMount(){

    }
    componentDidMount(){
        setTimeout(()=>{
            this.scrollToLeft();
        },1000)
    }
    createMarkup(str,data) {
        if(!data.length) {
            return {__html: str};
        }else if(data.length == 1){
            str = str.replace('placeholder1',data[0]);
            return {__html: str};
        }else if(data.length == 2){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]);
            return {__html: str};
        }else if(data.length == 3){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]);
            return {__html: str};
        }else if(data.length == 4){
            str = str.replace('placeholder1',data[0]).replace(/placeholder2/g,data[1]).replace('placeholder3',data[2]).replace('placeholder4',data[3]);
            return {__html: str};
        }
    }
    render(){
        let _this = this;
        let toDayBirthDogProfit = parseInt(Number(this.props.data.toDayBirthDogProfit)*10000)/10000;
        
        return(
            <div className="indexTop">

                <div className="index-scroll">
                    {!_this.props.data.scrollGensDogName ? "" :
                        <div className="text-box"></div>
                    }
                    {!_this.props.data.scrollGensDogName ? "" :
                    <p className="text-p">
                        {this.createMarkup(HD_lANG['winning27'][globalLang], [_this.props.data.scrollGensAccountName[0].toName]).__html}
                        {/* {HD_lANG['winning22'][globalLang]+ _this.props.data.scrollGensAccountName[0].toName + " " + HD_lANG['winning23'][globalLang]+HD_lANG['list20'][globalLang] + HD_lANG['winning24'][globalLang]} */}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {_this.props.data.scrollGensDogName.length > 1 ?
                            this.createMarkup(HD_lANG['winning27'][globalLang], [_this.props.data.scrollGensAccountName[1].toName]).__html
                            // HD_lANG['winning22'][globalLang]+ _this.props.data.scrollGensAccountName[1].toName + " " + HD_lANG['winning23'][globalLang]+HD_lANG['list20'][globalLang] + HD_lANG['winning24'][globalLang]
                        : ""}
                    </p>
                    }

                </div>

                <div className="index-top">
                    <div className="lottery-box">
                        <span className="lottery-7">{HD_lANG['index2'][globalLang]}</span>
                        <span className="lottery-8">{HD_lANG['index3'][globalLang]}</span>
                        <span className="lottery-1">{this.props.data.bonusPool.toString().substring(0,5)}ETH</span>
                        <span className="lottery-2">{Number(this.props.data.storagePool) < 0.0001 ? 0.001 :this.props.data.storagePool.toString().substring(0,5)}ETH</span>

                    </div>
                    <div className="dividends">
                        <div className="txt">
                            {HD_lANG['index32'][globalLang]}<span className="stg">{toDayBirthDogProfit}ETH</span>
                        </div>
                    </div>
                    <span className="lottery-4">{HD_lANG['index4'][globalLang]}</span>
                    <span className="lottery-5"><a href="/list/list.html">{HD_lANG['index5'][globalLang]}</a></span>
                    <span className="lottery-6"><a href="/awardExplain.html?type=2">{HD_lANG['index6'][globalLang]}</a></span>

                    <span className="lottery-9">
                        <em>{HD_lANG['index0'][globalLang]}</em>
                        <em>{HD_lANG['index1'][globalLang]}</em>
                    </span>
                </div>
            </div>
        )
    }
}

class IndexLottery extends  React.Component{
    constructor(props){
        super(props);
        //this.scrollHistory = this.scrollHistory.bind(this);
    }
    scrollHistory(){
        var demo = document.getElementById("scroll1");
        var demo1 = document.getElementById("scroll2");
        var demo2 = document.getElementById("scroll3");
        var speed = 50; //滚动速度值，值越大速度越慢
        /*var nnn = 200 / demo1.offsetHeight;
        for (var i = 0; i < nnn; i++) {
            demo1.innerHTML += demo1.innerHTML;
        }*/
        demo2.innerHTML = demo1.innerHTML;
        function Marquee() {
            if (demo2.offsetTop - demo.scrollTop <= 1){
                demo.scrollTop -= demo1.offsetHeight;
            }else {
                demo.scrollTop++;
            }
        }

        var MyMar = setInterval(Marquee, speed);
        demo.onmouseover = function() {
            clearInterval(MyMar);
        }
        demo.onmouseout = function() {
            MyMar = setInterval(Marquee, speed);
        }
    }
    componentDidMount(){
        let _this = this;
        // 阻止中奖人数不足3人时中奖名单出现双倍显示
        document.title = HD_lANG['index-tit'][globalLang];
        setTimeout(()=>{
            if(_this.props.data.winLists.length < 5) {
                return;
            }
            _this.scrollHistory()
        },2000)
    }
    componentWillMount(){
        let invitationCode = getUrlPar('invitationCode');
        if( invitationCode ){
            localStorage.setItem("invitationCode",invitationCode)
        }
    }
    createMarkup(str,data) {
        if(data.length == 2){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]);
            return {__html: str};
        }else if(data.length == 3){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]);
            return {__html: str};
        }else if(data.length == 4){
            str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]).replace('placeholder4',data[3]);
            return {__html: str};
        }
    }
    render(){
        let _this = this;
        return(
            <div className="indexLottery">
                <div className="index-lottery clearfix">

                    <div className="lottery-user">
                        <span className="tit-1">{HD_lANG['index7'][globalLang]}</span>
                        <div className="scroll-ul" id="scroll1">
                            <div id="scroll2">
                                <ul>
                                    {this.props.data.winLists.length== 0 ?   "" :

                                            this.props.data.winLists.map((n, i) => {
                                                return <li key={i} dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['index22'][globalLang],[n.nickName.substring(0,10),n.amount.toString().substring(0,5)])}>
                                                    {/*<span>{n.nickName.substring(0,10)} </span>
                                                    <span>获得了</span>
                                                    <span>{n.amount.toString().substring(0,5)}ETH</span>*/}
                                                </li>
                                            })

                                    }
                                </ul>
                            </div>
                            <div id="scroll3"></div>

                        </div>
                    </div>
                    <div className="lottery-number">
                        <div className="lottery-this">
                            <em>{HD_lANG['index8'][globalLang]}</em>
                            {/* <em>本期HelloDog开奖为：</em>
                            <span>dog #10554</span> */}
                        </div>
                        <div className="lottery-gem">
                            {!this.props.data.lotteryResult2 ? HD_lANG['alert0'][globalLang] :
                                <div>
                                    <span className="first" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["1"]}><img src={api_img_host+"img/gem/index-1/"+ Number(this.props.data.lotteryResult2["1"]).toString(16)+".png"} alt=""/></span>
                                    <span className="second" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["2"]}><img src={api_img_host+"img/gem/index-2/"+Number(this.props.data.lotteryResult2["2"]).toString(16)+".png"} alt=""/></span>
                                    <span className="third" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["3"]}><img src={api_img_host+"img/gem/index-3/"+Number(this.props.data.lotteryResult2["3"]).toString(16)+".png"} alt=""/></span>
                                    <span className="fourth" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["4"]}><img src={api_img_host+"img/gem/index-4/"+Number(this.props.data.lotteryResult2["4"]).toString(16)+".png"} alt=""/></span>
                                    <span className="fiveth" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["5"]}><img src={api_img_host+"img/gem/index-5/"+Number(this.props.data.lotteryResult2["5"]).toString(16)+".png"} alt=""/></span>
                                    <span className="sixth" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["6"]}><img src={api_img_host+"img/gem/index-6/"+Number(this.props.data.lotteryResult2["6"]).toString(16)+".png"} alt=""/></span>
                                    <span className="seventh" title={HD_lANG['petInfo16'][globalLang]+this.props.data.lotteryResult2["7"]}><img src={api_img_host+"img/gem/index-7/"+Number(this.props.data.lotteryResult2["7"]).toString(16)+".png"} alt=""/></span>
                                </div>
                            }



                        </div>
                        <div className="total-lottery">{HD_lANG['index9'][globalLang]}&nbsp;<span>{this.props.data.totalWinCount}{HD_lANG['index9-0'][globalLang]}</span></div>
                        <div className="lottery-history"><a href="/history.html" >{HD_lANG['index10'][globalLang]}</a></div>
                        <div className="lottery-txt"><a href="/awardExplain.html?type=3" >{HD_lANG['index11'][globalLang]}</a></div>

                    </div>
                    <div className="lottery-img">
                        {!this.props.data.lotteryResult2 ? "" :
                            <img src={
                                this.props.data.returnObj.imgHost
                                +Number(this.props.data.lotteryResult2["1"]).toString(16)
                                    +Number(this.props.data.lotteryResult2["2"]).toString(16)
                                        +Number(this.props.data.lotteryResult2["3"]).toString(16)
                                        +Number(this.props.data.lotteryResult2["4"]).toString(16)
                                        +Number(this.props.data.lotteryResult2["5"]).toString(16)
                                        +Number(this.props.data.lotteryResult2["6"]).toString(16)
                                        +Number(this.props.data.lotteryResult2["7"]).toString(16)
                                +"00000.png"} alt=""
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}


class IndexChampion extends React.Component {
    render(){
        let GenesisProfit = parseInt(Number(this.props.data.GenesisProfit)*2000)/1000

        return(
            <div className="IndexChampion">
                <div className="dividends">
                    <div className="txt">
                        {HD_lANG['index31'][globalLang]}<span className="stg">{GenesisProfit}ETH</span>
                    </div>
                </div>

                <div className="index-first">
                    {!this.props.data.returnObj ? "" :
                        <a href={"/list/detail.html?id=" + this.props.data.Genesis[0].dogId}>
                            <img src={this.props.data.returnObj.imgHost + this.props.data.Genesis[0].genesStr +".png"} alt="pet"/>
                        </a>
                    }
                    <div className="now-amount">{HD_lANG['index12'][globalLang]}<span>{this.props.data.Genesis.length==0?"":this.props.data.Genesis[0].startPrice}ETH</span></div>
                    <div className="owner clearfix">
                        <span>{this.props.data.Genesis.length==0?"":HD_lANG['list20'][globalLang]}</span>
                        <span>{this.props.data.Genesis.length==0?"": this.props.data.Genesis[0].accountId<100 ? HD_lANG['winning13'][globalLang] :  this.props.data.Genesis[0].userName }</span>
                    </div>
                    <span className="star-1"></span>
                    <span className="star-2"></span>
                    <span className="star-3"></span>
                </div>
                <div className="index-first index-second">
                    {!this.props.data.returnObj ? "" :
                        <a href={"/list/detail.html?id=" + this.props.data.Genesis[1].dogId}>
                            <img src={this.props.data.returnObj.imgHost + this.props.data.Genesis[1].genesStr +".png"} alt="pet"/>
                        </a>
                    }
                    <div className="now-amount">{HD_lANG['index12'][globalLang]}<span>{this.props.data.Genesis.length==0?"":this.props.data.Genesis[1].startPrice}ETH</span></div>
                    <div className="owner clearfix">
                        <span>{this.props.data.Genesis.length==0?"":HD_lANG['list20'][globalLang]}</span>
                        <span>{this.props.data.Genesis.length==0?"":this.props.data.Genesis[1].accountId<100 ? HD_lANG['winning13'][globalLang] :  this.props.data.Genesis[1].userName}</span>
                    </div>
                    <span className="star-1"></span>
                    <span className="star-2"></span>
                    <span className="star-3"></span>
                </div>
                <div className="index-first-rule">
                    <a href="/awardExplain.html?type=1">{HD_lANG['index13'][globalLang]}</a>
                </div>
            </div>
        )
    }
}

class IndexExplainList extends  React.Component{
    constructor(props) {
        super(props)
        this.state = {
            currentTab: 1
        }
    }
    tabChange(currentTab, event) {
        this.setState({
            currentTab: currentTab
        })
    }
    render(){
        let currentTab = this.state.currentTab
        return(
            <div className="IndexExplainList">

                {/* <div className="list-box">
                    <div className="title">
                        <span className="l"></span>
                        <span className="m"><em>&nbsp;</em><em>{HD_lANG['index14'][globalLang]}</em></span>
                        <span className="r"></span>
                    </div>
                    <div className="sub-list">
                        <p>{HD_lANG['index14-0'][globalLang]}</p>
                    </div>
                </div> */}
                <div className="list-box list-box-tab">
                    <div className="tab-title">
                        <div className={currentTab == 1 ? "title active" : 'title'} onClick={this.tabChange.bind(this, 1)}>
                            <span className="l"></span>
                            <span className="m"><em>&nbsp;</em><em>{HD_lANG['index14'][globalLang]}</em></span>
                            <span className="r"></span>
                        </div>
                        <div className={currentTab == 2 ? "title active" : 'title'} onClick={this.tabChange.bind(this, 2)}>
                            <span className="l"></span>
                            <span className="m"><em>&nbsp;</em><em>{HD_lANG['index24'][globalLang]}</em></span>
                            <span className="r"></span>
                        </div>
                    </div>
                    <div className={currentTab == 1 ? "sub-list current" : 'sub-list'}>
                        <p>{HD_lANG['index14-0'][globalLang]}</p>
                    </div>
                    <div className={currentTab == 2 ? "sub-list current" : 'sub-list'}>
                        <ul className="plan-list">
                            <li>
                                <div className="date">{HD_lANG['index30'][globalLang]}</div>
                                <div className="cnt">
                                    <div className="top"><span>{HD_lANG['index26'][globalLang]}</span></div>
                                    <div className="txt vertical">
                                        <div className="art">
                                            <span>{HD_lANG['index27'][globalLang]}</span>
                                        </div>
                                    </div>
                                    {/* <div className="state">
                                        <span>{HD_lANG['index28'][globalLang]}</span>
                                    </div> */}
                                    {/* 为红色背景 已完成 */}
                                    <div className="state state2">
                                        <span>{HD_lANG['index29'][globalLang]}</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="list-box">
                    <div className="title">
                        <span className="l"></span>
                        <span className="m"><em>&nbsp;</em><em>{HD_lANG['index15'][globalLang]}</em></span>
                        <span className="r"></span>
                    </div>
                    <div className="sub-list">
                        <p>{HD_lANG['index15-0'][globalLang]}</p>
                        <div className="install-explain">
                            {/*<a href="/tips.html" className="install-btn" target="_blank">{HD_lANG['winning14'][globalLang]}</a>*/}
                            <a href="/guide.html" className="install-btn">{HD_lANG['index15-1'][globalLang]}</a>
                            <a href="http://v.youku.com/v_show/id_XMzUzMzA1OTg3Mg==.html?spm=a2hzp.8253869.0.0" className="install-btn" target="_blank">{HD_lANG['index15-2'][globalLang]}</a>
                        </div>

                    </div>
                </div>
                <div className="list-box">
                    <div className="title">
                        <span className="l"></span>
                        <span className="m"><em>&nbsp;</em><em>{HD_lANG['index16'][globalLang]}</em></span>
                        <span className="r"></span>
                    </div>
                    <div className="sub-list">
                        <p>{HD_lANG['index16-0'][globalLang]}</p>
                        <div className="img-bg"></div>
                    </div>
                </div>
                <div className="list-box">
                    <div className="title">
                        <span className="l"></span>
                        <span className="m"><em>&nbsp;</em><em>{HD_lANG['index17'][globalLang]}</em></span>
                        <span className="r"></span>
                    </div>
                    <div className="sub-list">
                        <p>{HD_lANG['index17-0'][globalLang]}</p>
                    </div>
                </div>
                <div className="explain-box clearfix">
                    <div className="title clearfix">
                        <span className="tit-l"><em>{HD_lANG['index18'][globalLang]}</em></span>
                        <span className="tit-r"><em>{HD_lANG['index19'][globalLang]}</em></span>
                    </div>
                    <div className="sub-explain">
                        <div className="sub-exp-box">
                            <p>{HD_lANG['index18-0'][globalLang]}</p>
                        </div>
                    </div>
                    <div className="sub-explain">
                        <div className="sub-exp-box">

                            <p>{HD_lANG['index19-0'][globalLang]} </p>
                        </div>
                    </div>
                </div>
                <div className="list-box lsit-box-last">
                    <div className="title">
                        <span className="l"></span>
                        <span className="m"><em>&nbsp;</em><em>{HD_lANG['index20'][globalLang]}</em></span>
                        <span className="r"></span>
                    </div>
                    <div className="sub-list">
                        <p>{HD_lANG['index20-0'][globalLang]}</p>
                        <a href="/list/list.html" className=" install-btn2">{HD_lANG['index21'][globalLang]}</a>
                    </div>
                </div>
            </div>
        )
    }
}


class IndexList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            html : '',
            totalWinCount : 0,
            Genesis : [],
            bonusPool : 0,
            storagePool : 0,
            lotteryResult : '',//上一期开奖结果
            lotteryResult2:'',
            winLists : '',
            scrollGensAccountName : '',
            scrollGensDogName : '',
            returnObj : null,
            GenesisProfit: 0,

            toDayBirthDogProfit: 0,     //今日0代分红
        }
    }
    getIndexInfo (){
        let _this = this;
        $.ajax({
            url : api_host + "/index",
            data :{

            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == "0000"){
                    let  lotteryResultObj = data.returnObj.lotteryResult;
                    if(!lotteryResultObj){
                        _this.setState({
                            totalWinCount : data.returnObj.totalWinCount,
                            Genesis : data.returnObj.Genesis, //创世狗2只数组
                            bonusPool : data.returnObj.bonusPoolInfo.bonusPool, //奖金池信息
                            storagePool : data.returnObj.bonusPoolInfo.storagePool, //蓄奖池
                            lotteryResult :null,//上一期开奖结果
                            winLists : data.returnObj.winLists,
                            lotteryResult2 : null,
                            scrollGensAccountName:( data.returnObj.GenesisTransferLog.length ? data.returnObj.GenesisTransferLog : null),
                            scrollGensDogName : ( data.returnObj.GenesisTransferLog.length ? data.returnObj.GenesisTransferLog : null),
                            returnObj : data.returnObj,
                            GenesisProfit: data.returnObj.GenesisProfit,
                            toDayBirthDogProfit: data.returnObj.toDayBirthDogProfit,
                        })
                    }else {
                        _this.setState({
                            totalWinCount : data.returnObj.totalWinCount,
                            Genesis : data.returnObj.Genesis, //创世狗2只数组
                            bonusPool : data.returnObj.bonusPoolInfo.bonusPool, //奖金池信息
                            storagePool : data.returnObj.bonusPoolInfo.storagePool, //蓄奖池
                            lotteryResult : data.returnObj.lotteryResult,//上一期开奖结果
                            winLists : data.returnObj.winLists,
                            lotteryResult2 : ( JSON.parse(data.returnObj.lotteryResult.lotteryResult)),
                            scrollGensAccountName:( data.returnObj.GenesisTransferLog.length ? data.returnObj.GenesisTransferLog : null),
                            scrollGensDogName : ( data.returnObj.GenesisTransferLog.length ? data.returnObj.GenesisTransferLog : null),
                            returnObj : data.returnObj,
                            GenesisProfit: data.returnObj.GenesisProfit,
                            toDayBirthDogProfit: data.returnObj.toDayBirthDogProfit,
                        })
                    }

                }
            }
        })
        //
    }
    componentWillMount(){
        this.getIndexInfo();
    }
    componentDidMount(){
        var _this = this;

    }
    render (){
        return(
            <div>
                <IndexTop data={this.state}></IndexTop>
                <IndexLottery data={this.state}></IndexLottery>
                <IndexChampion data={this.state}></IndexChampion>
                <IndexExplainList></IndexExplainList>
            </div>

        )
    }
}
export default IndexList;



