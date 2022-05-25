import React, { Component } from 'react'
import Portal from '../Portal/Portal';
import './Modal.css'


export default class Modal extends Component {
  render() {
    const { children, activeModal, setActiveModal, wrapperClass, windowClass, buttonShow} = this.props;

    const toggleModal = () => {
      setActiveModal(!activeModal);
    }

    return (
      <Portal>
          {activeModal && (
              <div className={wrapperClass}>
                  <div className={windowClass}>
                    {
                      buttonShow &&
                      <button className="closeBtn" onClick={() => toggleModal()}>x</button> 
                    }
                    
                    <div>{children}</div>
                  </div>
              </div>
          )}
      </Portal>
    )
  }
}


