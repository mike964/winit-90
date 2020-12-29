import React from 'react'

export const ResultBox = ( {
  match
} ) => {
  return (
    <div>
      <p>Match finished!</p>
      <p>{ match.reuslt }</p>
    </div>
  )
}
