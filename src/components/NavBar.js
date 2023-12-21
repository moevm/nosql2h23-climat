import React from "react";
import { Link } from "react-router-dom";

function NavBar(){
    return (
        <div className="all_navbar">
            <div className="importBtn"><p>Import</p></div>
            <div className="navbar">  
                <Link to="/rooms">Rooms</Link>
                <Link to="/devices">Devices</Link>
                <Link to="/scenario">Scenario</Link>
                <Link to="/notification">Notifications</Link>
            </div>
        </div>
    )
}
export default NavBar;