import React, { useState, useEffect } from 'react'
import TopUsersTable from '../components/TopUsersTable'
import { useSelector } from 'react-redux'
import { getWeekWinners, stWinnersSelectedWeek } from '../redux/actions/winrs.actions'
import WinrsTable from '../components/winrs/WinrsTable'
import WeekSelector from '../components/WeekSelector'
import { Form } from 'react-bootstrap'
import { axos } from '../utils'

const WinrsPg = () => {
  // const lastWeekNumber = useSelector( state => parseInt( state.week.lastWeek.number ) )
  // const { winners } = useSelector( state => state.wnr )   // Not used anymore
  // const { loading: winersLoading } = useSelector( state => state.wnr )
  const [ userLoading, setUserLoading ] = useState( true )
  // const { winners } = useSelector( state => state.wnr )
  const [ winners, setWinners ] = useState( [] )   // winners array
  const { weeks, lastWeek } = useSelector( state => state.week )
  // * Get last 5 weeks in order to display in Select
  const [ lastFiveWeeks, setLastFiveWeeks ] = useState( [] )   // filter redux state weeks
  // Selected week by user in order to display winners
  const [ selectedWeek, setSelectedWeek ] = useState( '' )


  useEffect( () => {
    if ( weeks, lastWeek ) {
      let x = getLastFiveWeeks( weeks, lastWeek )
      // console.log( x )   // Good
      setLastFiveWeeks( x )
    }
    // * Once page mount, get lasw week winrr by default
    if ( lastWeek._id ) {
      //getWinrsByWeekId( lastWeek._id )
      setTimeout( () => setSelectedWeek( lastWeek._id ), 900 )
    }
  }, [ weeks, lastWeek ] )

  useEffect( () => {
    if ( selectedWeek ) {
      getWinrsByWeekId( selectedWeek )
    }
  }, [ selectedWeek ] )


  const handleWeekSelect = ( x ) => {
    // getWinrsByWeekId 
    setSelectedWeek( x )
    // console.log( x )

    // getWeekWinners( x )  DB
    getWinrsByWeekId( x )
  }

  // * Render options for Select Input 
  const SelectOptions = () => <>
    { lastFiveWeeks.length && lastFiveWeeks.map( week =>
      // <option value='opt-2' key={ week.sequence }> { week.id_ } </option> 
      <option value='opt-2'
        key={ week.sequence }
        //selected={ week.id_ === lastWeek.id_ ? true : false }   // default
        value={ week._id }
      >
        { week.year } / Week { week.number }
      </option> )
    }
  </>


  const getLastFiveWeeks = ( weeks, lastWeek ) => {
    // ** Filter redux.state.weeks to get last 5 weeks 
    let lws = lastWeek.sequence
    let last5weeks = weeks.filter( ( week ) => week.sequence <= lws && week.sequence > lws - 5 )
    // ** Sort array of object inline :reverse
    last5weeks.sort( ( a, b ) => ( a.sequence > b.sequence ) ? -1 : ( ( b.sequence > a.sequence ) ? +1 : 0 ) )
    return last5weeks
  }


  const getWinrsByWeekId = async ( weekId ) => {
    // * Get week.topUsers from DB
    try {
      const response = await axos.get( `/api/weeks/${ weekId }` )
      console.log( response.data )

      if ( response.data.data.topUsers ) {
        console.log( '--- set winners' )
        setWinners( response.data.data.topUsers.topUsers )
      } else {
        setWinners( [] )
      }
    } catch ( error ) {
      console.log( error )
      setWinners( [] )
    }
    // stWinnersLoading( false )
  }


  //================================================================================
  return <div className="page py-5">
    <div className="container p-1">
      <div className="center py-3 white">
        <h5> <i className='fas fa-trophy' /> { ' ' } الفائزون</h5>
      </div>

      <div className="winners-table-box" style={ { maxWidth: '800px' } }>
        <div className="row py-2 mb-2 curved-5 bold em-11">
          <div className="col pt-2">
            <i className="fas fa-star gold mx-2" /> { ' ' }
            <span className="bold " style={ { color: '#ffffff' } }> Top Users of </span>
          </div>

          {/* <WeekSelector onchange={ handleWeekSelect } /> */ }
          <div className="col  ">
            <Form.Control as="select"
              value={ selectedWeek }
              //onChange={ ( e ) => setSelectedWeek( e.target.value ) }
              onChange={ ( e ) => handleWeekSelect( e.target.value ) }
              className='bold blue border-none'
            >
              <SelectOptions />
            </Form.Control>
          </div>

          <div className="col pt-1">
            { selectedWeek === lastWeek._id && <span style={ { color: '#ffffff' } }>الاسبوع الماضي</span> }
          </div>

          <div className="col pt-2">
            <div className=" ib">
              <a href="#me" className="white clickable ulineonhover">Find me <i className="fas fa-search" /></a>
            </div>
          </div>

        </div>

        <div className="winners-table-container" >
          { winners && <WinrsTable winners={ winners } // loading={ winersLoading }
          /> }
        </div>
      </div>
    </div>

  </div>
}

export default WinrsPg



 // <div className="col pt-2">
 //            { selectedWeek === lastWeek._id && <span className="em-12 bold"
  //             style={ { color: '#ffffff' } }>الاسبوع الماضي</span> }
  //         </div>
  //     Week { week.number } of { week.year } { ' ' }{ week._id === lastWeek._id ? 'الاسبوع الماضي' : '' }