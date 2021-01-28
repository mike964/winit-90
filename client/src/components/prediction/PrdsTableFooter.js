import React from 'react'
import { useSelector } from 'react-redux'

const PrdsTableFooter = ( { karname } ) => {
  // const karname = useSelector( state => state.karname.current )   // not work - undefined  

  const totalPrds = karname ? karname.nPredictions : 0
  const correctPrdsCount = karname ? karname.nCorrectPredictions : 0
  const correctPrdsPercentage = Math.floor( ( correctPrdsCount / totalPrds ) * 100 )
  const totalPoints = karname ? karname.points : 0

  console.log( '--- table footer ---' )
  console.log( karname )


  return <div className="prds-table-footer">
    <div className="w-50 ib textl">
      <span>Total Predictions: { totalPrds }</span>
      <br />
      <span>Correct Predictions: { correctPrdsCount }</span>
      <br />
      <span>Total Points: { totalPoints }</span>
    </div>

    <div className="w-50 ib textr">
      <div className="x">
        <span>{ totalPrds } : مجموع التوقعات</span>
      </div>
      <div className="x">
        <span> { correctPrdsCount } : التوقعات الصحیحة</span>
      </div>
      <div className="x">
        <span>{ totalPoints } : مجموع النقاط</span>
      </div>
      <div className="x">
        { correctPrdsPercentage
          ? <span>{ correctPrdsPercentage } % : نسبة الصحیحة </span>
          : <span>  % : نسبة الصحیحة </span> }
      </div>
    </div>
  </div>
}

export default PrdsTableFooter



// year(pin):"2020"
// _id(pin):"5f22d12a8dddf85fc057e7c4"
// __v(pin):0
// nPredictions(pin):4
// nCorrectPredictions(pin):2
// points(pin):406
// createdAt(pin):"2020-09-07T08:47:30.537Z"