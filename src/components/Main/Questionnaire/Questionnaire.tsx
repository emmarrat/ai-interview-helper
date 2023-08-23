import React, { useEffect, useState } from 'react';
import useSpeechRecognition from '../../../hooks/useSpeechRecognitionHook';
import { Button, notification, Tooltip, Typography } from 'antd';
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import { InterviewAnswers, InterviewQuestions } from '../../../../types';
import styles from './Questionnaire.module.css';
import Spinner from '../../UI/Spinner/Spinner';
import TextArea from 'antd/es/input/TextArea';

interface Props {
    onSubmit: (interview: InterviewAnswers[]) => void;
    questions: InterviewQuestions[];
    loading: boolean;
}

const { Title, Text } = Typography;

const Questionnaire: React.FC<Props> = ({ onSubmit, questions, loading }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<InterviewAnswers[]>([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [changeAnswer, setChangeAnswer] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const { text, setText, isListening, startListening, stopListening } =
        useSpeechRecognition();

    console.log(answers);
    useEffect(() => {
        const openNotification = () => {
            api.open({
                message: 'Голосовое распознование может допустить ошибки',
                description:
                    'Вы всегда можете исправить и/или дополнить ваш ответ вручную после завершения записи',
                duration: 10,
                placement: 'bottomRight',
            });
        };
        openNotification();
    }, [api]);

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
            setChangeAnswer(false);
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
        if (isListening || showAnswer) {
            return (
                <div className="borderContainer">
                    {isListening && <Spinner />}
                    {showAnswer && !isListening && (
                        <>
                            <Title level={4} className={styles.title}>
                                Ваш ответ:
                            </Title>
                            <Text className={styles.text} defaultValue={text}>
                                {text}
                            </Text>

                            {changeAnswer ? (
                                <>
                                    <TextArea
                                        rows={4}
                                        maxLength={400}
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                    />
                                </>
                            ) : (
                                <Button
                                    size="large"
                                    className={styles.changeAnswerButton}
                                    shape="round"
                                    onClick={() => setChangeAnswer(true)}
                                >
                                    Изменить ответ
                                </Button>
                            )}
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
            {contextHolder}
        </div>
    );
};

export default Questionnaire;
