import React from 'react';
import common from '../../common.js';

class Index extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: '',
            total: 0,
        }
    }
    componentWillMount() {
        common.setPageTitle(HD_lANG['header7'][globalLang])
    }
    componentDidMount() {
        this.getNoticeList()
    }
    getNoticeList() {
        var _this = this;
        $http('/notice/list', {
            toPage: 1,
            pageSize: 100,
        }).then(function(data) {
            if(data.code == '0000') {
                _this.setState({
                    data: data.returnObj.allList,
                    total: data.returnObj.total
                })
            }
        })
    }
    render(){
        return(
            <div className="notice-wrap">
                <div className="notice-ban"></div>
                <div className="msg-list">
                    {this.state.total ? (
                        <ul>
                            {this.state.data.map((item) => (
                                <li key={item.createTime}>
                                    <div className="tit">
                                        {item.title}
                                    </div>
                                    <div className="art">
                                        {item.content}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                </div>
            </div>
        )
    }
}



export default Index;