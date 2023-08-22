import React from 'react';
import './App.css';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Interview from './pages/Interview';

function App() {
    return (
        <>
            <AppToolbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/interview" element={<Interview />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
