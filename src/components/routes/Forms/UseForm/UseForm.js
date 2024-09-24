// src/components/routes/Forms/UseForm/UseForm.js

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UseForm.css";

const UseForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const customer = location.state.customer;

    // Utility function to format date for input[type="date"]
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone_no: customer.phone_no,
        email_id: customer.email_id,
        date_of_birth: formatDate(customer.date_of_birth),
        address: customer.address,
        company_name: customer.company_name,
        contact_type: customer.contact_type,
        source: customer.source,
        disposition: customer.disposition,
        agent_name: customer.agent_name,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePhoneNumber = (number) => {
        const regex = /^[5-9]\d{9}$/; // First digit 5-9, followed by 9 digits
        return regex.test(number);
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phone number and email
        if (!validatePhoneNumber(formData.phone_no)) {
            alert("Phone number must be 10 digits long and start with a digit from 5 to 9.");
            return;
        }

        if (!validateEmail(formData.email_id)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const updatedFormData = {
                ...formData,
                date_of_birth: formData.date_of_birth ? new Date(formData.date_of_birth).toISOString() : null,
            };

            Object.keys(updatedFormData).forEach((key) => {
                if (updatedFormData[key] === undefined) {
                    updatedFormData[key] = null;
                }
            });

            await axios.put(`http://localhost:5000/customers/use/${customer.id}`, updatedFormData);
            navigate("/customers");
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };

    return (
        <div>
            <h2 className="list_form_headiii">Edit Customer</h2>
            <div className="use-form-container">
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "First Name:", name: "first_name" },
                        { label: "Last Name:", name: "last_name" },
                        { label: "Phone Number:", name: "phone_no" },
                        { label: "Email:", name: "email_id" },
                        { label: "Date of Birth:", name: "date_of_birth", type: "date" },
                        { label: "Address:", name: "address" },
                        { label: "Company Name:", name: "company_name" },
                        { label: "Contact Type:", name: "contact_type" },
                        { label: "Source:", name: "source" },
                        { label: "Disposition:", name: "disposition" },
                        { label: "Agent Name:", name: "agent_name" },
                    ].map(({ label, name, type = "text", disabled = false }) => (
                        <div className="label-input" key={name}>
                            <label>{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleInputChange}
                                disabled={disabled}
                            />
                        </div>
                    ))}
                    <button type="submit">Update </button>
                </form>
            </div>
        </div>
    );
};

export default UseForm;
