import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AiResponse } from '../../../types';
import { APP_URL } from '../../utils/constants';

export const askAiQuestion = createAsyncThunk<string, string>(
    'interviews/askQuestion',
    async (content: string, thunkAPI) => {
        const requestBody = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content }],
            temperature: 0.7,
        };

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        };

        try {
            const { data } = await axios.post<AiResponse>(
                APP_URL,
                requestBody,
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
