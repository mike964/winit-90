import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { Tabs, Tab, Button } from 'react-bootstrap'
import Cookies from 'js-cookie'

// Rules & Instructions Pg
const RulesPg = () => {

  const history = useHistory()

  const [ checkout, setCheckout ] = useState( false )

  const handleStartNow = () => {
    // Redirect to matches PG
    history.push( '/matches' )
  }


  //==============================================================================
  return <div className="page pt-5">

    <div className="container">
      {/* <h4> التعلیمات </h4> */ }

      <div dir='rtl' className="text-r c-eee bg-shadow p-3 curved-6 box">
        <Tabs defaultActiveKey="weeklycontest" id="uncontrolled-tab-example">

          <Tab eventKey="weeklycontest" title="المسابقة الاسبوعیة" className='p-1' tabClassName='goldd em-12 bold'>
            <div className="p-3">
              <ul>
                <li>کل ما علیک هو اختیار الفریق الذی تتوقع سیفوز في کل مباراة بالضغط علی شعار الفریق، ثم تعیین اختلاف الاهداف باستخدام العداد</li>
                <li>بعد انتهاء مباریات الاسبوع، سیتم تصنیف المشترکین حسب النقاط من الاول الی الآخر</li>
                <li>لکل توقع صحیح یحصل المشترک 10 نقاط علی الاقل</li>
                <li> اذا کان توقع الفریق الفائز و ایضا اختلاف الاهداف صح، یحصل المشرک علی <span className="gold bold">50 نقطه</span></li>
                <li>سیتم اضافة جوائز الفائزین الی رصیدهم و کل فائز سیکون قادر علی سحب الجوائز من بوابة سحب الاموال في لوحة التحکم الخاصه به</li>
              </ul>

              {/* <div> 
              <ul>
                <h5 className="red"> ملاحظات</h5>
                <li>لایمکن تسجیل توقع لمباراة منتهة</li>
              </ul>
            </div> */}

            </div>
            <div className="center em-12 gold">
              <span className="ulineonhover" onClick={ handleStartNow }>
                { ' ' }<i className="fas fa-hand-point-left" />{ ' ' } ابدا الآن
              </span>
            </div>
          </Tab>

          <Tab eventKey="vipcontest" title="المسابقة الذهبیة" className='p-1' tabClassName='goldd em-12 bold'>
            <ul>
              <li className="x">
                یمکنک تسجیل توقع لکل مباراة ب 10$ علی الاقل
            </li>
              <li>في حال سجل توقع صحیح ، ستربح علی جائزة حسب الاحتمالات لتلک المباراة</li>
            </ul>
          </Tab>

          {/* <Tab eventKey="" title="دفع و استلام الاموال">
          <span className="x">Suck my dick</span>
        </Tab> */}
        </Tabs>




      </div>

    </div>
  </div>
}

export default RulesPg
