import React, { Component } from 'react'
import Portal from '../Portal/Portal';
import './Modal.css'


export default class Modal extends Component {
  componentDidMount(){
    // allow closing modal with Escape key for accessibility
    this._boundKeydown = (e) => {
      if (e.key === 'Escape'){
        const { setActiveModal } = this.props;
        if (setActiveModal) setActiveModal(false);
      }
    }
    document.addEventListener('keydown', this._boundKeydown);
  }

  componentWillUnmount(){
    if (this._boundKeydown) document.removeEventListener('keydown', this._boundKeydown);
  }
  render() {
    const { children, activeModal, setActiveModal, wrapperClass, windowClass, buttonShow} = this.props;

    const toggleModal = () => {
      setActiveModal(!activeModal);
    }

    return (
      <Portal>
          {activeModal && (
              <div className={wrapperClass} onClick={() => toggleModal()}>
                  <div className={windowClass} onClick={(e) => e.stopPropagation()}>
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


