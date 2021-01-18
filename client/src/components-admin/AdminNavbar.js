import React from 'react'
import { Link } from "react-router-dom"

const AdminNavbar = () => {

  return <div className="d-flex p-2 bold bg-black justify-content-around">
    <Link to="/admin/matches" className="orange"> Matches </Link>
    <Link to="/admin/update-results" className="orange"> Update Multiple Results </Link>
    <Link to="/admin/karnames" className="orange"> Weeks / Karnames </Link>
    <Link to="/admin/vipredictions" className="orange">VIP Prds</Link>
    <Link to="/admin/users" className="orange"> Users </Link>
    <Link to="/admin/users" className="orange"> Payments </Link>
    <Link to="/admin/instructions" className="orange"> Instructions </Link>
  </div>
}

export default AdminNavbar
