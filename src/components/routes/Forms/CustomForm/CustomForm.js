// src/components/routes/Forms/CustomForm/CustomForm.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustomForm.css";

const CustomForm = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formFields, setFormFields] = useState([{ fieldName: "", fieldType: "text", dropdownOptions: [] }]);
    
    // Fetch customers data
    useEffect(() => {
        const fetchLastUpdatedCustomers = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL; 
                const response = await axios.get(`${apiUrl}/customers`); // Adjusted endpoint
                setCustomers(response.data); // Adjust based on your API response structure
            } catch (error) {
                console.error('Error fetching last updated customers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLastUpdatedCustomers();
    }, []);

    // Handle form field changes
    const handleFieldChange = (index, event) => {
        const updatedFields = [...formFields];
        updatedFields[index][event.target.name] = event.target.value;
        setFormFields(updatedFields);
    };

    // Handle adding dropdown options
    const handleAddDropdownOption = (index) => {
        const updatedFields = [...formFields];
        updatedFields[index].dropdownOptions.push(""); // Add an empty option
        setFormFields(updatedFields);
    };

    // Handle dropdown option changes
    const handleDropdownOptionChange = (index, optionIndex, event) => {
        const updatedFields = [...formFields];
        updatedFields[index].dropdownOptions[optionIndex] = event.target.value;
        setFormFields(updatedFields);
    };

    // Add a new form field
    const handleAddField = () => {
        setFormFields([...formFields, { fieldName: "", fieldType: "text", dropdownOptions: [] }]);
    };

    // Remove a form field
    const handleRemoveField = (index) => {
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL; 
            for (const field of formFields) {
                await axios.post(`${apiUrl}/custom-fields`, { 
                    fieldName: field.fieldName,
                    fieldType: field.fieldType,
                    dropdownOptions: field.dropdownOptions
                });
            }
            alert("Form fields added successfully!");
            // Clear the fields after submission
            setFormFields([{ fieldName: "", fieldType: "text", dropdownOptions: [] }]);
        } catch (error) {
            console.error("Error submitting form fields:", error);
            alert("Error while adding fields. Please try again.");
        }
    };

    return (
        <div className="custom-form-container">
            <h2 className="custom-headi">Custom Form</h2>

            <form onSubmit={handleSubmit} className="custom-form">
                {formFields.map((field, index) => (
                    <div key={index} className="form-field">
                        <input
                            type="text"
                            name="fieldName"
                            className="fieldname"
                            value={field.fieldName}
                            placeholder="Field Name"
                            onChange={(e) => handleFieldChange(index, e)}
                            required
                        />
                        <select
                            name="fieldType"
                            value={field.fieldType}
                            onChange={(e) => handleFieldChange(index, e)}
                        >
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="date">Date</option>
                            <option value="email">Email</option>
                            <option value="dropdown">Dropdown</option> {/* Added dropdown option */}
                        </select>
                        {field.fieldType === "dropdown" && ( 
                            <div>
                                {field.dropdownOptions.map((option, optionIndex) => (
                                    <div key={optionIndex} className="dropdown-option">
                                        <input
                                            type="text"
                                            value={option}
                                            placeholder={`Option ${optionIndex + 1}`}
                                            onChange={(e) => handleDropdownOptionChange(index, optionIndex, e)}
                                        />
                                    </div>
                                ))}
                                <button type="button" onClick={() => handleAddDropdownOption(index)} className="add-option-btn">
                                    Add More Options
                                </button>
                            </div>
                        )}
                        <button type="button" onClick={() => handleRemoveField(index)} className="remove-field-btn">
                            Remove
                        </button>
                    </div>
                ))}
                
                <button type="button" onClick={handleAddField} className="add-field-btnn">
                    Add Field
                </button>
                
                <button type="submit" className="submit-form-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CustomForm;
