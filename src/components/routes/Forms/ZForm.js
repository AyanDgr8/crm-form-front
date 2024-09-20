// src/components/routes/Forms/ZForm.js

import React from "react";
import { Routes, Route } from 'react-router-dom';
import ViewForm from "./ViewForm/ViewForm";
import UseForm from "./UseForm/UseForm";
import ListForm from "./ListForm/ListForm";

const ZForm = () => {
    return (
        <Routes>
            {/* Route to the ListForm component */}
            <Route path="/customers" element={<ListForm />} />
            
            {/* Route to View Form */}
            <Route path="/customers/search/" element={<ViewForm />} />

            {/* Route to Use Form */}
            <Route path="/customers/use/:id" element={<UseForm />} />
        </Routes>
    );
};

export default ZForm;
