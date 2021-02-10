import React from 'react'
import { useSelector } from 'react-redux'
import TableSpiner from '../../components-common/TableSpiner'
import MatchTR from './MatchTR'


const MatchTable = ( { matches, loading } ) => {

  const { expandAll } = useSelector( state => state.global )
  // const [ expandedRows, setexpandedRows ] = useState( expandAll ? expandAll : false )


  return <table id="matches">
    {/* Header */ }
    <thead className="x">
      <tr className="center">
        <th className="text-ll" >
          <span className="px-2 fl">  { matches && matches.length } </span> Match ID
        </th>
        <th width=""> League </th>
        <th width=""> Result </th>
        <th width="150"> VIP - Odds </th>
        <th width="150"> Time </th>
        <th width="40"> Wk </th>
        <th> Actions </th>
      </tr>
    </thead>
    <tbody>
      { !loading && matches && matches.map( ( mch, index ) =>
        <MatchTR
          match={ mch }
          key={ mch._id }
          index={ index }
          expanded={ expandAll }
        />
      ) }
      { loading
        ? <TableSpiner />
        : <>{ !matches.length && <tr className="x">
          <td className="center">No matches </td>
        </tr> }</> }
    </tbody>

  </table>
}

export default MatchTable


