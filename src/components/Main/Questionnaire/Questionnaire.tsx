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

const Questionnaire: React.FC = () => {
    const questions = useAppSelector(selectJobQuestions);

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
                            {isListening ? (
                                <Button
                                    onClick={stopListening}
                                    type="primary"
                                    block
                                    shape="round"
                                    size="large"
                                    icon={<AudioMutedOutlined />}
                                >
                                    Остановить запись
                                </Button>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={startRecording}
                                    icon={<AudioOutlined />}
                                    block
                                    shape="round"
                                    size="large"
                                >
                                    {showAnswer
                                        ? 'Записать снова'
                                        : ' Начать запись'}
                                </Button>
                            )}

                            <Button
                                onClick={handleNextQuestion}
                                block
                                shape="round"
                                size="large"
                            >
                                Следующий вопрос
                            </Button>
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
