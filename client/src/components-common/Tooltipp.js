import React, { Children } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'



//=======================================================
const Tooltipp = ( { place, text, hoverText } ) => {
  return <OverlayTrigger
    placement={ place ? place : 'bottom' }
    overlay={ <Tooltip id="tooltip-24" > { hoverText } </Tooltip> }
  >
    <span>{ text }</span>
  </OverlayTrigger>
}

export default Tooltipp
