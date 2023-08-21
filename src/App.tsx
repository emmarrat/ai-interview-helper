import React from 'react';
import './App.css';
import Main from './components/Main/Main';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
    return (
        <>
            <AppToolbar />
            <main className="main container">
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </main>
        </>
    );
}

export default App;
