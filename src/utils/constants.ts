export const APP_URL = 'https://api.openai.com/v1/chat/completions';
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
    return `Представь что я прохожу интервью на позицию ${position}. Составь список из трех вопросов в формате массива обьекта  {id: (номер вопроса), question: (сам вопрос)}`;
};
