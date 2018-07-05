import React from 'react';

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rankingType: 0,      // 0-所有 1-拥有狗数量 2-拥有0代狗 3-累计中奖排 4-累计0代分红
            title: HD_lANG['rank1'][globalLang],
            gen0DogNumberRank: [],      // 拥有0代狗排行
            gen0BonusRanking: [],      // 0代狗累计分红排行
            lotteryRanking: [],      // 累计中奖排行
            dogNumberRanking: [],      // 拥有狗排行
        }
    }
    componentDidMount(){
        this.getRank(this.state.rankingType)
    }
    getRank(type) {
        var _this = this;
        $.ajax({
            type: 'get',
            url : api_host + "/ranking/rankingAll",
            data :{
                rankingType: type
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000') {
                    _this.setState({
                        gen0DogNumberRank: data.returnObj.gen0DogNumberRanking || [],
                        gen0BonusRanking: data.returnObj.gen0BonusRanking || [],
                        lotteryRanking: data.returnObj.lotteryRanking || [],
                        dogNumberRanking: data.returnObj.dogNumberRanking || [],
                    })
                }
            }
        })
    }
    switchClass(num) {
        if(num == 0) {
            return 'first'
        }
        if(num == 1) {
            return 'second'
        }
        if(num == 2) {
            return 'thirdly'
        }
    }
    render(){
        let gen0DogNumberRank = this.state.gen0DogNumberRank
        let gen0BonusRanking = this.state.gen0BonusRanking
        let lotteryRanking = this.state.lotteryRanking
        let dogNumberRanking = this.state.dogNumberRanking

        return(
            <div className="rank-wrap clearfix">
                <div className="rank-list">
                    <div className="title">{HD_lANG['rank1'][globalLang]}</div>
                    {dogNumberRanking.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><span className="t2">{HD_lANG['rank6'][globalLang]}</span></th>
                                    <th><span className="t3">{HD_lANG['rank7'][globalLang]}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dogNumberRanking.map((item, index) => (
                                    <tr className={this.switchClass(index)} key={item.accountId}>
                                        <td>{index >= 3 && index + 1}</td>
                                        <td>{item.nickName}</td>
                                        <td>{item.dogNum}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                </div>

                <div className="rank-list">
                    <div className="title">{HD_lANG['rank3'][globalLang]}</div>
                    {gen0DogNumberRank.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><span className="t2">{HD_lANG['rank6'][globalLang]}</span></th>
                                    <th><span className="t3">{HD_lANG['rank7'][globalLang]}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {gen0DogNumberRank.map((item, index) => (
                                    <tr className={this.switchClass(index)} key={item.accountId}>
                                        <td>{index >= 3 && index + 1}</td>
                                        <td>{item.nickName}</td>
                                        <td>{item.dogNum}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                </div>

                <div className="rank-list">
                    <div className="title">{HD_lANG['rank2'][globalLang]}</div>
                    {lotteryRanking.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><span className="t2">{HD_lANG['rank6'][globalLang]}</span></th>
                                    <th><span className="t3">ETH</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {lotteryRanking.map((item, index) => (
                                    <tr className={this.switchClass(index)} key={item.accountId}>
                                        <td>{index >= 3 && index + 1}</td>
                                        <td>{item.nickName}</td>
                                        <td>{parseInt(item.amount*10000)/10000}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                </div>

                <div className="rank-list">
                    <div className="title">{HD_lANG['rank4'][globalLang]}</div>
                    {gen0BonusRanking.length ? (
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><span className="t2">{HD_lANG['rank6'][globalLang]}</span></th>
                                    <th><span className="t3">ETH</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {gen0BonusRanking.map((item, index) => (
                                    <tr className={this.switchClass(index)} key={item.accountId}>
                                        <td>{index >= 3 && index + 1}</td>
                                        <td>{item.nickName}</td>
                                        <td>{parseInt(item.amount*10000)/10000}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default Index;