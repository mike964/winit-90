import React from 'react'
import { useState } from 'react'

const Checkbox2 = () => {

  const [ isChecked, setisChecked ] = useState( true )

  const handleChange = ( e ) => {
    console.log( e.target )
    console.log( e.target.value )   // on
    console.log( e.target.cheked )   // undefined
    // const value = e.target.checked
    // const name = e.target.name;

    // setisChecked( e.target.checked )
    setisChecked( e.target.checked )

    // this.setState( {
    //   [ name ]: value
    // } );
  }

  return <div>
    <label>
      Is going:
  <input
        name="someCheckbox"
        type="checkbox"
        checked={ isChecked }
        onChange={ handleChange } />
    </label>
  </div>
}

export default Checkbox2


// class Checkbox2 extends React.Component {
//   constructor( props ) {
//     super( props );
//     this.state = {  someCheckbox: true }

//   }

//   handleInputChange ( e ) {
//     console.log( e.target )
//     const value = e.target.checked
//     const name = e.target.name;

//     this.setState( {
//       [ name ]: value
//     } );
//   }

//   render() {
//     return (
//       <form>
//         <label>
//           Is going:
//           <input
//             name="someCheckbox"
//             type="checkbox"
//             checked={this.state.someCheckbox}
//             onChange={this.handleInputChange} />
//         </label> 
//       </form>
//     );
//   }
// }
