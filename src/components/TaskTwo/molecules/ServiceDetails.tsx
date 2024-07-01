import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { Flex } from 'antd';
import Spinner from '../atoms/Spinner';
import ErrorState from '../atoms/ErrorState';
import { fetchServiceDetails } from '../../../redux/slices/serviceSlice';

const ServiceDetailsComponent: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { serviceDetails, loading, error } = useAppSelector((state: RootState) => state.services);

  const getDetail = useCallback(() => {
    dispatch(fetchServiceDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    getDetail();
  }, [dispatch, getDetail, id]);

  return (
    <Flex vertical gap={10} style={{ height: '100%' }} align="center" justify="center">
      {loading && <Spinner />}
      {serviceDetails && !loading && !error && (
        <div>
          <h2>{serviceDetails.name}</h2>
          <p>{serviceDetails.content}</p>
          <p>{serviceDetails.price} руб.</p>
        </div>
      )}
      {error && <ErrorState error={error} refecth={getDetail} />}
    </Flex>
  );
};

export default ServiceDetailsComponent;
