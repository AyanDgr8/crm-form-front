// src/components/routes/Forms/UseForm/UseForm.js

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UseForm.css";
import LastChanges from "../LastChange/LastChange";

const UseForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const customer = location.state.customer;

    const [formData, setFormData] = useState({
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone_no: customer.phone_no,
        email_id: customer.email_id,
        address: customer.address,
        company_name: customer.company_name,
        contact_type: customer.contact_type,
        source: customer.source,
        disposition: customer.disposition,
        agent_name: customer.agent_name,
    });

    const [updatedData, setUpdatedData] = useState(formData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePhoneNumber = (number) => {
        const regex = /^[5-9]\d{9}$/;
        return regex.test(number);
    };

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePhoneNumber(formData.phone_no)) {
            alert("Phone number must be 10 digits long and start with a digit from 5 to 9.");
            return;
        }

        if (!validateEmail(formData.email_id)) {
            alert("Please enter a valid email address.");
            return;
        }

        const updatedFormData = {
            ...formData,
        };

        const changes = [];
        for (const key in updatedFormData) {
            if (updatedFormData[key] !== customer[key]) {
                changes.push({
                    field: key,
                    old_value: customer[key] || null,
                    new_value: updatedFormData[key] || null,
                });
            }
        }

        if (changes.length === 0) {
            alert("No changes made.");
            return;
        }

        try {
            Object.keys(updatedFormData).forEach((key) => {
                if (updatedFormData[key] === undefined) {
                    updatedFormData[key] = null;
                }
            });

            // Update customer
            await axios.put(`http://localhost:4000/customers/use/${customer.id}`, updatedFormData);

            // Log changes to customer_change_log
            await axios.post(`http://localhost:4000/customers/log-change`, {
                customerId: customer.id,
                C_unique_id: customer.C_unique_id,
                changes,
            });

            setUpdatedData(updatedFormData);
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
                    {/* Your input fields */}
                    {[
                        { label: "First Name:", name: "first_name" },
                        { label: "Last Name:", name: "last_name" },
                        { label: "Phone Number:", name: "phone_no" },
                        { label: "Email:", name: "email_id" },
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
                    <button type="submit">Update</button>
                </form>
            </div>

            <div>
                {/* Pass customerId to LastChanges */}
                <LastChanges customerId={customer.id} originalData={customer} updatedData={updatedData} />
            </div>

        </div>
    );
};

export default UseForm;
