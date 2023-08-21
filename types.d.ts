export interface AiResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: ChatChoice[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface ChatChoice {
    index: number;
    message: {
        role: string;
        content: string;
    };
    finish_reason: string;
}

export interface InterviewQuestions {
    id: number;
    question: string;
}
export interface InterviewAnswers extends InterviewQuestions {
    answer: string;
}
