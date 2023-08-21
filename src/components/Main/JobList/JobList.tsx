import React from 'react';
import { Button, Typography } from 'antd';
import { JOBS_LIST, MESSAGE_ASK_QUESTIONS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './JobList.module.css';
import { useAppDispatch } from '../../../app/hooks';
import { askAiQuestion } from '../../../dispatchers/interviews/interviewsThunks';

const JobList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const startInterview = async (position: string) => {
        const message = MESSAGE_ASK_QUESTIONS(position);
        await dispatch(askAiQuestion(message));
    };

    return (
        <div className={styles.wrapper}>
            <Typography.Title level={3} className={styles.title}>
                Пожалуйста, выберете направление по которому вы хотели бы пройти
                тестовое собеседование
            </Typography.Title>
            <div className={styles.list}>
                {JOBS_LIST.map((item) => (
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={() => startInterview(item.title)}
                        className={styles.button}
                        key={item.title}
                        size="large"
                    >
                        {item.title}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default JobList;
