import React from 'react'
import { stClickedLig } from '../../redux/actions/global.actions'
import LigLogoBox from './LigLogoBox'
import { useSelector } from 'react-redux'

const LigSelector = () => {
  const { selectedLig } = useSelector( state => state.global )

  return <div className="lig-selector-container">
    <div className="lig-selector bein em-09 fw-500">

      <LigLogoBox
        name='all-ligs'
        clicked={ selectedLig === 'All' ? true : false }
        size='50'
        label='ALL'
        onclick={ () => { stClickedLig( 'All' ) } }
      />
      <LigLogoBox
        name='prlig'
        clicked={ selectedLig === 'England' ? true : false }
        size='50'
        label='ENGLAND'
        onclick={ () => { stClickedLig( 'England' ) } }
      />
      <LigLogoBox
        name='laliga'
        clicked={ selectedLig === 'Spain' ? true : false }
        size='50'
        label='SPAIN'
        onclick={ () => { stClickedLig( 'Spain' ) } }
      />
      <LigLogoBox
        name='seriea'
        clicked={ selectedLig === 'Italy' ? true : false }
        size='50'
        label='ITALY'
        onclick={ () => { stClickedLig( 'Italy' ) } }
      />
      <LigLogoBox
        name='bundesliga'
        clicked={ selectedLig === 'Germany' ? true : false }
        size='50'
        label='GERMANY'
        onclick={ () => { stClickedLig( 'Germany' ) } }
      />
      <LigLogoBox
        name='lig1'
        clicked={ selectedLig === 'France' ? true : false }
        size='50'
        label='FRANCE'
        onclick={ () => { stClickedLig( 'France' ) } }
      />

    </div>
  </div>
}

export default LigSelector
