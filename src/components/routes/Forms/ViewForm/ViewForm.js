// src/components/routes/Forms/ViewForm/ViewForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewForm.css"; 

const ViewForm = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { uniqueId } = useParams(); // Extract the unique customer ID from the URL
    const navigate = useNavigate();
  
    useEffect(() => {
        const fetchData = async () => {
        setLoading(true);
        try {
            // Ensure the URL is correct (note the singular 'customer' in the endpoint)
            const url = "http://localhost:4000/customers/details/${uniqueId}"; 
            const response = await axios.get(url);
            setCustomer(response.data); // Set the single customer data
        } catch (error) {
            setError('Error fetching customer details. Please try again later.');
            console.error('Error fetching customer details:', error);
        } finally {
            setLoading(false);
        }
    };

        fetchData();
    }, [uniqueId]); // Dependency on customerId

    const handleEdit = () => {
        if (customer) {
        navigate('/customers/use/' + customer.id, { state: { customer } });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
        <h2 className="list_form_headi">Customer Details</h2>
        {customer ? (
            <div className="customer-details">
            <table className="customers-table">
                <tbody>
                <tr>
                    <th>ID</th>
                    <td>{customer.C_unique_id}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{customer.first_name} {customer.last_name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>{customer.email_id}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{customer.phone_no}</td>
                </tr>
                <tr>
                    <th>Date Created</th>
                    <td>{new Date(customer.date_created).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <th>Date of Birth</th>
                    <td>{customer.date_of_birth ? new Date(customer.date_of_birth).toISOString().split('T')[0] : 'N/A'}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{customer.address}</td>
                </tr>
                <tr>
                    <th>Contact Type</th>
                    <td>{customer.contact_type}</td>
                </tr>
                <tr>
                    <th>Source</th>
                    <td>{customer.source}</td>
                </tr>
                <tr>
                    <th>Disposition</th>
                    <td>{customer.disposition}</td>
                </tr>
                <tr>
                    <th>Agent Name</th>
                    <td>{customer.agent_name}</td>
                </tr>
                </tbody>
            </table>
            <button onClick={handleEdit} className="edit-btnn">Edit</button>
            </div>
        ) : (
            <p>No customer details found.</p>
        )}
        </div>
  );
};

export default ViewForm;