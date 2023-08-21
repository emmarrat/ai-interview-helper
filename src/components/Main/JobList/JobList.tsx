import React from 'react';
import { Button, List } from 'antd';
import { JOBS_LIST, MESSAGE_ASK_QUESTIONS } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import styles from './JobList.module.css';
import { useAppDispatch } from '../../../app/hooks';
import { askAiQuestion } from '../../../dispatchers/interviews/interviewsThunks';

const JobList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const startInterview = async (position: string) => {
        const message = await MESSAGE_ASK_QUESTIONS(position);
        await dispatch(askAiQuestion(message));
    };

    return (
        <List
            itemLayout="horizontal"
            dataSource={JOBS_LIST}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        title={
                            <Button
                                type="primary"
                                htmlType="button"
                                onClick={() => startInterview(item.title)}
                                className={styles.button}
                            >
                                {item.title}
                            </Button>
                        }
                    />
                </List.Item>
            )}
        />
    );
};

export default JobList;
