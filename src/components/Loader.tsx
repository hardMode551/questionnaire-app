import React from "react";

import styled from "@emotion/styled";

const LoaderContainer = styled.h2`
display: flex;
justify-content: center;
align-items: center;

margin-top: 20px;

@keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const LoaderComponent = styled.div`
  width: 80px;
  height: 80px;

  border: 14px solid var(--Gray-Light, #cdcdcd);
  border-top: 14px solid green;
  border-radius: 50%;

  animation: spin 1s linear infinite;
`;

const Loader: React.FC = () => {
  return (
    <LoaderContainer>
      <LoaderComponent></LoaderComponent>
    </LoaderContainer>
  );
};

export default Loader;
