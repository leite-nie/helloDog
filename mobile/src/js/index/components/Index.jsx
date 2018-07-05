import React from 'react';
import common from '../../common.js';
import ReactPullLoad,{ STATS } from 'react-pullload';

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dogs: [],
            currentBlockNum: 0,
            total: 0,
            imgHost: '',
            likeNumber: [],
            order : "2",
            orderBy: 0,
            curType: 2,
            pageSize: 8,
            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,
            // 值不为空时为搜索该狗狗
            dogId: '',

            scrollGensAccountName: '',
            scrollGensDogName: '',

        }
        this.handleAction = this.handleAction.bind(this)
    }
    componentDidMount(){
        this.getDogList(this.state.curType, this.state.orderBy, 1)
        this.getIndexInfo()
        window.resetMarquee = this.getIndexInfo.bind(this)
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    
    // 获取狗狗
    getDogList(type, order, page) {
        var _this = this

        $http('/dog/dogList', {
            listType : type,    //0-所有 1-官方 2-出售 3-租赁
            orderBy :this.state.order,     //排序规则 0-IDid排序 1-根据id倒序2-根据价格 3根据
            toPage : page,
            pageSize : this.state.pageSize,
            dogId: this.state.dogId,
        }).then(function(data) {
            var dogs = [];
            if(type == 3) {
                dogs = data.returnObj.allList
            }else{
                if(page == 1 && !_this.state.dogId){
                    if(data.returnObj.allList){
                        dogs = data.returnObj.Genesis.concat(data.returnObj.allList);
                    }else{
                        dogs = data.returnObj.Genesis;
                    }
                }else{
                    dogs = data.returnObj.allList || [];
                }
            }
            
            if(data.code == '0000') {
                _this.setState({
                    dogs: dogs,
                    total: (type != 3 ? data.returnObj.total+2 : data.returnObj.total),
                    imgHost: data.returnObj.imgHost,
                    currentBlockNum: data.returnObj.currentBlockNum,
                    likeNumber: data.returnObj.likeNumber,
                    data: _this.state.data.concat(dogs),
                    action: STATS.reset,
                    index: _this.state.index + 1
                });
            }
        })
    }
    sort() {
        var orderBy = 2;
        if(this.state.orderBy != 3){
            orderBy = 3
        }
        this.setState({
            orderBy: orderBy,
            data: [],
        })
        this.getDogList(this.state.curType, orderBy, 1)
    }
    // 搜索
    search() {
        var _this = this;
        var dogId = this.refs.dogId.value;
        var type = this.state.curType;
        // console.log(dogId, '-----------')
        $http('/dog/dogList', {
            listType : type,    //0-所有 1-官方 2-出售 3-租赁
            orderBy : 0,     //排序规则 0-IDid排序 1-根据id倒序 2-根据价格 3根据
            toPage : 1,
            dogId: dogId,
            pageSize : this.state.pageSize
        }).then(function(data) {
            if(data.code == '0000') {
                _this.setState({
                    total: data.returnObj.total,
                    imgHost: data.returnObj.imgHost,
                    currentBlockNum: data.returnObj.currentBlockNum,
                    likeNumber: data.returnObj.likeNumber,
                    data: data.returnObj.allList,
                    index : 1,
                    hasMore : false,
                    action: STATS.init,
                });
                _this.setState({
                    dogId: dogId
                })
            }
        })
    }
    // 购买创世狗者信息
    getIndexInfo() {
        var _this = this;
        $http('/index').then(function(data) {
            if(data.code == '0000') {
                _this.setState({
                    scrollGensAccountName:( data.returnObj.GenesisTransferLog.length ? data.returnObj.GenesisTransferLog : null),
                    scrollGensDogName : ( data.returnObj.GenesisTransferLog.length ? data.returnObj.GenesisTransferLog : null),
                })
            }
        })
    }
    addVote(dogId, event){
        if(!window.defaultAccount){
            winAlert.show(HD_lANG['alert22'][globalLang]);
            return false;
        }
        var _val = event.target.innerText;
        _val = Number(_val);
        var _obj = $(event.target);
        $http('/dog/thumbsUp', {
            dogId: dogId,
            walletAddress: window.defaultAccount
        }).then(function(data) {
            if(data.code = "0000") {
                _obj.text(data.returnObj.thumbsUp)
            }
        })
    }
    //下拉刷新
    handleAction  (action)  {
        let _this = this;
        console.info(action, _this.state.action,action === _this.state.action);
        //new action must do not equel to old action
        if(action === _this.state.action){
            return false
        }

        if(action === STATS.refreshing){//刷新
           _this.handRefreshing();
        } else if(action === STATS.loading){//加载更多
            _this.handLoadMore();
        } else{
            //DO NOT modify below code
            _this.setState({
                action: action
            })
        }
    }

    handRefreshing  () {
        let _this = this;
        if(STATS.refreshing === this.state.action){
            return false
        }

        setTimeout(()=>{
            //refreshing complete
            _this.getDogList(_this.state.curType,0,1);
            _this.setState({
                data : [],
                hasMore: true,
                action: STATS.refreshed,
                index : 1
            })
           /* this.setState({
                data: cData,
                hasMore: true,
                action: STATS.refreshed,
                index: Math.ceil((this.state.total/this.state.pageSize))
            });*/
        }, 1500)

        this.setState({
            action: STATS.refreshing
        })
    }

    handLoadMore  ()  {
        let _this = this;
        if(STATS.loading === this.state.action){
            return false
        }
        //无更多内容则不执行后面逻辑
        if(!this.state.hasMore){
            return;
        }

        setTimeout(()=>{
            let totalPage = Math.ceil((_this.state.total/_this.state.pageSize));
            if(_this.state.index > totalPage){
                _this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else{
                _this.getDogList(_this.state.curType,0,_this.state.index)

            }
        }, 1500)

        this.setState({
            action: STATS.loading
        })
    }
    //下拉刷新结束


    sortChange(event) {
        let _this = this;
        let value = event.currentTarget.value;
        this.setState({
            order : value,
            data: [],
        }, function() {
            _this.getDogList(_this.state.curType, _this.state.order, 1)
        })
    }


    // 菜单切换
    tabMenuFunc(type, order, page){
        let _this = this;
        this.setState({
            curType: type,
            index : 1,
            hasMore : true,
            action: STATS.init,
            data : [],
            dogId: '',
        }, function() {
           _this.getDogList(_this.state.curType, _this.state.order, page)
        })
    }
    render(){
        let currentBlockNum = this.state.currentBlockNum
        let curType = this.state.curType
        
        return(
            <div className="index-wrap">

                <div className="search-wrap">
                    <input type="tel" placeholder={HD_lANG['list21'][globalLang]} ref="dogId"/>
                    <span className="icon-search" onClick={this.search.bind(this)}></span>
                </div>
                
                <div className="list-wrap">

                    <div className="tab">
                        <ul>
                            <li className={curType == 2 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 2, 0, 1)}><span>{HD_lANG['list0'][globalLang]}</span></li>
                            <li className={curType == 1 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 1, 0, 1)}><span>{HD_lANG['list1'][globalLang]}</span></li>
                            <li className={curType == 3 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 3, 0, 1)}><span>{HD_lANG['petCenter12'][globalLang]}</span></li>
                            <li className={curType == 0 ? 'active' : ''} onClick={this.tabMenuFunc.bind(this, 0, 0, 1)}><span>{HD_lANG['list2'][globalLang]}</span></li>
                        </ul>
                    </div>

                    <div className="index-scroll">
                        {!this.state.scrollGensDogName ? "" :
                            <div className="text-box"></div>
                        }
                        {!this.state.scrollGensDogName ? "" :
                            <div className="txt-wrap">
                                <p className="text-p">
                                    {HD_lANG['winning22'][globalLang]+ this.state.scrollGensAccountName[0].toName + HD_lANG['winning23'][globalLang]+HD_lANG['list20'][globalLang] + HD_lANG['winning24'][globalLang]}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    {this.state.scrollGensDogName.length > 1 ?
                                        HD_lANG['winning22'][globalLang]+ this.state.scrollGensAccountName[1].toName + HD_lANG['winning23'][globalLang]+HD_lANG['list20'][globalLang] + HD_lANG['winning24'][globalLang]
                                    : ""}
                                </p>
                            </div>
                        }

                    </div>

                    <div className="list-view">
                        <div className="top">
                            {/*<span className="total">总数:{this.state.total}</span>*/}
                            {/*<span className="sort" onClick={this.sort.bind(this)}>由高到低</span>*/}
                            <div className="sort">
                                <div className="select">
                                    <select name="" id="" onChange={this.sortChange.bind(this)}>
                                        <option value="2">{HD_lANG['list5-2'][globalLang]}</option>
                                        <option value="3">{HD_lANG['list5'][globalLang]}</option>
                                        <option value="0">{HD_lANG['list5-5'][globalLang]}</option>
                                        <option value="1">{HD_lANG['list5-4'][globalLang]}</option>
                                        <option value="5">{HD_lANG['list5-1'][globalLang]}</option>
                                        <option value="4">{HD_lANG['list5-3'][globalLang]}</option>
                                    </select>
                                </div>
                            </div>

                            <span className="total">{HD_lANG['list3'][globalLang]}：{this.state.total}</span>
                            {/* <span className="sort" onClick={this.sort.bind(this)}>价格排序</span> */}

                        </div>
                        <div className="handle-tips">提示: 操作成功后，矿工会进行挖矿，这个时间需要用户耐心等待，挖矿成功后刷新页面即可显示。</div>
                        {this.state.total != 0 ? (
                            <ReactPullLoad
                                downEnough={150}
                                action={this.state.action}
                                handleAction={this.handleAction}
                                hasMore={this.state.hasMore}
                                style={{paddingTop: 0}}
                                distanceBottom={100}>
                                <ul className="test-ul clearfix">
                                    {this.state.data.map((item, index) => (

                                        <li className={item.dogId == 1 || item.dogId == 0 ? "item-view adjust" : "item-view"} key={item.dogId}>
                                            <a href={"/mobile/index/detail.html?dogId=" + item.dogId} onClick={this.pushMethod.bind(this, "/mobile/index/detail.html?dogId=" + item.dogId)} className={'pic item-bd-' + common.getBgColorClass(item.genesStr, 7)}>
                                                {/* {2 > 0 && <div className={'beyond beyond-bd-' +  1}>{common.switchAwards(1 - 1)}</div>} */}
                                                {item.lotteryLevel > 0 && <div className={'beyond beyond-bd-' +  item.lotteryLevel}>{common.switchAwards(item.lotteryLevel - 1)}</div>}
                                                {item.status == 1 || item.status == 2 ? (
                                                    <div className={"top-tag " + common.switchIcon(item.status)}>
                                                        {common.getStateText(item.status, currentBlockNum, item.endBolckNumber)}
                                                        <span className="icon">{common.getDogCurrentPrice(item.startPrice,item.endPrice,currentBlockNum,item.eventBlockNumber,item.duration)}</span>
                                                    </div>
                                                ) : (
                                                    <div className="top-tag visibility">&nbsp;</div>
                                                )}
                                                <img src={item.variation == 0 ? this.state.imgHost + item.genesStr +".png" :"http://www.haloudog.com/img/otherdog/variation.png"} alt="pet"/>
                                                {item.dogId != 0 && item.dogId != 1 &&
                                                    <div className="bottom-tag">

                                                        {common.switchCoolDownIndex(item.coolDownIndex)}{/*<span className="icon icon-hint"></span>*/}

                                                        {/*{common.switchCoolDownIndex(item.coolDownIndex)}*/}
                                                        {/* <span className="icon icon-hint"></span> */}

                                                    </div>
                                                }
                                            </a>
                                            <div className="info">
                                                <em className="ellipsis">{item.dogName}</em>
                                                {item.dogId != 0 && item.dogId != 1 && (
                                                    <strong>
                                                        <span>ID{item.dogId}</span>
                                                        <span className={'gen' + item.generation}>{item.generation}{HD_lANG['list7'][globalLang]}</span>
                                                        <span>{common.switchCoolDownIndex(item.coolDownIndex)}</span>
                                                    </strong>
                                                )}
                                            </div>
                                            <div className="collect icon-love" onClick={this.addVote.bind(this, item.dogId)}>{this.state.likeNumber[item.dogId] ? this.state.likeNumber[item.dogId] : "0"}</div>
                                        </li>
                                    ))}
                                </ul>
                            </ReactPullLoad>
                        ) : (
                            <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                        )}
                        {/*<ul className="clearfix">
                            {this.state.dogs.map((item, index) => (
                                <li className="item-view" key={item.dogId}>
                                    <a href={"/mobile/index/detail.html?dogId=" + item.dogId} onClick={this.pushMethod.bind(this,item.dogId,"/mobile/index/detail.html?dogId=")} className={'pic item-bd-' + common.getBgColorClass(item.genesStr, 7)}>
                                        {item.status == 1 || item.status == 2 ? (
                                            <div className="top-tag icon-tag">
                                                {common.getStateText(item.status, currentBlockNum, item.endBolckNumber)}
                                                <span className="icon">{common.getDogCurrentPrice(item.startPrice,item.endPrice,currentBlockNum,item.eventBlockNumber,item.duration)}</span>
                                            </div> 
                                        ) : (
                                            <div className="top-tag"></div>
                                        )}
                                        <img src={item.variation == 0 ? this.state.imgHost + item.genesStr +".png" :"http://www.haloudog.com/img/otherdog/variation.png"} alt="pet"/>
                                        <div className="bottom-tag">
                                            {common.switchCoolDownIndex(item.coolDownIndex)}<span className="icon icon-hint"></span>
                                        </div>
                                    </a>
                                    <div className="info">
                                        {item.dogName}
                                        {item.dogId != 0 && item.dogId != 1 && (
                                            <strong>
                                                <span>{item.generation}代</span><span>{common.switchCoolDownIndex(item.coolDownIndex)}</span>
                                            </strong>
                                        )}
                                    </div>
                                    <div className="collect icon-love">{this.state.likeNumber[item.dogId]}</div>
                                </li>
                            ))}
                        </ul>*/}
                    </div>
                </div>
            </div>
        )
    }
}



export default Index;