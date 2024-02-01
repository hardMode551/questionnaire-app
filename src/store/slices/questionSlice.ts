import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answer, Question } from '../types/types';
import { fetchQuestions } from './questionAsyncActions';

interface QuestionState {
  currentQuestion: number;
  questions: Question[];
  answers: Answer[];
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  currentQuestion: 0,
  questions: [],
  answers: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    answerQuestion: (state, action: PayloadAction<{ questionId: string; selectedOption: string }>) => {
      const { questionId, selectedOption } = action.payload;
      const currentQuestion = state.questions.find((question) => question.id === questionId);

      if (currentQuestion) {
        const isCorrect = selectedOption === currentQuestion.correctAnswer;

        state.answers.push({
          questionId,
          isCorrect,
          difficulty: currentQuestion.difficulty,
          selectedOptions: [Number(selectedOption)],
        });

        state.currentQuestion++;
      } else {
        console.error(`Question with id ${questionId} not found`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
        state.questions = [];
      });
  },
});

export const { setQuestions, answerQuestion } = questionSlice.actions;

export default questionSlice.reducer;
