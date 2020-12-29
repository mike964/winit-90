// const ErrorResponse = require( '../utils/errorResponse' )
// const asyncHandler = require( '../middleware/async.mdlwr' )
const Team = require( '../models/Team' )
const League = require( '../models/League' )
const crud = require( '../utils/crudHandler' )

//==========================================================
// @route     GET /api/v1/teames

exports.getTeams = crud.getAll( Team )

exports.getTeam = crud.getOne( Team )

exports.createTeam = crud.createOne( Team )

exports.updateTeam = crud.updateOne( Team )

exports.deleteTeam = crud.deleteOne( Team )

//==========================================================
// @route     GET /api/v1/leagues

exports.getLeagues = crud.getAll( League )

exports.getLeague = crud.getOne( League )

exports.createLeague = crud.createOne( League )

exports.updateLeague = crud.updateOne( League )

exports.deleteLeague = crud.deleteOne( League )