import React from 'react';
import common from '../../common.js'
import tPopBox  from '../../transactionPop.js'
import winAlert  from '../../winAlert.js'
import ReactPullLoad,{ STATS } from 'react-pullload';
import PageComponent  from '../../common/components/ListPage.jsx';


common.getNonceVal();
class Detail extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            dog: {},
            userInfo: {},
            imgHost: '',
            mate: {},
            gen0BreedProfit: 0,
            deliverFee: web3.utils.toWei('0.005'),
            pageSize: 8,

            // 刷新加载----
            hasMore: true,
            data: [],
            action: STATS.init,
            index: 1,

            //分页
            total: 0,//总记录数
            current: 1, //当前页码
            pageSize: 8, //每页显示的条数
            goValue:'',
            totalPage:'',//总页数
        }

        this.handleAction = this.handleAction.bind(this)
    }
    componentWillMount() {
        let dogId = common.getUrlPar('dogId')
        this.getDogInfo(dogId)
        this.getDeliverFee()
        this.getMyDogList(1, this.state.pageSize)
        common.setPageTitle(HD_lANG['petInfo5'][globalLang])
    }
    //使用 原生提供方法跳转页面
    pushMethod(url, event){
        common.getClientPushMethod(url, event)
    }
    // 获取狗狗详情
    getDogInfo(dogId) {
        var _this = this;
        $http('/dog/dogInfo', {
            dogId : dogId
        }).then(function(data) {
            if(data.code == '0000'){
                _this.setState({
                    dog: data.returnObj.dog,
                    userInfo: data.returnObj.userInfo,
                    imgHost: data.returnObj.imgHost,
                    total: data.returnObj.total,
                })
            }
        })
    }
    // 获取我的所有狗狗(可交配的)
    getMyDogList(toPage, pageSize) {
        var _this = this;
        $http('/dog/canSiringDogs', {
            walletAddress : defaultAccount,
            dogId: common.getUrlPar('dogId'),
            toPage: toPage,
            pageSize: pageSize
        }).then(function(data) {
            if(data.code == '0000'){
                let totalPage = Math.ceil( data.returnObj.total / _this.state.pageSize);
                var dogs = data.returnObj.allList || [];
                _this.setState({
                    data: dogs,
                    // data: _this.state.data.concat(dogs),
                    index: _this.state.index + 1,
                    action: STATS.reset,
                    total: data.returnObj.total,
                    totalPage: totalPage,
                })
            }
        })
    }
    // 获取接生手续费
    getDeliverFee() {
        var _this = this;
        $http('/config').then(function(data) {
            if(data.code == '0000'){
                _this.setState({
                    deliverFee: data.returnObj.autoBirthFee,
                    gen0BreedProfit : data.returnObj.gen0BreedProfit
                })
            }
        })
    }
    // 获取当前价格
    getCurrentPrice(dogId, fn) {
        siringMetacoin.methods.getCurrentPrice(dogId).call(function(error, result){
            if (!error){
                var price = result.toString()
                fn(price);
            }
        });
    }
    // 开始交配
    mating() {
        var _this = this;
        if(walletIsUnLock == 0){
            winAlert.show(HD_lANG['alert21'][globalLang], function() {
                _this.pushMethod('/mobile/wallet/myWallet.html')
            })
            return false;
        }
        if(!this.state.mate.dogId) {
            winAlert.show(HD_lANG['alert23'][globalLang])
            return;
        }
        // 交配。。。
        let dogId = common.getUrlPar('dogId');
        console.log(common.getUrlPar('dogId'))
        if(!this.state.deliverFee){
            winAlert.show(HD_lANG['alert24'][globalLang])
            return false;
        }
        if(this.state.userInfo.address.toLowerCase() == defaultAccount.toLowerCase()){      // 我的两只交配
            let value = "";
            if( this.state.mate.generation != 0 ){      // 非0代狗狗增加额外生育费用
                value = parseInt(this.state.deliverFee) + parseInt(this.state.gen0BreedProfit);
            }else{
                value =  parseInt(this.state.deliverFee);
            }
         
            common.loading();
            dogMetacoin.methods.breedWithAuto(_this.state.mate.dogId, dogId).estimateGas({from: defaultAccount, value: value}).then(function(gasLimit) {
                common.removeLoading();
                tPopBox.show({
                    title: HD_lANG['petInfo6-2'][globalLang],
                    address: address,
                    price: web3.utils.fromWei(value.toString()),
                    gasLimit: gasLimit + 500,
                    btnText: HD_lANG['mating15'][globalLang]
                }, function(toAddress,gasPrice) {
                    common.loading();
                    dogMetacoin.methods.breedWithAuto(_this.state.mate.dogId, dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, value: value, gas: gasLimit + 500}, function(error, result) {
                        common.removeLoading();
                        if(!error){
                            console.log(result);
                            try{
                                common.setHashVal(result)
                                common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                            }catch (e){
                                localStorage.setItem("hash",result);
                            }
                            winAlert.show(HD_lANG['alert1'][globalLang], function() {
                                common.popRootPage()
                            })
                        }else{
                            winAlert.show(HD_lANG['alert5'][globalLang])
                        }
                    })
                });
            }).catch(function(error) {
                common.removeLoading();
                winAlert.show(HD_lANG['alert5'][globalLang], function() {
                    window.location.reload()
                })
            })
        }else{          // 和别人的狗交配
            common.loading();
            this.getCurrentPrice(dogId, function(currentPrice) {
                common.removeLoading();
                currentPrice = Number(web3.utils.fromWei(currentPrice)) + 0.0001;
                let _value = web3.utils.toWei(currentPrice.toString());
                if( _this.state.mate.generation != 0 ){
                    _value = parseInt(_value) + parseInt(_this.state.deliverFee)+parseInt(_this.state.gen0BreedProfit);
                }else{
                    _value = parseInt(_value) + parseInt(_this.state.deliverFee);
                }
                if(Number(web3.utils.fromWei(_value.toString())) > defaultAccountBalance) {
                    winAlert.show(HD_lANG['alert2'][globalLang])
                    return;
                }
            
                common.loading();
                dogMetacoin.methods.bidOnSiringAuction(dogId, _this.state.mate.dogId).estimateGas({from: defaultAccount, value: _value}).then(function(gasLimit) {
                    common.removeLoading();
                    tPopBox.show({
                        title: HD_lANG['petInfo6-2'][globalLang],
                        address: address,
                        price: web3.utils.fromWei(_value.toString()),
                        transText: HD_lANG['mating10'][globalLang],
                        gasLimit: gasLimit + 500,
                        btnText: HD_lANG['mating6'][globalLang]
                    }, function(toAddress,gasPrice) {
                        common.loading();
                        dogMetacoin.methods.bidOnSiringAuction(dogId, _this.state.mate.dogId).send({nonce:(storageNonce > nonce ? storageNonce : nonce ),gasPrice:gasPrice,from: defaultAccount, value: _value, gas: gasLimit + 500}, function(error, result) {
                            common.removeLoading();
                            if(!error){
                                console.log(result);
                                try{
                                    common.setHashVal(result)
                                    common.setNonceVal((storageNonce > nonce ? storageNonce : nonce ))
                                }catch (e){
                                    localStorage.setItem("hash",result);
                                }
                                winAlert.show(HD_lANG['alert1'][globalLang], function() {
                                    common.popRootPage()
                                })
                            }else{
                                winAlert.show(HD_lANG['alert5'][globalLang])
                            }
                        })
                    });
                }).catch(function(error) {
                    common.removeLoading();
                    winAlert.show(HD_lANG['alert5'][globalLang], function() {
                        window.location.reload()
                    })
                })
            })
        }
    }
    // 选择配偶
    selectMate(mate, event) {
        winAlert.show(HD_lANG['alert25'][globalLang])
        this.setState({
            mate: mate
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
            _this.getMyDogList(1, _this.state.pageSize);
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
            console.log(_this.state.index, _this.state.total, _this.state.pageSize)
            if(_this.state.index > totalPage){
                _this.setState({
                    action: STATS.reset,
                    hasMore: false
                });
            } else{
                _this.getMyDogList(_this.state.index, _this.state.pageSize)

            }
        }, 1500)

        this.setState({
            action: STATS.loading
        })
    }

    //点击翻页
    pageClick(pageNum){
        let _this = this;
        if(pageNum != _this.state.current){
            _this.setState({
                current: pageNum
            })
        }
        _this.getMyDogList(pageNum, this.state.pageSize);
    }
    //上一步
    goPrevClick(){
        var _this = this;
        let cur = this.state.current;
        if(cur > 1){
            _this.pageClick( cur - 1);
        }
    }
    //下一步
    goNext(){
        var _this = this;
        let cur = _this.state.current;
        if(cur < _this.state.totalPage){
            _this.pageClick(cur + 1);
        }
    }
    //跳转到指定页
    goSwitchChange(e){
        var _this= this;
        var value = e.target.value;
        _this.setState({goValue : value})
        if(!/^[1-9]\d*$/.test(value)){
            winAlert.show(HD_lANG['list16'][globalLang]);
        }else if(parseInt(value) > parseInt(_this.state.totalPage)){
            winAlert.show(HD_lANG['list17'][globalLang]);
        }else{
            _this.pageClick(value);
        }
    }

    render(){
        var _this = this;
        // 防止异步图片404
        if(!this.state.imgHost) {
            return null
        }
        let dog = this.state.dog;
        let mate = this.state.mate;
        return(
            <div className="mating-wrap">
                <div className="mating-lay">
                    <div className="s-wrap">
                        <div className="mat-tit">{HD_lANG['mating1'][globalLang]}</div>

                        <div className="mat-parents clearfix">
                            <div className="cell">
                                <div className="top-hint"><span className="stg">{HD_lANG['mating12'][globalLang]}</span> {HD_lANG['mating13'][globalLang]}</div>
                                {mate.dogId ? (
                                    <div>
                                        <div className={"pic vertical item-bd-" + common.getBgColorClass(mate.genesStr, 7)}>
                                            <img src={this.state.imgHost + mate.genesStr + '.png'} alt="pet"/>
                                        </div>
                                        <div className="info">
                                            <div className="info-name">{mate.dogName}</div>
                                            <div className="info-sub">
                                                <i>ID{mate.dogId}</i>
                                                <i className={'gen' + mate.generation}>{mate.generation}代</i>
                                                <i>{common.switchCoolDownIndex(mate.coolDownIndex)}</i>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="pic pic-empty vertical">
                                        {HD_lANG['mating4'][globalLang]}
                                    </div>
                                )}
                            </div>
                                
                            <div className="cell">
                                <div className="top-hint"><span className="stg">{dog.dogName}</span> {HD_lANG['mating14'][globalLang]}</div>
                                <div className={"pic pic-left vertical item-bd-" + common.getBgColorClass(dog.genesStr, 7)}>
                                    <img src={this.state.imgHost + dog.genesStr + '.png'} alt="pet"/>
                                </div>
                                <div className="info">
                                    <div className="info-name">{dog.dogName}</div>
                                    <div className="info-sub">
                                        <i>ID{dog.dogId}</i>
                                        <i className={'gen' + dog.generation}>{dog.generation}{HD_lANG['list7'][globalLang]}</i>
                                        <i>{common.switchCoolDownIndex(dog.coolDownIndex)}</i>
                                    </div>
                                </div>
                            </div>

                            <div className="heart"></div>
                        </div>

                        <div className="mat-hint">{HD_lANG['mating16'][globalLang]}</div>
                        
                        <div className="btn-wrap">
                            <div className="btn-def btn-sty2" onClick={this.mating.bind(this)}>{HD_lANG['mating6'][globalLang]}</div>
                        </div>

                        <div className="mat-hint">{HD_lANG['mating17'][globalLang]}</div>
                        
                        {/* {this.state.total != 0 ? (
                            <ReactPullLoad
                            downEnough={150}
                            action={this.state.action}
                            handleAction={this.handleAction}
                            hasMore={this.state.hasMore}
                            style={{paddingTop: 0}}
                            distanceBottom={200}>
                                <ul className="list-view clearfix">
                                    {this.state.data.map((item, index) => (
                                        <li className="item-view" key={item.dogId} onClick={this.selectMate.bind(this, item)}>
                                            <a href="javascript:;" className={'pic item-bd-' + common.getBgColorClass(item.genesStr, 7)}>
                                                <div className="top-tag icon-tag">{HD_lANG['petCenter15'][globalLang]}</div> 
                                                <img src={this.state.imgHost + item.genesStr +".png"} alt="pet"/>
                                                <div className="bottom-tag">
                                                    {common.switchCoolDownIndex(item.coolDownIndex)}
                                                </div>
                                            </a>
                                            <div className="info">
                                                <em className="ellipsis">{item.dogName}</em>
                                                <span>ID{item.dogId}</span>
                                                <span className={'gen' + item.generation}>{item.generation}{HD_lANG['list7'][globalLang]}</span><span>{common.switchCoolDownIndex(item.coolDownIndex)}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </ReactPullLoad>
                        ) : (
                            <div className="empty">{HD_lANG['mating8'][globalLang]}</div>
                        )} */}
                        {this.state.total != 0 ? (
                            <ul className="list-view clearfix">
                                {this.state.data.map((item, index) => (
                                    <li className="item-view" key={item.dogId} onClick={this.selectMate.bind(this, item)}>
                                        <a href="javascript:;" className={'pic item-bd-' + common.getBgColorClass(item.genesStr, 7)}>
                                            <div className="top-tag icon-tag">{HD_lANG['petCenter15'][globalLang]}</div> 
                                            <img src={this.state.imgHost + item.genesStr +".png"} alt="pet"/>
                                            <div className="bottom-tag">
                                                {common.switchCoolDownIndex(item.coolDownIndex)}
                                            </div>
                                        </a>
                                        <div className="info">
                                            <em className="ellipsis">{item.dogName}</em>
                                            <span>ID{item.dogId}</span>
                                            <span className={'gen' + item.generation}>{item.generation}{HD_lANG['list7'][globalLang]}</span><span>{common.switchCoolDownIndex(item.coolDownIndex)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="empty">{HD_lANG['mating8'][globalLang]}</div>
                        )}
                        
                        {this.state.total >= this.state.pageSize && (
                            <PageComponent 
                                total={this.state.total}
                                current={this.state.current}
                                totalPage={this.state.totalPage}
                                goValue={this.state.goValue}
                                pageClick={this.pageClick.bind(this)}
                                goPrev={this.goPrevClick.bind(this)}
                                goNext={this.goNext.bind(this)}
                                switchChange={this.goSwitchChange.bind(this)}
                            />
                        )}
                    </div>
                </div>

            </div>
        )
    }
}

export default Detail;