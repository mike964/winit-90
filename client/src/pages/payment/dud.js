const handleClick = async ( event ) => {
  const stripe = await stripePromise;
  const response = await fetch( "/create-session", {
    method: "POST",
  } );
  const session = await response.json();
  // When the customer clicks on the button, redirect them to Checkout.
  const result = await stripe.redirectToCheckout( {
    sessionId: session.id,
  } );
  if ( result.error ) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
};


return message ? (
  <Message message={ message } />
) : (
    <ProductDisplay handleClick={ handleClick } />
  ) 