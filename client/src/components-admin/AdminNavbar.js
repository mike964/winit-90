import React from 'react'
import { Link } from "react-router-dom"

const AdminNavbar = () => {




  const NavItem = ( { linkto, label } ) => <li className="nav-item">
    <Link className="nav-link"
      //to="/admin/karnames" 
      to={ linkto }
    > { label } </Link>
  </li>

  //==================================================================================
  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="collapse navbar-collapse pl-5" id="navbarSupportedContent">
      <ul className="navbar-nav mrr-auto">
        <NavItem linkto="/admin/matches" label="Matches" />

        {/* <Link to="/admin/multiple" className="dropdown-item"> Add Multiple Matches </Link> */ }
        {/* <Link to="/admin/update-results" className="dropdown-item"> Update Multiple Results </Link> */ }


        <NavItem linkto="/admin/multiple" label="api-football" />

        <NavItem linkto="/admin/karnames" label="Weeks / Karnames" />
        <NavItem linkto="/admin/vipredictions" label="VIP Prds" />
        <NavItem linkto="/admin/odds" label="Odds" />

        <NavItem linkto="/admin/users" label="Users" />
        <NavItem linkto="/admin/payments" label="Payments" />
        <NavItem linkto="/admin/Instructions" label="Instructions" />
      </ul>
    </div>
  </nav>
}

export default AdminNavbar
