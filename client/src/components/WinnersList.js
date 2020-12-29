import React from 'react'
import winnersJson from '../mock-data/winners.json'

const WinnersList = () => {

  const winnersArr = winnersJson.winners

  // console.log( winnersArr )
  const winners = winnersArr.slice( 0, 5 )



  return <div className="winners-list">
    <div className="header p-1">
      <div className="center p-2">
        <span className="goldd em-15">&#9733;</span>
        <span className="z"> Winners of Last Week</span>
      </div>

      <div className="header-2 row">
        <div className="col-auto"> # </div>
        <div className="col"> Name </div>
        <div className="col-auto"> Points </div>
      </div>
    </div>

    <div className="body p-2">
      { winners.map( winner => <div className="row pb-1">
        <div className="col-auto"> <i className="fas fa-medal gold" /></div>
        <div className="col pl-2">{ winner.username }</div>
        <div className="col-auto">{ winner.points }</div>
      </div>
      ) }
    </div>

    <div className="center blue em-08 p-1 clickable">Show all</div>
    {/* <div className="btn btn-block btn-sm btn-primary">Show all</div> */ }

  </div>
}

export default WinnersList
