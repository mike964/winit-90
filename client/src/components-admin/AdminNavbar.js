import React from 'react'
import { Link } from "react-router-dom"

const AdminNavbar = () => {




  const NavItem = ( { linkto, text } ) => <li className="nav-item">
    <Link  //to="/admin/karnames" 
      to={ linkto }
      className="nav-link"
    > { text }
    </Link>
  </li>

  //==================================================================================
  return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="collapse navbar-collapse  pl-5" id="navbarSupportedContent">
      <ul className="navbar-nav mrr-auto">
        <NavItem linkto="/admin/matches" text="Matches" />

        {/* Navbar DropDown */ }
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            api-football
        </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link to="/admin/multiple" className="dropdown-item"> Add Multiple Matches </Link>
            <Link to="/admin/update-results" className="dropdown-item"> Update Multiple Results </Link>
            <a className="dropdown-item" href="#">Another action</a>
          </div>
        </li>

        <NavItem linkto="/admin/karnames" text="Weeks / Karnames" />
        <NavItem linkto="/admin/vipredictions" text="VIP Prds" />
        <NavItem linkto="/admin/users" text="Users" />
        <NavItem linkto="/admin/payments" text="Payments" />
        <NavItem linkto="/admin/Instructions" text="Instructions" />
      </ul>
    </div>
  </nav>
}

export default AdminNavbar
