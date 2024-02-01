import React from "react";
import styled from "@emotion/styled";

interface QuestionProps {
  text: string;
  difficulty: string;
}

const QuestionContainer = styled.div<{
  difficulty: string;
}>`
  background: var(--Gray-Dark--4, #2b2b2b);
  box-shadow: 2px 2px 6px 2px #2b2b2b;

  padding: 20px;
  margin-bottom: 20px;

  border-radius: 8px;
  border: ${(props) =>
    props.difficulty === "easy"
      ? "1px solid #009B00"
      : props.difficulty === "medium"
      ? "1px solid #C2C200"
      : props.difficulty === "hard"
      ? "1px solid red"
      : "2px solid #C20000"};
`;

const QuestionText = styled.h2`
  margin: 0;

  color: var(--Gray-Light, #cdcdcd);

  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px;

  @media (max-width: 640px) {
    font-size: 28px;
    line-height: 30px;
  }

  @media (max-width: 400px) {
    font-size: 20px;
  }

  @media (max-width: 315px) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const Question: React.FC<QuestionProps> = ({ text, difficulty }) => {
  return (
    <QuestionContainer difficulty={difficulty}>
      <QuestionText data-testid="question-text" dangerouslySetInnerHTML={{ __html: text }} />
    </QuestionContainer>
  );
};

export default Question;
