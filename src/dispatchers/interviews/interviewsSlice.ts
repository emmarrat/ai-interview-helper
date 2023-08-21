import { InterviewAnswers, InterviewQuestions } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { askAiQuestion } from './interviewsThunks';
import { RootState } from '../../app/store';

interface InterviewState {
    jobPosition: string;
    questions: InterviewQuestions[];
    answers: InterviewAnswers[];
}

const initialState: InterviewState = {
    jobPosition: '',
    questions: [],
    answers: [],
};

export const interviewSlice = createSlice({
    name: 'interviews',
    initialState,
    reducers: {
        // login: (state, action: PayloadAction<string>) => {
        //     state.user = {
        //         name: action.payload,
        //         currentScore: 0,
        //         scores: [],
        //     };
        //     state.isGameStarted = true;
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(askAiQuestion.pending, (state) => {});
        builder.addCase(
            askAiQuestion.fulfilled,
            (state, { payload: questions }) => {
                const string = JSON.stringify(questions.content);
                state.questions = JSON.parse(string);
            }
        );
        builder.addCase(askAiQuestion.rejected, (state) => {});
    },
});

export const interviewsReducer = interviewSlice.reducer;
export const {} = interviewSlice.actions;

export const selectJobPosition = (state: RootState) =>
    state.interviews.jobPosition;
export const selectJobQuestions = (state: RootState) =>
    state.interviews.questions;
export const selectJobAnswers = (state: RootState) => state.interviews.answers;
