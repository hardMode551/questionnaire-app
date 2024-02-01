import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';


export const fetchQuestions = createAsyncThunk('question/fetchQuestions', async () => {
  const {data} = await api.get('');
  return data;
});
