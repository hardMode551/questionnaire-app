import React from "react";
import styled from "@emotion/styled";
import { Question } from "../store/types/types";
import { useAppDispatch } from "../store/store";
import { answerQuestion } from "../store/slices/questionSlice";

type AnswerProps = {
  questions: Question;
};

const AnswersContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
  margin-bottom: 20px;

  background-color: var(--Gray-Dark--4, #2b2b2b);
  box-shadow: 2px 2px 6px 2px #2b2b2b;
  border-radius: 8px;
`;

const AnswersTitle = styled.h2`
  font-size: 24px;
  line-height: 20px;

  @media (max-width: 400px) {
    font-size: 20px;
  }

  @media (max-width: 315px) {
    font-size: 16px;
  }
`;

const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  margin-bottom: 20px;
`;

const AnswerLabel = styled.label`
  position: relative;

  display: flex;
  align-items: center;

  min-width: 600px;
  height: 48px;

  padding: 10px;

  border: 1px solid
    var(
      --Input-Gradient,
      linear-gradient(180deg, rgba(28, 28, 28, 0) 0%, #1c1c1c 100%)
    );
  background: var(
    --Input-Gradient,
    linear-gradient(180deg, rgba(28, 28, 28, 0) 0%, #1c1c1c 100%)
  );
  box-shadow: 2px 2px 6px 2px #ffffff33;

  border-radius: 4px;

  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 10px;

  &:hover {
    box-shadow: 2px 2px 6px 0px #fff;
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 640px) {
    min-width: 230px;

    font-size: 12px;
  }

  @media (max-width: 315px) {
    min-width: 180px;

    font-size: 12px;
  }
`;

const AnswerInput = styled.input`
  opacity: 0;
  position: absolute;
`;

const Answers: React.FC<AnswerProps> = ({ questions }) => {
  const { id, correctAnswer, incorrectAnswers } = questions;
  const [shuffledAnswers, setShuffledAnswers] = React.useState<string[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    null
  );

  const dispatch = useAppDispatch();

  const handleAnswerSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      dispatch(answerQuestion({ questionId: id, selectedOption }));
      setSelectedOption(null); // Сбрасываем выбранный вариант
    }
  };

  React.useEffect(() => {
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [correctAnswer, incorrectAnswers]);

  return (
    <AnswersContainer>
      <AnswersTitle>Выберите свой ответ:</AnswersTitle>

      <AnswerList>
        {shuffledAnswers.map((answer, index) => (
          <AnswerLabel
            style={
              selectedOption === answer
                ? { boxShadow: "2px 2px 6px 2px greenyellow" }
                : {}
            }
            key={index}
          >
            <AnswerInput
              type="radio"
              value={answer}
              checked={selectedOption === answer}
              onChange={handleAnswerSelection}
            />

            <svg
              style={{ marginRight: "8px", cursor: "pointer" }}
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_106_270)">
                <rect width="18" height="18" rx="9" fill="#0E0E0E" />
                <g filter="url(#filter0_b_106_270)">
                  <rect width="18" height="18" fill="#0E0E0E" />
                </g>
              </g>
              <circle
                cx="9"
                cy="9"
                r="3"
                fill={selectedOption === answer ? "#fff" : "none"}
              />
              <defs>
                <filter
                  id="filter0_b_106_270"
                  x="-43"
                  y="-43"
                  width="104"
                  height="104"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="21.5" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_106_270"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_106_270"
                    result="shape"
                  />
                </filter>
                <clipPath id="clip0_106_270">
                  <rect width="18" height="18" rx="9" fill="white" />
                </clipPath>
              </defs>
            </svg>

            {answer}
          </AnswerLabel>
        ))}
      </AnswerList>

      <button onClick={handleNextQuestion} disabled={selectedOption === null}>
        Следующий вопрос
      </button>
    </AnswersContainer>
  );
};

export default Answers;
