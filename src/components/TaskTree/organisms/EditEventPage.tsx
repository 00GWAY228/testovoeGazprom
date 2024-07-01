import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventForm from './EventForm';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { selectEventById } from '../../../redux/slices/eventSlice';

const EditEventPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const event = useSelector((state: RootState) => selectEventById(state, id));

  const navigate = useNavigate();

  if (!event) {
    return <div>Event not found</div>;
  }
  return (
    <div>
      <h1>Редактировать событие</h1>
      <EventForm
        id={event.id}
        title={event.title}
        startTime={event.startTime}
        endTime={event.endTime}
        reminder={event.reminder}
        onSubmit={() => navigate('/3')}
      />
    </div>
  );
};

export default EditEventPage;
