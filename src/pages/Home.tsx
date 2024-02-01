import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store/store';
import Question from '../components/Question';
import Answers from '../components/Answers';
import Results from '../components/Results';
import styled from '@emotion/styled';
import { fetchQuestions } from '../store/slices/questionAsyncActions';
import Loader from '../components/Loader';
import ErrorBlock from '../components/ErrorBlock';

const AppContainer = styled.div`
  background-color: #010101;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 500px) {
    padding: 0px;

    font-size: 12px;
  }
`;

const Home: React.FC = () => {
  const { questions, currentQuestion, loading, error } = useSelector((state: RootState) => state.question);
 
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchQuestions())
  }, [dispatch])

  if(loading) {
    return <Loader />
  }

  if(error) {
    return <ErrorBlock />
  }


  return (
    <AppContainer>
      {questions.length > 0 && currentQuestion < questions.length ? (
        <>
          <Question text={questions[currentQuestion].question.text} difficulty={questions[currentQuestion].difficulty} />
          <Answers  questions={questions[currentQuestion]}/>
        </>
      ) : (
        <Results />
      )}
    </AppContainer>
  );
};

export default Home;
