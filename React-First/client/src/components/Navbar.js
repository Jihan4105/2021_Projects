import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <NavLink 
                            className="nav-link" 
                            to="/movies"
                            activeClassName = "active"
                        >
                         Movies
                    </NavLink>
                    <NavLink 
                            className="nav-link" 
                            to="/users"
                            activeClassName = "active"
                        >
                        Users
                    </NavLink>
                    <NavLink 
                            className="nav-link" 
                            to="/server"
                            activeClassName = "active"
                        >
                            Server
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;