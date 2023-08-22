import React from 'react';
import Questionnaire from '../components/Main/Questionnaire/Questionnaire';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { InterviewAnswers } from '../../types';
import { selectJobPosition } from '../dispatchers/interviews/interviewsSlice';
import { MESSAGE_ASK_REVIEW } from '../utils/constants';
import { askAiForReview } from '../dispatchers/interviews/interviewsThunks';

const Interview = () => {
    const dispatch = useAppDispatch();
    const position = useAppSelector(selectJobPosition);
    const sendForReview = async (interview: InterviewAnswers[]) => {
        const jsonInterview = JSON.stringify(interview);
        const message = MESSAGE_ASK_REVIEW(position, jsonInterview);
        await dispatch(askAiForReview(message)).unwrap();
    };

    return <Questionnaire onSubmit={sendForReview} />;
};

export default Interview;
