import React from 'react'
import Counter from './Counter';
import Logo from '../../components-common/Logo'

const PredictionItem = ( { match } ) => {

  console.log( match.date )

  const { teamHost, teamGst, competition } = match

  return <li id="match" className="list-group-item d-flex capitalize">

    <div className="p-2 flex-fill cntr">
      <Logo name={ teamHost } size='50' />
      <br />
      <span>{ teamHost }</span>
    </div>
    <div className="p-2 flex-fill cntr">
      <Counter />
    </div>
    <div className="p-2 flex-fill cntr">
      <Logo name={ teamGst } size='50' />
      <br />
      <span >{ teamGst }</span>
    </div>

  </li>
}

export default PredictionItem
