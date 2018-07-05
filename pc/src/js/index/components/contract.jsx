import React from 'react';

class Contract extends React.Component {
    constructor(props){
        super(props);

    }
    componentWillMount(){
        document.title = HD_lANG['contract-title'][globalLang];
    }
    render(){
        return(
            <div className="contract">
                <h2>{HD_lANG['contract-title'][globalLang]}</h2>
                <p>{HD_lANG['contract-0'][globalLang]}</p>
                <p>{HD_lANG['contract-1'][globalLang]}</p>
                <p>{HD_lANG['contract-2'][globalLang]}</p>
                <p>{HD_lANG['contract-3'][globalLang]}</p>
                <p>{HD_lANG['contract-4'][globalLang]}</p>
                <p>{HD_lANG['contract-5'][globalLang]}</p>
                <p>{HD_lANG['contract-6'][globalLang]}</p>
                <p>{HD_lANG['contract-7'][globalLang]}</p>
                <p>{HD_lANG['contract-8'][globalLang]}</p>
                <p>{HD_lANG['contract-9'][globalLang]}</p>
                <p>{HD_lANG['contract-10'][globalLang]}</p>
                <p>{HD_lANG['contract-11'][globalLang]}</p>
                <p>{HD_lANG['contract-12'][globalLang]}</p>
                <p>{HD_lANG['contract-13'][globalLang]}</p>
            </div>
        )
    }
}

export default Contract;