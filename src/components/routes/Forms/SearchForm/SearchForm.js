// src/components/routes/Forms/SearchForm/SearchForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchForm.css"; 

const SearchForm = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

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
        const apiUrl = process.env.REACT_APP_API_URL; // Get the base URL from the environment variable
        const url = `${apiUrl}/customers/search?${queryString}`; // Use the environment variable for the URL

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

  const handleEdit = (customer) => {
    navigate('/customer/phone=' + customer.phone_no_primary, { state: { customer } });
  };



  // Function to handle navigation to home
  const handleHomeClick = () => {
    navigate('/customers');
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2 className="list_form_headiiii">Search Results</h2>
      <div className="list-containerr">
        {results.length > 0 ? (
          <table className="customers-table">
            <thead>
              <tr className="customer-row">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Agent Name</th>
                  <th>Country</th>
                  <th>Disposition</th>
                  <th>Last Updated</th>
              </tr>
            </thead>
            <tbody className="customer-body">
              {results.map((customer) => (
                <tr key={customer.id} onClick={() => handleEdit(customer)} style={{ cursor: 'pointer' }}>
                  <td>{customer.C_unique_id}</td>
                  <td className="customer-name">{customer.first_name} {customer.middle_name} {customer.last_name}</td>
                  <td>{customer.company_name}</td>
                  <td>{customer.email_id}</td>
                  <td>{customer.phone_no_primary}</td>
                  <td>{customer.agent_name}</td>
                  <td>{customer.country}</td>
                  <td>{customer.disposition}</td>
                  <td>{new Date(customer.last_updated).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {/* Updated button to navigate to /customers */}
      <button className="add-home-btn"onClick={handleHomeClick}>Home</button>
    </div>
  );
};

export default SearchForm;
