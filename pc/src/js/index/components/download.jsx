import React from 'react';


class Tips extends React.Component {
    constructor(props){
        super(props);


    }

    componentWillMount(){
        //document.title = HD_lANG['tips-tit'][globalLang];
        document.title = '下载';
    }
    render(){
        return(
            <div className="download-box">
                下载
            </div>
        )
    }
}

export default Tips;
