import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const Spinner: React.FC = () => {
  return <Spin indicator={<LoadingOutlined spin />} size="large" />;
};
export default Spinner;
