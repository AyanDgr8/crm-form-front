// src/components/routes/Forms/ZForm.js

import React from "react";
import { Routes, Route, useParams } from 'react-router-dom';
import SearchForm from "./SearchForm/SearchForm";
import UseForm from "./UseForm/UseForm";
import ListForm from "./ListForm/ListForm";
import LastChanges from "./LastChange/LastChange";
import Login from "../Sign/Login/Login";
import Register from "../Sign/Register/Register";
import Logout from "../Sign/Logout/Logout";
import CustomForm from "./CustomForm/CustomForm";
import ViewForm from "./ViewForm/ViewForm";
import CreateForm from "./CreateForm/CreateForm";

const ZForm = () => {
    return (
        <Routes>
            {/* Route to the ListForm component */}
            <Route path="/customers" element={<ListForm />} />

            {/* Route to the CustomForm component */}
            <Route path="/customers/custom-fields" element={<CustomForm />} />
            
            {/* Route to Search Form */}
            <Route path="/customers/search/" element={<SearchForm />} />
            
            {/* Route to View Form */}
            <Route path="/customer/details/:uniqueId" element={<ViewForm />} />

            {/* Route to Use Form */}
            <Route path="/customer/:id" element={<UseForm />} />

            {/* Route to create a new customer record */}
            <Route path="/customer/new" element={<CreateForm />} />

            {/* Route to Use Form */}
            <Route path="/customer/phone:phone" element={<UseForm />} />

            {/* Route to log changes; passing the customerId as a prop */}
            <Route path="/customers/log-change/:id" element={<LastChangeWrapper />} />

            {/* Route to the Register component */}
            <Route path="/register" element={<Register />} />

            {/* Route to the Login component */}
            <Route path="/login" element={<Login />} />

            {/* Route to the Logout component */}
            <Route path="/logout" element={<Logout />} />

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