// src/components/Main/Main.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Main.css';
import Afirst from '../routes/Afirst/Afirst';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" element={<Afirst />} />
            </Routes>
        </Router>
    );
};

export default Main;
