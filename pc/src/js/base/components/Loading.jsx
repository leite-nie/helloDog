import React from 'react';
import img2 from '../../../images/img0327/loading.gif';


class Loading extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return(
            <div className="ajax-load" id="ajaxLoad">
                <img src={img2} alt="" />
            </div>
        )
    }
}
export default Loading;



