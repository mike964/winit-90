const { qrFunc } = require( './queryFunction' )
const ErrorResponse = require( './errorResponse' )

// We run this to prevent writing trycatch in every asyn function
const catchAsync = fn => {
  return ( req, res, next ) => {
    fn( req, res, next ).catch( next )
  }
}

// lsn 11.15
exports.deleteOne = model => catchAsync( async ( req, res, next ) => {

  const doc = await model.findById( req.params.id )

  if ( !doc ) {
    return next( new ErrorResponse( `No doc with the id of ${ req.params.id }` ), 404 )
  }

  const documentId = req.params.id

  doc.remove()

  res.status( 200 ).json( {
    success: true,
    data: null,
    msg: `Doc ${ documentId } deleted!`
  } )
} )

exports.updateOne = model =>
  catchAsync( async ( req, res, next ) => {
    const doc = await model.findByIdAndUpdate( req.params.id, req.body, {
      new: true,
      runValidators: true
    } )

    if ( !doc ) {
      return next( new ErrorResponse( `No doc found with id of ${ req.params.id }`, 404 ) )
    }

    res.status( 200 ).json( {
      success: true,
      msg: `${ req.params.id } updated!`,
      data: doc
    } )
  } )

exports.createOne = model => catchAsync( async ( req, res, next ) => {

  // const docs = await model.find()

  // reqBody = {
  //   sequence: docs.length + 1,
  //   ...req.body
  // }

  const doc = await model.create( req.body )  // req.body is dangerous

  // console.log( doc )   // for development

  res.status( 201 ).json( {
    success: true,
    data: doc,
    // docs
  } )
} )

// lsn 11.17
exports.getOne = ( model, populateOptions ) =>
  catchAsync( async ( req, res, next ) => {

    let query = model.findById( req.params.id )

    if ( populateOptions ) {
      if ( typeof populateOptions === 'object' ) {
        query = query.populate( ...populateOptions )
      } else {
        query = query.populate( populateOptions )
      }
    }

    const doc = await query

    if ( !doc ) {
      return next( new ErrorResponse( 'No document found with that ID', 404 ) )
    }

    res.status( 200 ).json( {
      success: true,
      nResults: 1,
      data: doc
    } )
  } )

exports.getAll = ( Model, populateOptions ) =>
  catchAsync( async ( req, res, next ) => {

    // console.log( req.query )

    // lsn 11.21
    // const docs = await features.qr
    // const doc = await features.qr.explain()   // this is for motherfukers 😎

    // Execute query - find bootcamps in db
    const qr = qrFunc( req.query, Model, populateOptions )

    // qr.select( '-__v' )   // remove __v from response
    docs = await qr
    const data = docs


    // SEND RESPONSE 

    res.status( 200 ).json( {
      success: true,
      nResults: docs.length,
      data
    } )
  } )




