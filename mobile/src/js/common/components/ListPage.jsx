import React, { Component } from 'react';
function  createMarkup(str,data) {
    if(!data.length) {
        return {__html: str};
    }else if(data.length == 1){
        str = str.replace('placeholder1',data[0]);
        return {__html: str};
    }else if(data.length == 2){
        str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]);
        return {__html: str};
    }else{
        str = str.replace('placeholder1',data[0]).replace('placeholder2',data[1]).replace('placeholder3',data[2]);
        return {__html: str};
    }
}
class PageComponent extends  Component{
    render(){
        let _this = this;
        //当前页码
        let cur = this.props.current;
        //显示分页按钮
        let pageNum = [];
        let begin;
        let len;
        if(_this.props.totalPage > 5){
            len = 5;
            if(cur >= (_this.props.totalPage-2)){
                begin = _this.props.totalPage - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            len = _this.props.totalPage;
            begin = 1;
        }
//根据返回的总记录数计算当前页显示的数据
        for(let i = 0; i < len; i ++){
            let cur = this.props.current;
            let showI = begin + i;
            if(cur == showI){
                pageNum.push({num : showI, cur : true});
            }else{
                pageNum.push({num : showI, cur : false});
            }
        }
        return(
            <div >
                <div className="paginationDiv clearfix" >
                    <div className="rightDiv clearfix" >
                        <div style={{float:"left"}}>{_this.props.current + '/' + _this.props.totalPage}</div>
                        {/* <div style={{float:"left"}} dangerouslySetInnerHTML={createMarkup(HD_lANG['page0'][globalLang],[_this.props.total,_this.props.totalPage])}></div> */}
                        <div style={{float:"left"}}>
                            {HD_lANG['page1'][globalLang]}<input type="text" value={_this.props.goValue} onChange={this.props.switchChange.bind(this)} />{HD_lANG['page2'][globalLang]}
                        </div>
                    </div>

                    <div className="leftDiv">
                        <a className={this.props.current == 1? 'prev disable' : 'prev'} onClick={this.props.goPrev.bind(this)}></a>
                        <span>
                              {
                                  pageNum.map(function(curPageNum){
                                      return(<a key={curPageNum.num} onClick = {_this.props.pageClick.bind(_this,curPageNum.num)} className={curPageNum.cur ? 'num            current'    :  'num'}>{curPageNum.num}</a>)      })
                              }
                        </span>

                        <a className={this.props.current == this.props.total? 'next disable' : 'next'} onClick={this.props.goNext.bind(this)}></a>
                    </div>

                </div>
            </div>
        )
    }
}
export default PageComponent;