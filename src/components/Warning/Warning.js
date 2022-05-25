import React, { useState, useEffect, useContext} from 'react'
import Modal from '../Modal/Modal'
import { AppContext } from "../../App"
import './Warning.css'

const Warning = () => {
  const [activeModal,setActiveModal] = useState(true);
  const {modalShow, setModalShow} = useContext(AppContext)

  useEffect(()=>{
      setTimeout(()=>{
        setModalShow(false)
      },3000)
  },[modalShow])

  return (
    <Modal activeModal={activeModal} setActiveModal={setActiveModal} wrapperClass='warning-wrapper' windowClass='warning-window' buttonShow={false}>
        <div className='warning'>
            <p>WORD NOT FOUND</p>
        </div>
    </Modal>
  )
}

export default Warning