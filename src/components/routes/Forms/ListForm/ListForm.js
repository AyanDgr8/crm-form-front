// src/components/routes/Forms/ListForm/ListForm.js

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ListForm.css";

const ListForm = () => {
  const [customers, setCustomers] = useState([]);
  const [openCustomerId, setOpenCustomerId] = useState(null); // Track the expanded customer
  const containerRef = useRef(null); // Reference for scrolling
  const navigate = useNavigate(); // Use the navigate hook

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

  const toggleDetails = (customerId) => {
    if (openCustomerId === customerId) {
      setOpenCustomerId(null); // Collapse the currently opened customer
    } else {
      setOpenCustomerId(customerId); // Expand the clicked customer
      const element = document.getElementById(`customer-${customerId}`);
      if (element && containerRef.current) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        containerRef.current.scrollTop =
          element.offsetTop - containerRef.current.clientWidth / 2 + element.clientWidth / 2;
      }
    }
  };

  const handleEdit = (customer) => {
    // Redirect to UseForm with customer data (excluding C_unique_id)
    navigate('/customers/use/:id', { state: { customer } });
  };

  return (
    <div>
      <h2 className="list_form_headi">Last 5 Updated Customers</h2>
      <div className="list-form list-container" ref={containerRef}>
        <div className="lili">
        {customers.length > 0 ? (
          <ul className="list_form_ul">
            {customers.map((customer) => (
              <li
                key={customer.id}
                className={`list_form_li ${openCustomerId === customer.id ? "expanded" : ""}`}
                id={`customer-${customer.id}`}
              >
                {openCustomerId === customer.id ? (
                  // Expanded view with full details
                  <div className="customer-details">
                    <p><strong className="nameee">{customer.first_name} {customer.last_name}</strong></p>
                    <p><strong>ID:  </strong>{customer.C_unique_id}</p>
                    <p><strong>Date Created:</strong>{new Date(customer.date_created).toLocaleDateString()}</p>
                    <p><strong>Email: </strong> {customer.email_id}</p>
                    <p><strong>Phone: </strong> {customer.phone_no}</p>
                    <p><strong>Company: </strong> {customer.company_name}</p>
                    <p><strong>Date of Birth: </strong> {new Date(customer.date_of_birth).toLocaleDateString()}</p>
                    <p><strong>Address: </strong> {customer.address}</p>
                    <p><strong>Contact Type: </strong> {customer.contact_type}</p>
                    <p><strong>Source:  </strong>{customer.source}</p>
                    <p><strong>Disposition: </strong> {customer.disposition}</p>
                    <p><strong>Agent Name: </strong> {customer.agent_name}</p>
                    
                    {/* Edit Button */}
                    <button onClick={() => handleEdit(customer)} className="edit-btnn">Edit</button>
                  </div>
                ) : (
                  // Initial brief view
                  <div className="customer-info">
                    <p><strong className="nameee">{customer.first_name} {customer.last_name}</strong></p>
                    <p className="list_form_p"><strong>Email:</strong> {customer.email_id}</p>
                    <p className="list_form_p"><strong>Phone:</strong>{customer.phone_no}</p>
                    <p className="list_form_p"><strong>ID:  </strong>{customer.C_unique_id}</p>
                    <p className="list_form_p"><strong>Date Created: </strong> {new Date(customer.date_created).toLocaleDateString()}</p>
                  </div>
                )}

                <div className="toggle-btn">
                  <img
                    src={openCustomerId === customer.id ? "/uploads/left.svg" : " /uploads/right.svg"}
                    className="toggle-icon"
                    alt={openCustomerId === customer.id ? "collapse-icon" : "expand-icon"}
                    onClick={() => toggleDetails(customer.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent records found.</p>
        )}
        </div>
      </div>

    </div>
  );
};

export default ListForm;
