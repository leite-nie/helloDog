import React from 'react';
import $ from 'n-zepto';
import common from '../../common.js';
import winAlert from '../../winAlert.js';
import ReactPullLoad,{ STATS } from 'react-pullload';
class Index extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageSize : 10,
            curType : 1,
            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,
            totalNum : ''
        }
        this.handleAction = this.handleAction.bind(this)
    }
    componentWillMount (){
        common.setPageTitle(HD_lANG['ogclist0'][globalLang]);
        this.getOgcList(1);

    }
    // 获取个人信息
    getMasterInfo() {
        var _this = this;
        $http('/user/userInfo', {
            walletAddress : defaultAccount
        }).then(function(data) {
            if(data.code == '0000' ){
                _this.setState({
                    ogcAmount: data.returnObj.canGetOGC,
                    redoundMoney : data.returnObj.redoundMoney,
                })
            }
        })
    }
    getOgcList(page){
        let _this = this;
        let _url = "/user/ogcTransferLog";
        var fromAddress,toAddress;
        if(_this.state.curType == 1){
            fromAddress = window.defaultAccount;
            toAddress = "";
        }else{
            toAddress = window.defaultAccount;
            fromAddress = "";
        }
        $http(_url, {
            fromAddress : fromAddress,
            toAddress : toAddress,
            toPage :page,
            pageSize : _this.state.pageSize
        }).then(function(data) {
            if(data.code == "0000") {
                let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                let _list = data.returnObj.list.length ==0 ? null : data.returnObj.list;
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
            _this.getOgcList(1);
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
                _this.getOgcList(_this.state.index)

            }
        }, 1500)

        this.setState({
            action: STATS.loading
        })
    }
    //下拉刷新结束
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
            _this.getOgcList(page)
        },100)
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
    render(){
        let _this = this;
        return(

            <div className="ogclist-wrap">
                <div className="tab">
                    <ul className="clearfix">
                        <li className={this.state.curType == 1 ? 'active' : ''}  onClick={this.tabMenuFunc.bind(this, 1,1)}><span>{HD_lANG['ogclist1'][globalLang]}</span></li>
                        <li className={this.state.curType == 2 ? 'active' : ''}  onClick={this.tabMenuFunc.bind(this, 2,1)}><span>{HD_lANG['ogclist2'][globalLang]}</span></li>
                    </ul>
                </div>
                {this.state.totalNum != 0 ? (
                    <ReactPullLoad
                        downEnough={150}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={this.state.hasMore}
                        style={{paddingTop: 0}}
                        distanceBottom={200}>
                        <ul className="ogc-list">
                            <li className="title">
                                <span className="t1">{HD_lANG['ogclist3'][globalLang]}</span>
                                <span className="t2">{HD_lANG['ogclist4'][globalLang]}</span>
                                <span className="t3">{HD_lANG['ogclist5'][globalLang]}</span>
                                <span className="t4">{HD_lANG['ogclist6'][globalLang]}</span>
                            </li>
                            {this.state.data.map(function(name,i) {
                                return <li key={i}>
                                    <span className="t1">{name.fromAccountAddress}</span>
                                    <span className="t2">{_this.state.curType == 1 ? HD_lANG['ogclist1'][globalLang] :HD_lANG['ogclist2'][globalLang]}</span>
                                    <span className="t3">{name.amount}</span>
                                    <span className="t4">{_this.formatDate(name.createTime)}</span>
                                </li>
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