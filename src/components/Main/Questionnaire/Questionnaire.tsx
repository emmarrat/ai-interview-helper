import React, { useState } from 'react';
import useSpeechRecognition from '../../../hooks/useSpeechRecognitionHook';
import { Button, Typography } from 'antd';
import { useAppSelector } from '../../../app/hooks';
import { selectJobQuestions } from '../../../dispatchers/interviews/interviewsSlice';
import { InterviewAnswers } from '../../../../types';
import styles from './Questionnaire.module.css';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import Spinner from '../../UI/Spinner/Spinner';

const { Title, Text } = Typography;
const renderButton = (
    onClick: () => void,
    icon: React.ReactNode,
    label: string
) => (
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
);

const Questionnaire: React.FC = () => {
    const questions = useAppSelector(selectJobQuestions);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<InterviewAnswers[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const { text, isListening, startListening, stopListening } =
        useSpeechRecognition();

    const handleNextQuestion = () => {
        if (text.trim()) {
            let userAnswer = '';
            if (text.startsWith('.')) {
                userAnswer = text.slice(1);
            } else {
                userAnswer = text;
            }
            const newAnswers = [...answers];
            newAnswers[currentQuestionIndex] = {
                question: questions[currentQuestionIndex].question,
                answer: userAnswer,
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
                        <Title level={4}>
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
                                      'Остановить запись'
                                  )
                                : renderButton(
                                      startRecording,
                                      <AudioOutlined />,
                                      showAnswer
                                          ? 'Записать снова'
                                          : ' Начать запись'
                                  )}

                            {renderButton(
                                handleNextQuestion,
                                null,
                                'Следующий вопрос'
                            )}
                        </div>
                    </>
                ) : (
                    <p>Все вопросы были отвечены</p>
                )}
            </div>
            {(isListening || (text.length > 0 && showAnswer)) && (
                <div className="borderContainer">
                    {isListening && <Spinner />}
                    {text.length > 0 && showAnswer && (
                        <>
                            <Title level={4}> Ваш ответ:</Title>
                            <Text className={styles.text}>{text}</Text>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
