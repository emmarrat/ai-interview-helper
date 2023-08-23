import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import {
    ANIMATION_VARIANTS,
    APP_NAV,
    JOBS_LIST,
    MESSAGE_ASK_QUESTIONS,
} from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './JobList.module.css';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { askAiQuestion } from '../../../dispatchers/interviews/interviewsThunks';
import {
    selectAiLoading,
    setJobPosition,
} from '../../../dispatchers/interviews/interviewsSlice';
import Spinner from '../../UI/Spinner/Spinner';
import { motion } from 'framer-motion';

const JobList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAiLoading);
    const [isPositionSelected, setPositionSelected] = useState(false);

    const startInterview = async (position: string) => {
        setPositionSelected(true);
        const message = MESSAGE_ASK_QUESTIONS(position);
        await dispatch(setJobPosition(position));
        await dispatch(askAiQuestion(message))
            .unwrap()
            .then(() => {
                navigate(APP_NAV.interview);
            });
    };

    return (
        <>
            <div className="borderContainer">
                {loading && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS}
                    >
                        <Typography.Title level={4} className={styles.title}>
                            Подбираем вопросы к собеседованию <br /> под ваше
                            направление
                        </Typography.Title>
                        <Spinner />
                    </motion.div>
                )}
                {!isPositionSelected && !loading && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={ANIMATION_VARIANTS}
                    >
                        <Typography.Title level={3} className={styles.title}>
                            Пожалуйста, выберите направление по которому вы
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
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default JobList;
