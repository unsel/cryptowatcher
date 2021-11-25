import React from 'react';

import './modal.scss';
import Backdrop from '../Backdrop/backdrop';

const Modal = props => {

  const modalClass = [props.modalType === 'Modal1'? 'Modal' : 'Modal2']

  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalClosed} modalType={props.modalType}/>
      <div
        className={modalClass.join(' ')}
        style={{
          transform: props.show ? 'translateY(200px)' : 'translateY(-50vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
