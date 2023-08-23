export const APP_URL = 'https://api.openai.com/v1/chat/completions';

export const API_REQUEST = (content: string) => {
    return {
        requestBody: {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content }],
            temperature: 0.7,
        },
    };
};

export const APP_NAV = {
    home: '/',
    interview: '/interview',
    interviewResult: '/interview-result',
};
export const JOBS_LIST = [
    {
        title: 'Frontend разработчик',
    },
    {
        title: 'Backend разработчик',
    },
    {
        title: 'QA разработчик',
    },
    {
        title: 'UX/UI дизайнер',
    },
];

export const MESSAGE_ASK_QUESTIONS = (position: string) => {
    return `Представь что я прохожу интервью на позицию ${position}. Составь список из трех вопросов в формате массива обьекта  {id: (номер вопроса), question: (сам вопрос), isAnswered: false}`;
};

export const MESSAGE_ASK_REVIEW = (position: string, interview: string) => {
    return `Представь что я прохожу у тебя интервью на позицию ${position}. Рассмотри следующий массив с обьектами где question это твой вопрос, а answer это мой ответ: ${interview}. Напиши рецензию на каждый данный мной ответ, если были допущены ошибки, то исправь меня, однако не обращай внимания на грамматические и орфаграфические ошибки текста, затем верни массив такого вида {question: предоставленный вопрос, answer: предоставленный ответ, review: твое оценночное мнение относительно ответа, id: число }`;
};

export const ANIMATION_VARIANTS = {
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            duration: 1.4,
        },
    },
    hidden: {
        opacity: 0,
    },
};
