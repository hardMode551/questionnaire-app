import React from 'react'
import { mount } from '@cypress/react18';
import { Provider } from 'react-redux';
import Answers  from '../../src/components/Answers'
import { store } from '../../src/store/store';

import '../../src/styles/index.css';


describe('Answers Component', () => {
  it('Displays answers correctly', () => {
    const questions = {
      id: "1",
      correctAnswer: 'Correct Answer',
      incorrectAnswers: ['Incorrect Answer 1', 'Incorrect Answer 2', 'Incorrect Answer 3'],
      category: 'Category',
      question: {
        text: 'Question Text',
      },
      tags: ['tag1', 'tag2'],
      type: 'multiple-choice',
      difficulty: 'easy',
      regions: ['region1', 'region2'],
      isNiche: false,
    };

    mount(
    <Provider store={store}>
      <Answers questions={questions} />
    </Provider>
    );

    cy.get('input[type="radio"]').should('have.length', 4); // Проверяем наличие 4 радиокнопок (3 неверных варианта ответа и 1 верный)
    
    // Выбираем случайный вариант ответа
    const randomIndex = Math.floor(Math.random() * 4);
    cy.get('input[type="radio"]').eq(randomIndex).check();

    // Проверяем, что выбранный вариант ответа соответствует выбранной радиокнопке
    cy.get('input[type="radio"]').eq(randomIndex).should('be.checked');

    // Проверяем, что при выборе варианта ответа появляется кнопка "Следующий вопрос"
    cy.contains('Следующий вопрос').should('be.visible');
  });
});
