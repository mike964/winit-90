import React from 'react'

// last five matches
const LastFive = ( {
  last5matches   // last five matches array
} ) => {



  return <div className="x">
    { last5matches.map( ( item, index ) => {
      if ( item === 'w' ) {
        return <i className="fas fa-check-circle green mr-1" key={ index } />
      } if ( item === 'l' ) {
        return <i className="fas fa-times-circle red mr-1" key={ index } />
      }
      if ( item === 'd' ) {
        return <i className="fas fa-minus-circle dgray mr-1" key={ index } />
      } else {
        return <span className="x" key={ index }></span>
      }
    } ) }
  </div>
}

export default LastFive
