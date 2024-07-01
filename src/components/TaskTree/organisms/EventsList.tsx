import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, List, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { deleteEvent } from '../../../redux/slices/eventSlice';
import dayjs from 'dayjs';

const EventList: React.FC = () => {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = (id: string) => {
    dispatch(deleteEvent(id));
    notification.success({ message: 'Событие удалено!' });
  };
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <List
        dataSource={events}
        renderItem={(event) => (
          <List.Item
            actions={[
              <Link to={`/3/edit-event/${event.id}`}>Редактировать</Link>,
              <Button onClick={() => onClick(event.id)}>Удалить</Button>,
            ]}
          >
            <List.Item.Meta
              title={event.title}
              description={`${dayjs(event.startTime).format('YYYY-MM-DD HH:mm')} - ${dayjs(event.endTime).format('YYYY-MM-DD HH:mm')}`}
            />
          </List.Item>
        )}
      />
      <Button onClick={() => navigate('/3/add-event')}>Добавить событие</Button>
    </div>
  );
};

export default EventList;
