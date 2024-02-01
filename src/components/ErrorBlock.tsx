import React from 'react'

import styled from '@emotion/styled';


const ErrorBlockContainer = styled.div`
width: 700px;

margin: 0 auto;
margin-top: 40px;

color: var(--Gray-Light, #cdcdcd);

h1 {
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: 30px;
  }

  p {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
  }
`;

const ErrorBlock: React.FC = () => {
  return (
    <ErrorBlockContainer>
      <h1>Ошибка!</h1>
      <p>Что-то пошло не так, волшебные коты уже работают над этим)))</p>
      <img src="https://avatars.mds.yandex.net/i?id=b274a3ab395191b39669ab9e608610a17ea27345-4119753-images-thumbs&n=13" alt="cat" />
    </ErrorBlockContainer>
  )
}

export default ErrorBlock;