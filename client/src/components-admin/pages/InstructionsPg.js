import React from 'react'
import { Table } from 'react-bootstrap'
import Checkmark from '../../components-common/Checkmark'




const InstructionsPg = () => {

  const Checkmarkk = () => <span> - </span>


  //=====================================================================
  return <div className="bg-eee black p-3">
    <div className="container w-900 mx-auto">
      <h4 className="center"> Admin Instructions / Checklist / Steps</h4>
      <p>2020-08-19</p>

      <div className="p-3 bg-w mb-3">
        <h5> How the API works? (Steps)</h5>
        <p className="c-444"> Free / Weekly </p>

        <Table borderless>
          <thead className='bg-eee'>
            <tr>
              <th>#</th>
              <th>Step</th>
              <th>Route</th>
              <th width='40'> Check </th>
            </tr>
          </thead>
          {/* ======== Table Body ======== */ }
          <tbody>
            <tr>
              <td>1</td>
              <td> Admin add matches of week (one by one) </td>
              <td> POST /api/matches</td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>1</td>
              <td> Admin also can add multiple matches using 'api-football' </td>
              <td> GET /api/matches/multiple</td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>2</td>
              <td> User can make multiple predictions ($1 per week) </td>
              <td className="x"> POST /api/predictions/multiple</td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin update match results of week </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> All prds of match (vip + free) get updated automaticly as [correct / finished] </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin click 'U Prds' of a match to update all prds of that match (calculate points)  </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin click 'Up karname stats' of weekId to update points for karnames of that week </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin add fake karnames to take first positions </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin click 'up postions' to update karnames position </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin click 'pay winners' to update top users balance </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
            <tr>
              <td>3</td>
              <td> Admin click 'update week.topUsers' in order to see winners in frontend table </td>
              <td> route </td>
              <td> <Checkmark /> </td>
            </tr>
          </tbody>
        </Table>


      </div>

      <div className="p-3 bg-w">
        <h6 >VIP / Gold </h6>
        <ol className='list-groupp'>
          <li> Admin can edit match (set match.vip = true / set odds) <Checkmark className='fr' /></li>
          <li> If match.vip = true , match appear in vip list <Checkmark className='fr' /></li>
          <li> User needs at least $10 to make vip prediction <Checkmark className='fr' /></li>
          <li> viprd only has one resultKey (1,2,3) <Checkmark className='fr' /></li>
          <li> After Admin update match results, vip prds get updated as corret or not <Checkmark className='fr' /></li>
          <li> Admin click btn 'Pay Correct VIP Prds' of match</li>
        </ol>
      </div>
    </div>


  </div>
}

export default InstructionsPg
