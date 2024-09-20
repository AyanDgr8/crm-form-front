// src/components/routes/Header/Header.js

import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const fileInputRef = useRef(null);

    // Handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const allowedTypes = [
                "application/vnd.ms-excel", // .xls
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
                "text/csv" // .csv
            ];

            if (allowedTypes.includes(fileType)) {
                // Process the file (e.g., send it to the backend, or parse it)
                console.log("File selected:", file);
            } else {
                alert("Please select a valid CSV or Excel file.");
            }
        }
    };

    // Trigger the file input on icon click
    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="header-container">
            <Link to="/customers" className="header-left">
                <img 
                    src="/uploads/logoo.png"
                    className="logo"
                    alt="logo"
                />
            </Link>

            <div className="header-right">
                <img 
                    src="/uploads/file.svg"
                    className="file-icon"
                    alt="file-icon"
                    onClick={handleIconClick}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept=".csv, .xls, .xlsx"
                    onChange={handleFileChange}
                />
                <img 
                    src="/uploads/profile.svg"
                    className="pro-icon"
                    alt="profile-icon"
                />
            </div> 
        </div>
    );
};

export default Header;
