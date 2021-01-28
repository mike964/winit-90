
exports.queryFunction = async ( reqQuery, Model, populateOptions ) => {

  // console.log( reqQuery ) 

  const req_query = { ...reqQuery }

  // Fields to exclude - delete them from reqQuery
  const removeFields = [ 'select', 'sort', 'page', 'limit' ]
  removeFields.forEach( param => delete req_query[ param ] )

  // Create query string
  let qrString = JSON.stringify( req_query )

  // Add $ to the query to create mongoose operator like "$lte"
  qrString = qrString.replace( /\b(gt|gte|lt|lte|in)\b/g, match => `$${ match }` )

  // Findig Resource
  let qr = Model.find( JSON.parse( qrString ) )
  // console.log( qr )        

  // console.log( populateOptions )
  // Check if user populateOptions has Field Selection or not
  if ( populateOptions ) {
    if ( typeof populateOptions === 'object' ) {
      qr = qr.populate( ...populateOptions )
    } else {
      qr = qr.populate( populateOptions )
    }
  }

  // console.log( req.query )   // { averageCost: { lte: '10000' } }
  // console.log( reqQuery )   // { averageCost: { lte: '10000' } }
  // console.log( qrString )   // {"averageCost":{"$lte":"10000"}}

  // Select fields - lsn 6.4
  if ( reqQuery.select ) {
    // console.log( req.query.select )   // befor building this function
    // console.log( reqQuery.select )       // after building this function :)
    const fields = reqQuery.select.split( ',' ).join( ' ' )
    qr = qr.select( fields )
  }

  // Sort - lsn 6.4
  if ( reqQuery.sort ) {
    const sortBy = reqQuery.sort.split( ',' ).join( ' ' )
    qr = qr.sort( sortBy )
  } else {
    // qr = qr.sort( '-createdAt' )   // sort descendig by 'createdAt' filed
    qr = qr.sort( 'createdAt' )   // sort Ascendig by 'createdAt' filed
  }



  // Pagination - lsn 6.5
  const page = parseInt( reqQuery.page, 10 ) || 1
  const limit = parseInt( reqQuery.limit, 10 ) || 25
  const startIndex = ( page - 1 ) * limit
  const endIndex = page * limit
  const total = await Model.countDocuments()

  qr = qr.skip( startIndex ).limit( limit )
  // Executing query
  const docs = await qr   // doesn't work wihtout wait

  // console.log( '**===========================================' )
  // console.log( qr )

  // Pagination result
  const pagination = {}

  if ( endIndex < total ) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  if ( startIndex > 0 ) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  // Output
  // return qr
  return { docs, pagination }
}

// ===============================================================
// Same as queryFunction ,but without and pagination
exports.qrFunc = ( reqQuery, Model, populateOptions ) => {
  console.log( '---------- qrFunc() ---------'.cyan )

  let req_query = { ...reqQuery }  // some items from req_query will be eliminated
  console.log( '--- req_query: ' )
  console.log( req_query )         // output: { sort: 'date', _id: '5fde605ced267e33689b60e1' }

  // Fields to exclude - delete them from reqQuery
  const removeFields = [ 'select', 'sort', 'page', 'limit', 'from', 'to' ]
  removeFields.forEach( param => delete req_query[ param ] )

  // *** MOSLM ***
  if ( reqQuery.from ) {
    // req_query.date = { gte: reqQuery.from }
    req_query.date = { gte: new Date( reqQuery.from ) }
  }
  if ( reqQuery.to ) {
    // req_query.date = { lt: new Date( endDate ) }
    req_query.date = { ...req_query.date, lte: new Date( reqQuery.to ) }
  }

  // Create query string - JSON.stringify() :convert a JavaScript object into a string 
  let qrString = JSON.stringify( req_query )

  // Add $ to the query to create mongoose operator like "$lte"
  qrString = qrString.replace( /\b(gt|gte|lt|lte|in)\b/g, match => `$${ match }` )

  console.log( '--- qrString:' )
  console.log( qrString )   // for ex: {"_id":"5fde605ced267e33689b60e1"} 

  // Findig Resource - JSON.parse() :converts string to javascript object
  let qr = Model.find( JSON.parse( qrString ) )
  // console.log( qr )        

  // Check if user populateOptions has Field Selection or not
  if ( populateOptions ) {
    if ( typeof populateOptions === 'object' ) {
      qr = qr.populate( ...populateOptions )
    } else {
      qr = qr.populate( populateOptions )
    }
  }

  // console.log( req.query )   // { averageCost: { lte: '10000' } }
  // console.log( reqQuery )   // { averageCost: { lte: '10000' } }
  // console.log( qrString )   // {"averageCost":{"$lte":"10000"}}

  // Select fields - lsn 6.4
  if ( reqQuery.select ) {
    // console.log( req.query.select )   // befor building this function
    // console.log( reqQuery.select )       // after building this function :)
    const fields = reqQuery.select.split( ',' ).join( ' ' )
    qr = qr.select( fields )
  }

  // Sort - lsn 6.4
  if ( reqQuery.sort ) {
    const sortBy = reqQuery.sort.split( ',' ).join( ' ' )
    qr = qr.sort( sortBy )
  } else {
    // qr = qr.sort( '-createdAt' )   // sort descendig by 'createdAt' filed
    qr = qr.sort( 'createdAt' )   // sort Ascendig by 'createdAt' filed
  }




  // Executing query
  // const docs = await qr   // doesn't work wihtout wait

  // console.log( '**===========================================' )
  // console.log( qr )

  return qr   // reture Query obj , not docs
}
