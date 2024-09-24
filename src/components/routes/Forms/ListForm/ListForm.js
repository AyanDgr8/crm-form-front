// src/components/routes/Forms/ListForm/ListForm.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ListForm.css";

const ListForm = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastUpdatedCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching last updated customers:', error);
      }
    };

    fetchLastUpdatedCustomers();
  }, []);

  const handleEdit = (customer) => {
    navigate('/customers/use/:id', { state: { customer } });
  };

  return (
    <div>
      <h2 className="list_form_headi"> Customers Relationship Management</h2>
      <div className="list-container">
        {customers.length > 0 ? (
          <table className="customers-table">
            <thead>
              <tr className="customer-row">
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>ID</th>
                <th>Date Created</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Contact Type</th>
                <th>Source</th>
                <th>Disposition</th>
                <th>Agent Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="customer-body">
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.first_name} {customer.last_name}</td>
                  <td>{customer.email_id}</td>
                  <td>{customer.phone_no}</td>
                  <td>{customer.C_unique_id}</td>
                  <td>{new Date(customer.date_created).toLocaleDateString()}</td>
                  <td>{new Date(customer.date_of_birth).toLocaleDateString()}</td>
                  <td>{customer.address}</td>
                  <td>{customer.contact_type}</td>
                  <td>{customer.source}</td>
                  <td>{customer.disposition}</td>
                  <td>{customer.agent_name}</td>
                  <td>
                    <button onClick={() => handleEdit(customer)} className="edit-btnn">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent records found.</p>
        )}
      </div>
    </div>
  );
};

export default ListForm;
