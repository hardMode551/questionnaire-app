// Results.tsx
import React from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Answer } from "../store/types/types";

const ResultsContainer = styled.div`
  background-color: var(--Gray-Dark--4, #2b2b2b);
  box-shadow: 2px 2px 6px 2px #2b2b2b;

  padding: 20px;

  border-radius: 8px;

  text-align: center;

  h2 {
    font-size: 36px;
  }

  h3 {
    font-size: 24px;
  }

  @media (max-width: 315px) {
    h2 {
      font-size: 24px;
    }

    h3 {
      font-size: 18px;
    }
  }
`;

const Results: React.FC = () => {
  const { answers } = useSelector((state: RootState) => state.question);

  // Функция для подсчета количества правильных ответов в каждой категории сложности
  const countCorrectAnswers = (difficulty: string): number => {
    return answers.filter(
      (answer: Answer) => answer.difficulty === difficulty && answer.isCorrect
    ).length;
  };

  const handleRetryTest = () => {
    window.location.reload();
  };

  return (
    <ResultsContainer data-testid="results-сontainer">
      <h2>Результаты:</h2>
      <div>
        <h3>Легкий: {countCorrectAnswers("easy")}</h3>
        <h3>Средний: {countCorrectAnswers("medium")}</h3>
        <h3>Сложный: {countCorrectAnswers("hard")}</h3>
      </div>
      <button data-testid="repeat-test" onClick={handleRetryTest}>Повторить тест</button>
    </ResultsContainer>
  );
};

export default Results;
