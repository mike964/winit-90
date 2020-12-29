import React from 'react'
import { useState } from 'react'
import CheckBox from '../../components-common/Checkbox'
// import Checkbox2 from '../components-common/Checkbox2'
import { setFilter } from '../../redux/actions/filter.actions'



const MatchFilters = () => {

  const [ checked, setchecked ] = useState( false )

  // setFilter() 

  return <div className="match-filters d-flex bold black">
    {/* <div className="red mb-2">Match Filters </div> */ }

    <div className="col">
      <CheckBox
        label="Finished"
        name="finished"
        checked={ checked }
        onclick={ () => setFilter( 'finished' ) }
      />
    </div>

    <div className="col">
      <CheckBox
        label="This Week"
        name="thisWeek"
        checked={ checked }
        onclick={ () => setFilter( 'thisWeek' ) }
      />
    </div>

    <div className="col">
      <CheckBox
        label="Yesterday"
        name="yesterday"
        checked={ checked }
        onclick={ () => setFilter( 'yesterday' ) }
      />
    </div>

    <div className="col">
      <CheckBox
        label="Not finished"
        name="notFinished"
        checked={ checked }
        onclick={ () => setFilter( 'notFinished' ) }
      />
    </div>

    <div className="col">
      <CheckBox
        label="Last Week"
        name="thisWeek"
        checked={ checked }
        onclick={ () => setFilter( 'lastWeek' ) }
      />
    </div>


    <div className="col">
      <CheckBox
        label="VIP"
        name="vip"
        checked={ checked }
        onclick={ () => setFilter( 'vip' ) }
      />
    </div>

    <div className="row">
      {/* <div className="col-3">Total : </div> */ }
    </div>

  </div>
}

export default MatchFilters
