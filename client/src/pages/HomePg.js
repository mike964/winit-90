import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import AuthForm from '../components/auth/AuthForm'
import WinnersList from '../components/WinnersList'
import messi_img from '../img/messi-free-kick.jpg'
import LionSvg from '../svg/LionSvg'

const Home = () => {


  const history = useHistory()
  // شاهد المباریات
  const handelRedirect = () => history.push( '/matches' )



  const [ cardTurned, setcardTurned ] = useState( false )

  const handleTurn = () => {
    // setshowformSide2( !showformSide2 )
    setcardTurned( !cardTurned )
  }



  return <div className="home-page" >

    <div className="containerr">
      {/* bg image */ }
      <img src={ messi_img } alt="bg-mg" className="bg-img" />

      {/* <WinnersList /> */ }


      <div className="boxx p-4">
        <div className="textl center">

          <span className="winit96"> Winit96.com </span>
          {/* <LionSvg color="#ffffff" /> */ }

        </div>
        <div className="mb-3">
          <span className="em-2">
            البوابة الاولی لمحترفي کرة القدم
          </span>
          <span className="eee">
            Why bitch?
          </span>
        </div>

        <div className="x  mb-2">
          <span className="em-14">سجل توقعات لاقوی المباریات</span>
        </div>

        <div className="centerr mb-5 mr-5">
          <span className="em-14">و اربح جوائز نقدیة  کل اسبوع</span>
        </div>





        <div className="row">

          {/* NOT YET */ }
          {/* <div className="col center p-2 winners-col">
            <span className="x">فائزون الاسبوع الماضي</span> <br />
            <span className="x">
              المزکز / الدسوقي / النقاط / الجایزة
            </span> 
          </div> */}




          <div className="col p-2 center">

            <div className={ cardTurned ? 'flip-card turned' : 'flip-card' } >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <AuthForm signup={ false } textColor='gold' />
                </div>
                <div className="flip-card-back">
                  <AuthForm signup={ true } textColor='gold' />
                </div>
              </div>
            </div>


            <div className="center mb-2" onClick={ handleTurn }>
              { cardTurned
                ? <div className="clickable ib">
                  <span className=""> Already have an account? </span> { ' ' }
                  <span className="gold ulineonhover">Log in</span>
                </div>
                : <div className="clickable ib">
                  {/* <span className="x">  Don't have an account? </span> */ }
                  <span className="x"> لیس لدیک حساب؟ </span>
                  <span className="gold ulineonhover" >سجل الآن</span>
                </div> }
            </div>

            <div className="bg-shadow curved pt-1 pb-1  pr-3 pl-3 ib">
              <span className="whitee orange ulineonhover clickable" onClick={ handelRedirect }>شاهد المباریات</span>
            </div>
          </div>

        </div>


      </div>





    </div>

  </div>
}

export default Home
