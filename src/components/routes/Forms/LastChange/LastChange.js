// src/components/routes/Forms/LastChange/LastChanges.js

import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API requests
import "./LastChange.css";

const LastChanges = ({ customerId }) => {
  const [changes, setChanges] = useState([]);

  useEffect(() => {
    const fetchChangeHistory = async () => {
      if (!customerId) {
        console.error("No customerId provided."); // Keep this for debugging
        return; // Exit if customerId is not provided
      }

      try {
        const response = await axios.get(`http://localhost:5000/customers/log-change/${customerId}`);
        setChanges(response.data.changeHistory); // Assuming the response structure includes changeHistory
      } catch (error) {
        console.error("Error fetching change history:", error);
      }
    };

    fetchChangeHistory();
  }, [customerId]); // Fetch history whenever customerId changes

  return (
    <div className="last-changes-container">
        <div className="last-headi ">Update History</div>
        {changes.length > 0 ? (
            changes.map((change, index) => (
            <p className="changes-content" key={index}>
                <strong>Changes made on:</strong> {new Date(change.changed_at).toLocaleString()}, updated <strong>{change.field}</strong> from <em>{change.old_value}</em> to <em>{change.new_value}</em>.
            </p>
            ))
        ) : (
            <p>No changes detected.</p>
        )}
    </div> 
  );
};

export default LastChanges;
