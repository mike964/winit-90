import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import OddsTable from '../odds/OddsTable'

const OddsPg = () => {

  const odds = useSelector( state => state.odds )

  console.log( odds.ucl )

  // const handleUpdateOdds 
  // {{URL}}/api/adm/update-odds

  return (
    <div className="bg-w p-3">
      <div className="container mb-3">
        <Button
          variant='outline-secondary'>
          Update Odds
        </Button>
      </div>
      <div className="bg-w container p-0">
        <OddsTable odds={ odds.ucl } />
      </div>
    </div>

  )
}

export default OddsPg
