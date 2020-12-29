import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const PaypalPg = () => {
  const [ paidFor, setPaidFor ] = useState( false )
  const [ loaded, setLoaded ] = useState( false )



  const product = {
    description: "Huge Dildoo",
    price: 650.00
  }

  const paypal = useRef()

  useEffect( () => {

    window.paypal.Buttons( {
      createOrder: ( data, actions ) => {
        return actions.order.create( {
          intent: "CAPTURE",
          purchase_units: [
            {
              description: product.description,
              amount: {
                currency_code: "USD",
                value: product.price
              }
            }
          ]
        } )
      },
      onApprove: async ( data, actions ) => {
        const order = await actions.order.capture()
        console.log( "Successful order: " )
        console.log( order )
      },
      onError: ( err ) => {
        console.log( err )
      }
    } ).render( paypal.current )
  }, [] )


  return <>
    {paidFor ? <div className="green">Congrats, U just bought a Dick!</div>
      : <div className="bg-white w-50 p-2 m-auto" ref={ paypal }>
        Paypal PG
    </div>
    }

  </>
}

export default PaypalPg
