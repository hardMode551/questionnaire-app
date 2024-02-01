import React from 'react';
import { mount } from '@cypress/react18';
import configureMockStore from 'redux-mock-store';
import Results from '../../src/components/Results';
import { Provider } from 'react-redux';

import '../../src/styles/index.css';

const mockStore = configureMockStore();
const initialState = {
  question: {
    answers: [
      { questionId: "1", isCorrect: true, difficulty: "easy" },
      { questionId: "2", isCorrect: false, difficulty: "easy" },
      { questionId: "3", isCorrect: true, difficulty: "medium" },
      { questionId: "4", isCorrect: true, difficulty: "hard" },
      { questionId: "5", isCorrect: true, difficulty: "hard" },
    ], 
  },
};

describe('Results Component', () => {
  it('Displays results correctly', () => {
    const store = mockStore(initialState);
    // Мокируем результаты теста
    const mockAnswers = [
      { difficulty: 'easy', isCorrect: true },
      { difficulty: 'easy', isCorrect: false },
      { difficulty: 'medium', isCorrect: true },
      { difficulty: 'medium', isCorrect: true },
      { difficulty: 'hard', isCorrect: true },
    ];

    mount(
      <Provider store={store}>
        <Results />
      </Provider>
    );

    // Передаем моковые ответы в компонент Results через store.dispatch
    mockAnswers.forEach(answer => {
      store.dispatch({ type: 'ADD_ANSWER', payload: answer });
    });

    // Проверяем отображение результатов
    cy.get('[data-testid="results-сontainer"]').should('be.visible');
    cy.contains('Результаты:').should('be.visible');
    cy.contains('Легкий: 1').should('be.visible');
    cy.contains('Средний: 1').should('be.visible');
    cy.contains('Сложный: 2').should('be.visible');

    // Проверяем наличие кнопки "Повторить тест"
    cy.get('[data-testid="repeat-test"]').should('be.visible');

    // Не проверяем работоспособность, потому что это запускает бесконечную проверку
  });
});
