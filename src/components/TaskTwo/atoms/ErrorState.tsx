import { Button } from 'antd';
import React from 'react';

type Props = {
  error: string;
  refecth: () => void;
};

const ErrorState: React.FC<Props> = ({ error, refecth }) => {
  return (
    <div>
      <h2>Произошла ошибка: {error}</h2>
      <Button onClick={refecth}>Повторить запрос</Button>
    </div>
  );
};

export default ErrorState;
