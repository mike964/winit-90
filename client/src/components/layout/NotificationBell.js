import React from 'react'
import { OverlayTrigger, Popover, Button } from 'react-bootstrap'

const NotificationBell = () => {
  return <>

    <OverlayTrigger
      key={ 'bottom' }
      placement={ 'bottom' }
      overlay={
        <Popover id={ `popover-positioned-bottom` }>
          <Popover.Title as="h3" className="center">
            <span className="black center">Notifications</span>
          </Popover.Title>
          <Popover.Content>
            <span className="bold ">
              You have new  <i className="far fa-envelope em-12 mx-2" />
            </span>
          </Popover.Content>
        </Popover>
      }
    >
      <i className="fas fa-bell clickable" />
    </OverlayTrigger>
  </>
}

export default NotificationBell
