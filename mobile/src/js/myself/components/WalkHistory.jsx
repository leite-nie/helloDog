import React from 'react';
import ReactPullLoad,{ STATS } from 'react-pullload';
import common from '../../common.js';



class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageSize : 10,
            curType : 0,
            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,
            totalPage: 0,
            totalNum: 0,
        }
        this.handleAction = this.handleAction.bind(this)
        this.formatDate = this.formatDate.bind(this);
    }
    componentDidMount(){
        common.setPageTitle(HD_lANG['petCenter39'][globalLang])
        this.getEarningList(1)
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    getEarningList(page){ //type1代狗繁殖记录  2 0代狗中奖 3回报记录
        let _this = this;
        let _url = "/dog/walkDogList";
        let type = _this.state.curType;
        $http(_url, {
            walletAddress : window.defaultAccount,
            profitType: type,
            toPage :page,
            pageSize : _this.state.pageSize
        }).then(function(data) {
            if(data.code == "0000") {
                let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                let _list = "";
                if(!data.returnObj.hasOwnProperty("allList")){
                    _list = null;
                }else{
                    _list = data.returnObj.allList.length ==0 ? null : data.returnObj.allList;
                }
                _this.setState({
                    totalPage: totalPage,
                    totalNum: data.returnObj.total,
                    data : _this.state.data.concat(_list),
                    action: STATS.reset,
                    index: _this.state.index + 1
                })
            }else{
                _this.setState({
                    totalNum: 0,
                })
            }
        })

    }
    add0(m){
        return m<10?'0'+m:m
    }
    formatDate(needTime){
        var time = new Date(needTime);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
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
            _this.getEarningList(1);
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
            if(_this.state.index > _this.state.totalPage){
                _this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else{
                _this.getEarningList(_this.state.index)

            }
        }, 1500)

        this.setState({
            action: STATS.loading
        })
    }
    //下拉刷新结束
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
    // 菜单切换
    tabMenuFunc(type,page){
        let _this = this;
        this.setState({
            curType: type,
            index : 1,
            hasMore : true,
            action: STATS.init,
            data : []
        })
        setTimeout(()=>{
            _this.getEarningList(page)
        },100)
    }
    render(){
        let _this = this;
        return(
            <div className="earnings-wrap">
                {this.state.totalNum != 0 ? (
                    <ReactPullLoad
                        downEnough={150}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={this.state.hasMore}
                        style={{paddingTop: 0}}
                        distanceBottom={200}>
                            <ul className="earnings-list">
                                {this.state.data.map(function(name,i) {
                                    return <li key={i}>
                                                <p dangerouslySetInnerHTML={_this.createMarkup(HD_lANG['earning6-1'][globalLang],[_this.formatDate(name.createTime),name.dogNum,name.redoundMoney])}></p>
                                        </li>;
                                })}
                            </ul>
                    </ReactPullLoad>
                ) : (
                    <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                )}
            </div>
        )
    }
}



export default Index;