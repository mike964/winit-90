import React from 'react'
import { useSelector } from 'react-redux';

const Clock = () => {
  const time = useSelector( state => state.clock.currentTime )

  return <div className="clock">
    { time }
  </div>

}

export default Clock
