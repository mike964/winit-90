import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Logo from '../../components-common/Logo'
import MatchItem from './MatchItem'

const MatchCollapse = ( { title, matches, ligId } ) => {


  const { expandAllLigs } = useSelector( state => state.global )

  const [ open, setOpen ] = useState( false );


  // console.log( 'matches.length' )
  // console.log( matches.length )


  useEffect( () => {
    if ( expandAllLigs ) {
      setOpen( true )
    } else {
      setOpen( false )
    }
  }, [ expandAllLigs ] )

  useEffect( () => {
    // * toggle prlig by default automatically
    setTimeout( () => {
      if ( ligId === 'prlig' ) {
        setOpen( true )
      }
    }, 2000 )
    // Ha haaa .. bitch :)
  }, [] )

  const handleClick = () => {
    setOpen( !open )
  }


  //================================================================================================
  return <>
    {matches.length ? <div className={ "match-collapse " + ligId } >
      {/*** Header ***/ }
      <div className="row center header"
        data-toggle="collapse"
        href={ "#" + ligId }
        //aria-expanded="false"
        aria-expanded={ open }
        aria-controls={ ligId }
        onClick={ handleClick }
      >
        <div className="col px-3 text-l">
          <Logo
            src={ `/api/logos/_ligs/${ ligId }.png` }
            className="bg-w p-1 mx-2"
            rounded
            style={ { maxWidth: '30px' } }
          />
          <span className="align-middle">{ title }</span>
        </div>
        <div className="col-2 pt-1">
          <span className="x">
            { matches.length }
          </span>
        </div>
        <div className="col-auto px-2 pt-1">
          <i className={ "fas " + ( open ? "fa-chevron-up" : "fa-chevron-down" ) } />
        </div>
      </div>

      {/*** Body ***/ }
      <Collapse in={ open }>
        <div className="py-2 px-1" style={ { background: '#303030' } }>
          { matches && matches.map( ( mch ) =>
            <MatchItem match={ mch } key={ mch._id } /> ) }
        </div>
      </Collapse>
    </div> :
      // If No matches  
      <span className="x"></span>
    }
  </>
}

export default MatchCollapse
