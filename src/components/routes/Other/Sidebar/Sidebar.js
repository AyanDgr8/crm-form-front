// src/components/routes/Sidebar/Sidebar.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";


const Sidebar = () => {
    const [searchType, setSearchType] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate(); // Use the navigate hook to programmatically navigate

    const handleSearch = () => {
        // if (onSearch && typeof onSearch === "function") {
        //     onSearch(searchType, searchQuery); // Pass all search terms
        // } else {
        //     console.error("onSearch is not a function");
        // }

        // Redirect to ViewForm with search parameters
        navigate(`/customers/search?type=${searchType}&query=${searchQuery}`);
    };


    return (
        <div className="sidebar-container">
            <div className="sidebar-content">
                <div className="input-group input-gro">
                    <select 
                        className="form-select form-sel"
                        aria-label="Select search type"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="name">Search by Name</option>
                        <option value="phone">Search by Phone</option>
                        <option value="email">Search by Email</option>
                    </select>
                    <input
                        type="text"
                        className="form-control form-cont"
                        aria-label="Search input"
                        placeholder={`Enter ${searchType === 'name' ? 'Name' : searchType === 'phone' ? 'Phone no.' : 'Email'}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img 
                        src="./uploads/search.svg"
                        className="srch-icon"
                        alt="search-icon"
                        onClick={handleSearch}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
