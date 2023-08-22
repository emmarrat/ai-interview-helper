import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AiResponse } from '../../../types';
import { API_REQUEST, APP_URL } from '../../utils/constants';

export const askAiQuestion = createAsyncThunk<string, string>(
    'interviews/askQuestion',
    async (content: string, thunkAPI) => {
        const requestSettings = API_REQUEST(content);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        };

        try {
            const { data } = await axios.post<AiResponse>(
                APP_URL,
                requestSettings.requestBody,
                {
                    headers,
                }
            );
            return data.choices[0].message.content;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);

export const askAiForReview = createAsyncThunk<string, string>(
    'interviews/askForReview',
    async (content: string, thunkAPI) => {
        const requestSettings = API_REQUEST(content);
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        };
        try {
            const { data } = await axios.post<AiResponse>(
                APP_URL,
                requestSettings.requestBody,
                {
                    headers,
                }
            );
            return data.choices[0].message.content;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                return thunkAPI.rejectWithValue(error.response?.data);
            }
            throw error;
        }
    }
);
