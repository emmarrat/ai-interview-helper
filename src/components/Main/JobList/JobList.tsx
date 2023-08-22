import React from 'react';
import { Button, Typography } from 'antd';
import { JOBS_LIST, MESSAGE_ASK_QUESTIONS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './JobList.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { askAiQuestion } from '../../../dispatchers/interviews/interviewsThunks';
import { selectAiLoading } from '../../../dispatchers/interviews/interviewsSlice';
import Spinner from '../../UI/Spinner/Spinner';

const JobList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAiLoading);

    const startInterview = async (position: string) => {
        const message = MESSAGE_ASK_QUESTIONS(position);
        await dispatch(askAiQuestion(message))
            .unwrap()
            .then(() => {
                navigate('/interview');
            });
    };

    return (
        <>
            <div className={styles.wrapper}>
                {loading ? (
                    <>
                        <div>
                            <Typography.Title
                                level={4}
                                className={styles.title}
                            >
                                Подбираем вопросы к собеседованию <br /> под
                                ваше направление
                            </Typography.Title>
                            <Spinner />
                        </div>
                    </>
                ) : (
                    <>
                        <Typography.Title level={3} className={styles.title}>
                            Пожалуйста, выберете направление по которому вы
                            хотели бы пройти тестовое собеседование
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
                                    disabled={loading}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default JobList;
