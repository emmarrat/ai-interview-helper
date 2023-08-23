import React from 'react';
import './App.css';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Interview from './pages/Interview';
import { useAppSelector } from './app/hooks';
import {
    selectInterviewReview,
    selectJobPosition,
    selectJobQuestions,
} from './dispatchers/interviews/interviewsSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Typography } from 'antd';
import { APP_NAV } from './utils/constants';
import Results from './pages/Results';

function App() {
    const jobQuestions = useAppSelector(selectJobQuestions);
    const jobPosition = useAppSelector(selectJobPosition);
    const interviewReview = useAppSelector(selectInterviewReview);
    return (
        <>
            <AppToolbar />
            <main className="container">
                <Routes>
                    <Route path={APP_NAV.home} element={<Home />} />
                    <Route
                        path={APP_NAV.interview}
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
                        path={APP_NAV.interviewResult}
                        element={
                            <ProtectedRoute
                                isAllowed={interviewReview.length > 0}
                            >
                                <Results />
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
