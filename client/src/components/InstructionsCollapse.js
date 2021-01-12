import React from 'react'

const InstructionsCollapse = () => {
  return <div className="p-1 text-r curved" dir="rtl" style={ { background: '#00000070' } }>
    <div className="p-2 clickable">
      <a className="gold bold"
        data-toggle="collapse"
        href="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      > <i className="fas fa-caret-down  gold " /> التعلیمات : </a> { ' ' }
      <span className="white bold mx-1"
        data-toggle="collapse"
        href="#collapseExample"
        aria-expanded="false"
        aria-controls="collapseExample"
      >انقر علی شعار الفریق الذي تتقوع سیفوز، ثم حدد فارق الاهداف باستخدام العداد</span>

    </div>

    <div className="collapse p-3 bg-w c-333 bold" id="collapseExample">
      <ul>
        <li>
          کل ما علیک فعله هو ان تنقر علی شعار الفریق الذي تتوقع سیفوز، ثم تحدید فارق الاهداف باستخدام العداد
        </li>
        <li>بعد تسجیل التوقع لجمیع المباریات الظاهرة، انقر علی زر تسجیل التوقعات في اسفل الشاشة</li>
      </ul>
    </div>
  </div>
}

export default InstructionsCollapse
