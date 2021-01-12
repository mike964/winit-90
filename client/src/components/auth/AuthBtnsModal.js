import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import AuthForm from './AuthForm';
import { useSelector } from 'react-redux';
import { toggleAuthModal } from '../../redux/actions/global.actions';

// ** Navbar Auth Btns modal **/
const AuthBtnsModal = () => {
  // Get show Modal from Redux Store
  const { showAuthModal } = useSelector( state => state.global )

  const [ show, setShow ] = useState( showAuthModal ? showAuthModal : false )

  // Show first side of flip card
  const [ showSide1, setShowSide1 ] = useState( true )
  // if showSide1 = false means showSide2  

  const handleShow = () => {
    // setShow( !show )
    // toggleAuthModal()   // change redux store  // no need here 
    // toggleAuthModal( !show )   // change redux store  
    toggleAuthModal( !showAuthModal )   // change redux store 
  }
  const handleSignupClick = () => {
    setShowSide1( true )
    toggleAuthModal( true )   // change redux store 
  }
  const handleLoginClick = () => {
    setShowSide1( false )
    toggleAuthModal( true )   // change redux store 
  }

  useEffect( () => {
    setShow( showAuthModal )
  }, [ showAuthModal ] )

  //=============================================================================================
  //=============================================================================================
  return <>
    <button className='auth signup' onClick={ handleSignupClick }>
      <i className="fas fa-user-plus" /> تسجیل
      </button>
    {' ' }
    <button className='auth signup' onClick={ handleLoginClick }>
      <i className="fas fa-sign-in-alt" />{ ' ' } دخول
      </button>
    {' ' }

    <Modal show={ show } size='sm' onHide={ handleShow }>
      <Modal.Header>
        <div className="p-2 em-12 bold">
          { showSide1 ? <>
            <i className="fas fa-user-plus" />  { ' ' }
            <span className="x">انشاء حساب جدید</span>
          </> : <>
              <i className="fas fa-sign-in-alt" />{ ' ' }
              <span className="x">تسجیل الدخول</span>
            </> }
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="p-3">

          <div className="clickable blue boldd center "
            onClick={ () => setShowSide1( !showSide1 ) }>
            { showSide1 ? <>
              {/* <span className=""> Already have an account? </span>  */ }
              <span className="x"> قد سجلت سابقا؟ </span> { ' ' }
              <span className="text-success ulineonhover">ادخل </span>
            </>
              : <>
                <span className="x"> لیس لدیک حساب؟ </span> { ' ' }
                <span className="text-success ulineonhover" >انشاء حساب جدید</span>
              </> }
          </div>

          { showSide1 &&
            <AuthForm signup={ true } handleModalShow={ handleShow } /> }
          { !showSide1 &&
            <AuthForm signup={ false } handleModalShow={ handleShow } /> }

        </div>
      </Modal.Body>
    </Modal>
  </>
}

export default AuthBtnsModal
