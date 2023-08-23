import React, { useState } from 'react';
import useSpeechRecognition from '../../../hooks/useSpeechRecognitionHook';
import { useAppSelector } from '../../../app/hooks';
import {
    selectAiLoading,
    selectJobQuestions,
} from '../../../dispatchers/interviews/interviewsSlice';
import { Button, Typography, Tooltip } from 'antd';
import { AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { InterviewAnswers } from '../../../../types';
import styles from './Questionnaire.module.css';
import Spinner from '../../UI/Spinner/Spinner';

interface Props {
    onSubmit: (interview: InterviewAnswers[]) => void;
}

const { Title, Text } = Typography;

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

    const startRecording = () => {
        startListening();
        setShowAnswer(true);
    };

    const startAgain = () => {
        setAnswers([]);
        setCurrentQuestionIndex(0);
    };

    const renderButton = (
        onClick: () => void,
        icon: React.ReactNode,
        label: string,
        tooltip: string,
        disable?: boolean,
        background?: string
    ) => (
        <Tooltip title={tooltip} placement="right">
            <Button
                type="primary"
                onClick={onClick}
                icon={icon}
                block
                shape="round"
                size="large"
                disabled={disable || false}
                style={{ background: background || '' }}
            >
                {label}
            </Button>
        </Tooltip>
    );

    const renderQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            return (
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
                                  'Остановить запись',
                                  false,
                                  '#c24827'
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
                                : 'У вас есть еще вопрос на который предстоит ответить',
                            isListening || !showAnswer
                        )}
                    </div>
                </>
            );
        } else if (loading) {
            return (
                <>
                    <Title level={4} className={styles.title}>
                        Искуственный интелект проверяет ваши ответы, <br /> это
                        может занять некоторое время
                    </Title>
                    <Spinner />
                </>
            );
        } else {
            return (
                <>
                    <Title level={4} className={styles.title}>
                        Спасибо! Вы ответили на все вопросы!
                    </Title>
                    <div className={styles.btnWrapper}>
                        {renderButton(
                            startAgain,
                            null,
                            'Вернуться назад',
                            'Попоробовать занова ответить на все вопросы',
                            false,
                            '#c24827'
                        )}
                        {renderButton(
                            () => onSubmit(answers),
                            null,
                            'Отправить на проверку',
                            'Отправьте ваши ответы на проверку',
                            loading,
                            '#156c90'
                        )}
                    </div>
                </>
            );
        }
    };

    const renderAnswerSection = () => {
        if (isListening || (text.length > 0 && showAnswer)) {
            return (
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
            );
        }
        return null;
    };

    return (
        <div className={styles.wrapper}>
            <div className="borderContainer">{renderQuestion()}</div>
            {renderAnswerSection()}
        </div>
    );
};

export default Questionnaire;
