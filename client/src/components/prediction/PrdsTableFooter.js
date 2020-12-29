import React from 'react'
import { useSelector } from 'react-redux'

const PrdsTableFooter = ( { karname } ) => {
  // const karname = useSelector( state => state.karname.current )   // not work - undefined  

  const predictionsCount = karname ? karname.nPredictions : 0
  const correctPredictionsCount = karname ? karname.nCorrectPredictions : 0
  const totalPoints = karname ? karname.points : 0

  console.log( '--- table footer ---' )
  console.log( karname )


  return <div className="prds-table-footer">
    <div className="w-50 ib textl">
      <span>Total Predictions: { predictionsCount }</span>
      <br />
      <span>Correct Predictions: { correctPredictionsCount }</span>
      <br />
      <span>Total Points: { totalPoints }</span>
    </div>

    <div className="w-50 ib textr">
      <span>{ predictionsCount } : مجموع التوقعات</span>
      <br />
      <span> { correctPredictionsCount } : التوقعات الصحیحة</span>
      <br />
      <span>{ totalPoints } : مجموع النقاط</span>
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