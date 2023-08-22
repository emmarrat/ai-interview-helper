import { InterviewAnswers, InterviewQuestions } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { askAiQuestion } from './interviewsThunks';
import { RootState } from '../../app/store';
import extractArrayFromString from '../../utils/takeArrayFromString';

interface InterviewState {
    jobPosition: string;
    questions: InterviewQuestions[];
    answers: InterviewAnswers[];
    postLoading: boolean;
}

const initialState: InterviewState = {
    jobPosition: '',
    questions: [],
    answers: [],
    postLoading: false,
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
        builder.addCase(askAiQuestion.pending, (state) => {
            state.postLoading = true;
        });
        builder.addCase(
            askAiQuestion.fulfilled,
            (state, { payload: questions }) => {
                state.questions = extractArrayFromString(
                    questions
                ) as InterviewQuestions[];
                state.postLoading = false;
            }
        );
        builder.addCase(askAiQuestion.rejected, (state) => {
            state.postLoading = false;
        });
    },
});

export const interviewsReducer = interviewSlice.reducer;
export const {} = interviewSlice.actions;

export const selectJobPosition = (state: RootState) =>
    state.interviews.jobPosition;
export const selectJobQuestions = (state: RootState) =>
    state.interviews.questions;
export const selectJobAnswers = (state: RootState) => state.interviews.answers;
export const selectAiLoading = (state: RootState) =>
    state.interviews.postLoading;
