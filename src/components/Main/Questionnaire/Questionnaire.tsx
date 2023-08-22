import React, { useState } from 'react';
import useSpeechRecognition from '../../../hooks/useSpeechRecognitionHook';
import { Button, Typography, Tooltip } from 'antd';
import { useAppSelector } from '../../../app/hooks';
import {
    selectAiLoading,
    selectJobQuestions,
} from '../../../dispatchers/interviews/interviewsSlice';
import { InterviewAnswers } from '../../../../types';
import styles from './Questionnaire.module.css';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import Spinner from '../../UI/Spinner/Spinner';

interface Props {
    onSubmit: (interview: InterviewAnswers[]) => void;
}

const { Title, Text } = Typography;
const renderButton = (
    onClick: () => void,
    icon: React.ReactNode,
    label: string,
    tooltip: string
) => (
    <Tooltip title={tooltip} placement="right">
        <Button
            type="primary"
            onClick={onClick}
            icon={icon}
            block
            shape="round"
            size="large"
        >
            {label}
        </Button>
    </Tooltip>
);

const Questionnaire: React.FC<Props> = ({ onSubmit }) => {
    const questions = useAppSelector(selectJobQuestions);
    const loading = useAppSelector(selectAiLoading);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<InterviewAnswers[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const { text, isListening, startListening, stopListening } =
        useSpeechRecognition();

    const handleNextQuestion = () => {
        if (text.trim()) {
            const newAnswers = [...answers];
            newAnswers[currentQuestionIndex] = {
                question: questions[currentQuestionIndex].question,
                answer: text,
            };
            setAnswers(newAnswers);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setShowAnswer(false);
        }
    };

    console.log(answers);

    const startRecording = () => {
        startListening();
        setShowAnswer(true);
    };

    return (
        <div className={styles.wrapper}>
            <div className="borderContainer">
                {currentQuestionIndex < questions.length ? (
                    <>
                        <Title level={4} className={styles.title}>
                            Вопрос {currentQuestionIndex + 1}
                        </Title>
                        <Text className={styles.text}>
                            {questions[currentQuestionIndex].question}
                        </Text>
                        <div className={styles.btnWrapper}>
                            {isListening
                                ? renderButton(
                                      stopListening,
                                      <AudioMutedOutlined />,
                                      'Остановить запись',
                                      'Остановить запись'
                                  )
                                : renderButton(
                                      startRecording,
                                      <AudioOutlined />,
                                      showAnswer
                                          ? 'Записать снова'
                                          : ' Начать запись',
                                      showAnswer
                                          ? 'Попробуйте записать свой ответ заново'
                                          : 'Вы можете перезаписать ответ до перехода к следующему вопросу'
                                  )}

                            {renderButton(
                                handleNextQuestion,
                                null,
                                currentQuestionIndex + 1 === questions.length
                                    ? 'Завершить'
                                    : 'Следующий вопрос',
                                currentQuestionIndex + 1 === questions.length
                                    ? 'Это был последний вопрос, завершите прохождение собеседования'
                                    : 'У вас есть еще вопрос на который предстоит ответить'
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Title level={4} className={styles.title}>
                            Спасибо! Вы ответили на все вопросы!
                        </Title>
                        <div style={{ marginTop: '15px', width: '100%' }}>
                            {renderButton(
                                () => onSubmit(answers),
                                null,
                                'Отправить на проверку',
                                'Отправьте ваши ответы на проверку'
                            )}
                        </div>
                        {loading && <Spinner />}
                    </>
                )}
            </div>
            {(isListening || (text.length > 0 && showAnswer)) && (
                <div className="borderContainer">
                    {isListening && <Spinner />}
                    {text.length > 0 && showAnswer && (
                        <>
                            <Title level={4} className={styles.title}>
                                Ваш ответ:
                            </Title>
                            <Text className={styles.text}>{text}</Text>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
