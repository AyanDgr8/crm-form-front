// src/components/routes/Forms/ZForm.js

import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import ViewForm from "./ViewForm/ViewForm";
import UseForm from "./UseForm/UseForm";
import ListForm from "./ListForm/ListForm";
import LastChanges from "./LastChange/LastChange";

const ZForm = () => {
    return (
        <Routes>
            {/* Route to the ListForm component */}
            <Route path="/customers" element={<ListForm />} />
            
            {/* Route to View Form */}
            <Route path="/customers/search/" element={<ViewForm />} />

            {/* Route to Use Form */}
            <Route path="/customers/use/:id" element={<UseForm />} />

            {/* Route to log changes; passing the customerId as a prop */}
            <Route path="/customers/log-change/:id" element={<LastChangeWrapper />} />
        </Routes>
    );
};

// Wrapper component to extract the customerId from the URL and pass it to LastChanges
const LastChangeWrapper = () => {
    const { id } = useParams(); // Get customerId from the URL

    // Debugging log
    console.log("Customer ID from URL:", id);

    return <LastChanges customerId={id} />;
};

export default ZForm;