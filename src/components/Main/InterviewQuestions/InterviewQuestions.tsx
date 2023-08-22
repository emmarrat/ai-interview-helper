import React from 'react';
import styles from './InterviewQuestions.module.css';
import { Typography } from 'antd';
import { useAppSelector } from '../../../app/hooks';
import { selectJobQuestions } from '../../../dispatchers/interviews/interviewsSlice';

const InterviewQuestions = () => {
    const questions = useAppSelector(selectJobQuestions);

    return (
        <div className={styles.wrapper}>
            {questions.map((question) => (
                <p>{question.question}</p>
            ))}
            <div>
                <Typography.Title level={4} className={styles.title}>
                    Вам будет предоставлено несколько вопросов, на каждый вопрос
                    необходимо ответить устно в течение 60 секунд
                </Typography.Title>
            </div>
        </div>
    );
};

export default InterviewQuestions;
