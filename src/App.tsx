import React from 'react';
import './App.css';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Interview from './pages/Interview';
import { useAppSelector } from './app/hooks';
import {
    selectJobPosition,
    selectJobQuestions,
} from './dispatchers/interviews/interviewsSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Typography } from 'antd';

function App() {
    const jobQuestions = useAppSelector(selectJobQuestions);
    const jobPosition = useAppSelector(selectJobPosition);
    return (
        <>
            <AppToolbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/interview"
                        element={
                            <ProtectedRoute
                                isAllowed={
                                    jobQuestions.length > 0 &&
                                    jobPosition.length > 0
                                }
                            >
                                <Interview />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <Typography.Title
                                level={2}
                                style={{ textAlign: 'center' }}
                            >
                                Упс! Страница не найдена!
                            </Typography.Title>
                        }
                    />
                </Routes>
            </main>
        </>
    );
}

export default App;
