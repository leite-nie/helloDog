import React from 'react';
import $ from 'jquery';
class notice extends React.Component {
    constructor(props){
        super(props);
        this.showContent = this.showContent.bind(this);

        this.state = {
            data: '',
            total: 0,
        }
    }
    showContent(event){
        var _obj = event.currentTarget;
        var $obj2 = $(_obj);
        var $obj = $(_obj).parent().siblings(".down");

        if($obj2.hasClass("select")){
            $obj.stop(true,true).slideUp();
            $obj2.removeClass("select")
        }else{
            $obj.stop(true,true).slideDown();
            $obj2.addClass("select")
        }

    }
    componentWillMount(){
        document.title = HD_lANG['notice-title'][globalLang]
    }
    componentDidMount() {
        this.getNoticeList()
    }
    getNoticeList() {
        var _this = this;
        $.ajax({
            url : api_host + "/notice/list",
            data :{
                toPage: 1,
                pageSize: 100,
            },
            dataType : "jsonp",
            jsonp:'callback',
            success:function (data) {
                if(data.code == '0000') {
                    _this.setState({
                        data: data.returnObj.allList,
                        total: data.returnObj.total
                    })
                }
            }
        })
    }
    render(){
        return(
            <div>{/*
                <div className="notice-banner"></div>*/}
                <div className="notice-box">
                    <h2>{HD_lANG['notice-title'][globalLang]}</h2>
                    {this.state.total ? (
                        <ul>
                            {this.state.data.map((item) => (
                                <li key={item.createTime}>
                                    <div className="tit">
                                        <p>{item.title}</p>
                                        <span onClick={this.showContent}></span>
                                    </div>
                                    <div className="down">
                                        <p>{item.content}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="empty">{HD_lANG['alert0'][globalLang]}</div>
                    )}
                    {/* <ul>
                        <li>
                            <div className="tit">
                                <p>{HD_lANG['notice0'][globalLang]}</p>
                                <span onClick={this.showContent}></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['notice1'][globalLang]}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="tit">
                                <p>{HD_lANG['notice2'][globalLang]}</p>
                                <span onClick={this.showContent}></span>
                            </div>
                            <div className="down">
                                <p>{HD_lANG['notice3'][globalLang]}</p>
                            </div>
                        </li>

                    </ul> */}
                </div>
            </div>
        )
    }
}

export default notice;