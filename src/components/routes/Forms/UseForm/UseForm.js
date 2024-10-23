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
        middle_name: customer.middle_name,
        last_name: customer.last_name,
        phone_no_primary: customer.phone_no_primary,
        whatsapp_num: customer.whatsapp_num,
        phone_no_secondary: customer.phone_no_secondary,
        email_id: customer.email_id,
        address: customer.address,
        country: customer.country,
        company_name: customer.company_name,
        contact_type: customer.contact_type,
        source: customer.source,
        disposition: customer.disposition,
        agent_name: customer.agent_name,
        gender: customer.gender || 'male',
        comment: customer.comment,
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

        if (!validatePhoneNumber(formData.phone_no_primary)) {
            alert("Phone number must be 10 digits long and start with a digit from 5 to 9.");
            return;
        }

        if (!validateEmail(formData.email_id)) {
            alert("Please enter a valid email address.");
            return;
        }

        const updatedFormData = {
            ...formData,
            // If optional fields are empty, they should remain as empty strings or null
            middle_name: formData.middle_name || null,
            whatsapp_num: formData.whatsapp_num || null,
            phone_no_secondary: formData.phone_no_secondary || null
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
            navigate("/customers");
            return;
        }

        try {
            Object.keys(updatedFormData).forEach((key) => {
                if (updatedFormData[key] === undefined) {
                    updatedFormData[key] = null;
                }
            });

            const apiUrl = process.env.REACT_APP_API_URL; // Get the base URL from the environment variable
    
            // Update customer
            await axios.put(`${apiUrl}/customer/${customer.id}`, updatedFormData);

            // Log changes to customer_change_log
            await axios.post(`${apiUrl}/customers/log-change`, {
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
            <div className="use-last-container">

                <div className="use-form-container">
                    <form onSubmit={handleSubmit}>
                        {/* Your input fields */}
                        {[
                            { label: "First Name:", name: "first_name" },
                            { label: "Middle Name:", name: "middle_name" },
                            { label: "Last Name:", name: "last_name" },
                            { label: "Phone(Primary):", name: "phone_no_primary" },
                            { label: "Phone(WhatsApp):", name: "whatsapp_num" },
                            { label: "Phone(Secondary):", name: "phone_no_secondary" },
                            { label: "Email:", name: "email_id" },
                            { label: "Company Name:", name: "company_name" },
                            { label: "Contact Type:", name: "contact_type" },
                            { label: "Address:", name: "address" },
                            { label: "Country:", name: "country" },
                            { label: "Disposition:", name: "disposition" },
                            { label: "Source:", name: "source" },
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

                        {/* Gender Dropdown */}
                        <div className="label-input">
                            <label>Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Comment Section */}
                        <div className="label-input comment">
                            <label>Comment:</label>
                            <div className="textarea-container">
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    rows="2"
                                    placeholder="Enter any additional comments"
                                    className="comet"
                                />
                            </div>
                        </div>

                        <button type="submit">Update</button>
                    </form>
                </div>

                <div>
                    {/* Pass customerId to LastChanges */}
                    <LastChanges customerId={customer.id} originalData={customer} updatedData={updatedData} />
                </div>
            </div>

        </div>
    );
};

export default UseForm;
