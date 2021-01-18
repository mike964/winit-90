import React from 'react'
import { useState } from 'react'
import Logo from '../../components-common/Logo'
import MatchItem from './MatchItem'

const MatchCollapse = ( { title, matches, ligId, ligCode } ) => {


  const [ chevronUp, setchevronUp ] = useState( false )


  const handleClick = () => {
    setchevronUp( !chevronUp )
  }


  //================================================================================================
  return <div className="match-collapse">
    {/*** Header ***/ }
    <div className="row center header"
      data-toggle="collapse"
      href={ "#" + ligId } aria-expanded="false"
      onClick={ handleClick }
    >
      <div className="col  px-3 text-l">
        <Logo
          src={ `/api/logos/_ligs/${ ligId }.png` }
          className="bg-w p-1 mx-2"
          rounded
          style={ { maxWidth: '30px' } }
        />
        <span className="align-middle">{ title }</span>
      </div>
      <div className="col-2 pt-2">
        <span className="x">
          { matches.length }
        </span>
      </div>
      <div className="col-auto px-2 pt-2">
        <i className={ "fas " + ( chevronUp ? "fa-chevron-up" : "fa-chevron-down" ) } />
      </div>
    </div>

    {/*** Body ***/ }
    <div className="collapse body" id={ ligId }>
      <div className="py-2 px-1">
        { matches && matches.map( ( mch ) =>
          <MatchItem match={ mch } key={ mch._id } /> ) }
      </div>
    </div>
  </div>
}

export default MatchCollapse
