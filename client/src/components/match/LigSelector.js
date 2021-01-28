import React from 'react'
import { stClickedLig } from '../../redux/actions/global.actions'
import LigLogoBox from './LigLogoBox'
import { useSelector } from 'react-redux'

const LigSelector = () => {
  const { selectedLig } = useSelector( state => state.global )

  return <div className="lig-selector-container ">
    <div className="row lig-selector bein">

      {/* <div className="col px-1">
        <LigLogoBox
          name='all-ligs'
          clicked={ selectedLig === 'All' ? true : false }
          label='ALL'
          onclick={ () => { stClickedLig( 'All' ) } }
          size='55px'
        />
      </div> */}

      <div className="col px-1">
        <LigLogoBox
          name='ucl-full'
          clicked={ selectedLig === 'UCL' ? true : false }
          //label='UCL'
          onclick={ () => { stClickedLig( 'UCL' ) } }
        />
      </div>

      <div className="col px-1">
        <LigLogoBox
          name='prlig-full'
          clicked={ selectedLig === 'England' ? true : false }
          //label='ENGLAND'
          onclick={ () => { stClickedLig( 'England' ) } }
        />
      </div>

      <div className="col px-1">
        <LigLogoBox
          name='laliga-full'
          clicked={ selectedLig === 'Spain' ? true : false }
          //label='SPAIN'
          onclick={ () => { stClickedLig( 'Spain' ) } }
        />
      </div>
      <div className="col px-1">
        <LigLogoBox
          name='seria-full'
          clicked={ selectedLig === 'Italy' ? true : false }
          //label='ITALY'
          onclick={ () => { stClickedLig( 'Italy' ) } }
        />
      </div>

      <div className="col px-1">
        <LigLogoBox
          name='frlig-full'
          clicked={ selectedLig === 'France' ? true : false }
          onclick={ () => { stClickedLig( 'France' ) } }
        />
      </div>

      <div className="col px-1">
        <LigLogoBox
          name='uel-full'
          clicked={ selectedLig === 'UEL' ? true : false }
          onclick={ () => { stClickedLig( 'UEL' ) } }
        />
      </div>
    </div>
  </div>
}

export default LigSelector
