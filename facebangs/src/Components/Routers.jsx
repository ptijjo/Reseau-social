import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Connection from '../Pages/Connection';
import Home from '../Pages/Home';
import Profil from '../Pages/Profil';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Connection />} />
                <Route path='/home' element={<Home />} />
                <Route path="/profil/:id" element={<Profil />} />
            </Routes>

        </BrowserRouter>

    );
};

export default Routers;