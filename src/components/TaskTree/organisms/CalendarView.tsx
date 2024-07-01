import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { loadEvents } from '../../../redux/slices/eventSlice';

const CalendarView: React.FC = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.events.events);

  const navigate = useNavigate();

  const dateCellRender = (value: Dayjs) => {
    const formattedDate = value.format('YYYY-MM-DD');
    const dayEvents = events.filter(
      (event) => dayjs(event.startTime).format('YYYY-MM-DD') === formattedDate
    );

    return (
      <ul>
        {dayEvents.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    );
  };

  const onSelect = (newValue: Dayjs) => {
    const formattedDate = newValue.format('YYYY-MM-DD');
    navigate(`/3/${formattedDate}/list`);
  };

  useEffect(() => {
    dispatch(loadEvents());
  }, [dispatch]);

  return (
    <div>
      <Calendar cellRender={dateCellRender} style={{ margin: 24 }} onSelect={onSelect} />
    </div>
  );
};

export default CalendarView;
