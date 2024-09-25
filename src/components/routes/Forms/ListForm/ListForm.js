// src/components/routes/Forms/ListForm/ListForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ListForm.css";

const ListForm = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5); // You can set this to any number of customers per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLastUpdatedCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching last updated customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastUpdatedCustomers();
  }, []);

  // Get the current customers to display based on the page
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (customer) => {
    navigate(`/customers/use/${customer.id}`, { state: { customer } });
  };

  return (
    <div>
      <h2 className="list_form_headi">Customers Relationship Management</h2>
      <div className="list-container">
        {loading ? (
          <p>Loading...</p>
        ) : currentCustomers.length > 0 ? (
          <>
            <table className="customers-table">
              <thead>
                <tr className="customer-row">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
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
                {currentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.C_unique_id}</td>
                    <td className="customer-name">{customer.first_name} {customer.last_name}</td>
                    <td>{customer.email_id}</td>
                    <td>{customer.phone_no}</td>
                    <td>{new Date(customer.date_created).toLocaleDateString()}</td>
                    <td>{new Date(customer.date_of_birth).toLocaleDateString()}</td>
                    <td className="customer-add">{customer.address}</td>
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
            {/* Pagination Controls */}
            <div className="pagination-container">
              <div className="pagination">
                {[...Array(Math.ceil(customers.length / customersPerPage)).keys()].map((number) => (
                  <button
                    key={number + 1}
                    onClick={() => paginate(number + 1)}
                    className={`page-number ${currentPage === number + 1 ? 'active' : ''}`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No recent records found.</p>
        )}
      </div>
    </div>
  );
};

export default ListForm;
