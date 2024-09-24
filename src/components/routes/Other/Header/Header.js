// src/components/routes/Header/Header.js
import React, { useRef, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
    const fileInputRef = useRef(null);
    const [selectedFileName, setSelectedFileName] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); 

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            alert("Please enter a search term."); // Alert if the search query is empty
            return;
        }

        // Redirect to the ViewForm with search parameters
        navigate(`/customers/search?query=${encodeURIComponent(searchQuery)}`);
    };

    // Handle the Enter key press for search
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

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
                // Set the file name to display it in the UI
                setSelectedFileName(file.name);

                // Process the file (e.g., send it to the backend, or parse it)
                console.log("File selected:", file);
            } else {
                setSelectedFileName("");
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
                    aria-label="Logo"
                />
            </Link>

            <div className="header-right">
                <div className="header-search">
                    <input
                        type="text"
                        className="form-control form-cont"
                        aria-label="Search input"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown} // Handle Enter key press
                    />
                    <img 
                        src="/uploads/search.svg"
                        className="srch-icon"
                        alt="search-icon"
                        onClick={handleSearch} // Search when clicking the icon
                    />
                </div>
                <div className="file-upload-section">
                    <img 
                        src="/uploads/file.svg"
                        className="file-icon"
                        alt="file upload icon"
                        aria-label="Upload file"
                        onClick={handleIconClick}
                    />
                    {selectedFileName && <span className="file-name">{selectedFileName}</span>}
                    <span className="file-upl">File Upload</span>
                    
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept=".csv, .xls, .xlsx"
                        onChange={handleFileChange}
                    />
                </div>
                <img 
                    src="/uploads/profile.svg"
                    className="pro-icon"
                    alt="profile icon"
                    aria-label="Profile"
                />
            </div> 
        </div>
    );
};

export default Header;
