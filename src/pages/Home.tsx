import React, { useState } from 'react';
import JobList from '../components/Main/JobList/JobList';
import { Button, Typography } from 'antd';

const Home = () => {
    const [started, setStarted] = useState(false);
    const startTheApp = () => {
        setStarted(true);
    };
    return (
        <>
            {started ? (
                <JobList />
            ) : (
                <div className="borderContainer">
                    <Typography.Title
                        level={4}
                        style={{ textAlign: 'center', marginBottom: '20px' }}
                    >
                        Добро пожаловать на платформу имитации собеседования с
                        помощью ИИ 🤖📑
                    </Typography.Title>
                    <Button type="default" size="large" onClick={startTheApp}>
                        Начать
                    </Button>
                </div>
            )}
        </>
    );
};

export default Home;
