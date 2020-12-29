import React from 'react'
import { useSelector } from 'react-redux';
import PredictionItem from './PredictionItem'

// List of Availabel Weekly Predictions
const PredictionList = () => {

  const { matches } = useSelector( state => state )




  return <div className="pb-3">
    <ul className="list-group">
      { matches && matches.map( ( mch ) =>
        <PredictionItem match={ mch } key={ mch.id } /> ) }
    </ul>
  </div>
}

export default PredictionList
