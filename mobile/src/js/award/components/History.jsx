import React from 'react';
import common from '../../common.js'
import ReactPullLoad,{ STATS } from 'react-pullload';

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            items: [],
            pageSize: 20,
            total: 0,
            term: 0,

            // 刷新加载----
            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,
        }

        this.handleAction = this.handleAction.bind(this)
    }
    componentWillMount() {
        common.setPageTitle(HD_lANG['history-title'][globalLang])
        this.getRewardHistory(1, this.state.pageSize, this.state.term);
    }
    // 所有中奖者
    getRewardHistory(page, pageSize, term){
        let _this = this;
        $http('/lottery/allRewardHistory', {
            toPage :page,
            pageSize : pageSize,
            lotteryTerm: term,
        }).then(function(data) {
            if(data.code == "0000") {
                var lists = data.returnObj.list || []
                _this.setState({
                    data: _this.state.data.concat(lists),
                    index: _this.state.index + 1,
                    action: STATS.reset,
                    total: data.returnObj.total,
                })
            }
        })
    }
    search() {
        var _this = this;
        let issueNum = this.refs.issueNum.value.trim();
        if(!issueNum) {
            winAlert.show(HD_lANG['alert20'][globalLang])
            return;
        }
        $http('/lottery/allRewardHistory', {
            toPage : 1,
            pageSize : this.state.pageSize,
            lotteryTerm :issueNum,
        }).then(function(data) {
            if(data.code == "0000") {
                _this.setState({
                    data: data.returnObj.list,
                    index: _this.state.index + 1,
                    action: STATS.reset,
                    total: data.returnObj.total,
                    term: issueNum,
                })
            }
        })
    }
    // 提取中奖号码
    extractNum(str, event) {
        if(!str) {
            return ''
        }
        var obj = JSON.parse(str);
        return Object.values(obj).toString()
    }
    formatDate(needTime){
        function add0(m){
            return m<10?'0'+m:m
        }

        var time = new Date(needTime);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
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
            _this.getRewardHistory(1, _this.state.pageSize, _this.state.term);
            _this.setState({
                data : [],
                hasMore: true,
                action: STATS.refreshed,
                index : 1
            })
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
            // console.log(_this.state.index, _this.state.total, _this.state.pageSize)
            if(_this.state.index > totalPage){
                _this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else{
                _this.getRewardHistory(_this.state.index, _this.state.pageSize, _this.state.term)
            }
        }, 1500)
        
        this.setState({
            action: STATS.loading
        })
    }
    render(){
        return(
            <div className="history-wrap">
                <div className="history-list">
                    <div className="search-wrap">
                        <div className="issue">
                            <label htmlFor="search">{HD_lANG['history4'][globalLang]}：</label>
                            <input type="text" min="0" max="9999999" ref="issueNum" id="search"/>
                        </div>
                        <div className="btn-def btn-sty2" onClick={this.search.bind(this)}>{HD_lANG['history1'][globalLang]}</div>
                    </div>
                    {/* <div className="tit">历史中奖者记录</div> */}
                    <ul className="list-top">
                        <li>
                            <span className="td-1">{HD_lANG['history2'][globalLang]}</span>
                            <span className="td-2">{HD_lANG['history3'][globalLang]}</span>
                            {/* <span className="td-3">开奖号码</span> */}
                            <span className="td-4">{HD_lANG['history4'][globalLang]}</span>
                            <span className="td-5">{HD_lANG['history6'][globalLang]}</span>
                            <span className="td-6">{HD_lANG['history7'][globalLang]}</span>
                        </li>
                    </ul>
                    {this.state.total != 0 ? (
                        <ReactPullLoad
                        downEnough={150}
                        action={this.state.action}
                        handleAction={this.handleAction}
                        hasMore={this.state.hasMore}
                        style={{paddingTop: 0}}
                        distanceBottom={200}>
                            <ul className="list">
                                {this.state.data.map((item, index) => (
                                    <li key={item.lotteryLevel + '' + item.dogId}>
                                        <span className="td-1">{item.lotteryTerm}</span>
                                        <span className="td-2">{this.formatDate(item.createTime)}</span>
                                        {/* <span className="td-3">{this.extractNum(item.lotteryResult)}</span> */}
                                        <span className="td-4">{item.lotteryLevel}</span>
                                        <span className="td-5">{parseInt(item.lotteryAmount*100000)/100000}</span>
                                        <span className="td-6">{item.nickName}</span>
                                    </li>  
                                ))}
                            </ul>
                        </ReactPullLoad>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                </div>
            </div>
        )
    }
}



export default Index;