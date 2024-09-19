// src/components/routes/Header/Header.js

import React from "react";
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {

    return (
        <div className="header-container">
            <Link to="/" className="header-left">
                <img 
                    src="/uploads/logoo.png"
                    className="logo"
                    alt="logo"
                />
            </Link>

            <div className="header-right">
                <img 
                    src="./uploads/profile.svg"
                    className="pro-icon"
                    alt="pro-icon"
                />
            </div> 
        </div>
    );
};

export default Header;
