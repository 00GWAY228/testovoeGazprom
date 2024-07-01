import React from 'react';
import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';

const AddEventPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Добавление события</h1>
      <EventForm onSubmit={() => navigate('/3')} />
    </div>
  );
};

export default AddEventPage;
