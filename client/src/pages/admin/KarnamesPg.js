import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import WeekTable from '../../components-admin/week/WeekTable'
import { getAllWeeks } from '../../redux/actions/week-karname.actions'
// import KarnameFilters from '../components/karname/KarnameFilters'
// import KarnamesTable from '../components/karname/KarnamesTable'

const KarnamesPg = () => {

  const { weeks } = useSelector( state => state.week )



  return <div className="container">
    <div className="center py-3 em-12 bold">
      Karnames  PG
    </div>

    <div className="p-2">
      <Button variant='outline-success' onClick={ () => getAllWeeks() }>
        Refresh
    </Button>
    </div>
    {/* <KarnameFilters /> */ }
    {/* <KarnamesTable /> */ }

    <WeekTable weeks={ weeks } />

  </div>
}

export default KarnamesPg
