import React from 'react';

import './backdrop.scss';

const Backdrop = (props) => {

    const modalClass = [props.modalType === 'Modal1'? 'Backdrop' : 'Backdrop2']

    return (
     props.show ? <div className={modalClass.join(' ')} onClick={props.clicked}></div> : null
    );


}

export default Backdrop;