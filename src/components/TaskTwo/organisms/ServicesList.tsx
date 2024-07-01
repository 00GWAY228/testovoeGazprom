import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { RootState } from '../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { Flex } from 'antd';
import Spinner from '../atoms/Spinner';
import ErrorState from '../atoms/ErrorState';
import { fetchServices } from '../../../redux/slices/serviceSlice';

const ServicesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { services, loading, error } = useAppSelector((state: RootState) => state.services);

  const getServices = useCallback(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <Flex vertical gap={10} style={{ height: '100%' }} align="center" justify="center">
      {loading && <Spinner />}
      {Array.isArray(services) &&
        !loading &&
        !error &&
        services.map((service) => (
          <Link to={`/2/${service.id}/details`} key={service.id}>
            {service.name}
          </Link>
        ))}
      {error && <ErrorState error={error} refecth={getServices} />}
    </Flex>
  );
};

export default ServicesList;
