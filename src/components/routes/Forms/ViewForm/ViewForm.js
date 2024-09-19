// src/components/routes/Forms/ViewForm/ViewForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ViewForm.css";

const ViewForm = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation(); // Get the search parameters from the URL

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = new URLSearchParams(location.search);
                const searchType = query.get('type');
                const searchQuery = query.get('query');

                const params = new URLSearchParams();
                if (searchType) params.append("type", searchType);
                if (searchQuery) params.append("query", searchQuery);

                const queryString = params.toString();
                const url = `http://localhost:5000/customers/search?${queryString}`;

                const response = await axios.get(url);
                setResults(response.data);
            } catch (error) {
                setError('Error fetching search results.');
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="view-form">
            <h2 className="list_form_headii">Search Results</h2>
            {results.length > 0 ? (
                <ul className="list_form_ull">
                    {results.map((item) => (
                        <li key={item.id}>
                            <div className="customer-detailss">
                                <p><strong className="nameee">{item.first_name} {item.last_name}</strong></p>
                                <p><strong>Date Created:</strong>{new Date(item.date_created).toLocaleDateString()}</p>
                                <p><strong>Email: </strong> {item.email_id}</p>
                                <p><strong>Phone: </strong> {item.phone_no}</p>
                                <p><strong>Company: </strong> {item.company_name}</p>
                                <p><strong>Date of Birth: </strong> {item.date_of_birth}</p>
                                <p><strong>Address: </strong> {item.address}</p>
                                <p><strong>Contact Type: </strong> {item.contact_type}</p>
                                <p><strong>Source:  </strong>{item.source}</p>
                                <p><strong>Disposition: </strong> {item.disposition}</p>
                                <p><strong>Agent Name: </strong> {item.agent_name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default ViewForm;
