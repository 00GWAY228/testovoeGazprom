import React from 'react';
import { Button, DatePicker, Form, Input, notification } from 'antd';
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { addEvent, updateEvent } from '../../../redux/slices/eventSlice';
import { CalendarEvent } from '../../../redux/types';

dayjs.extend(customParseFormat);

interface EventFormProps {
  id?: string;
  title?: string;
  startTime?: string;
  endTime?: string;
  reminder?: number;
  onSubmit?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({
  id,
  title = '',
  startTime = dayjs().format('YYYY-MM-DD HH:mm'),
  endTime = dayjs().add(1, 'hour').format('YYYY-MM-DD HH:mm'),
  reminder = 10,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleFinish = (values: any) => {
    const newEvent = {
      id: id,
      title: values.title,
      startTime: values.startTime.format('YYYY-MM-DD HH:mm'),
      endTime: values.endTime.format('YYYY-MM-DD HH:mm'),
      reminder: values.reminder,
    };

    if (id) {
      dispatch(updateEvent(newEvent as CalendarEvent));
    } else {
      dispatch(addEvent(newEvent));
    }

    notification.success({ message: id ? 'Событие изменено!' : 'Событие добавлено!' });

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title,
          startTime: dayjs(startTime),
          endTime: dayjs(endTime),
          reminder,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="title"
          label="Название"
          rules={[{ required: true, message: 'Введите название' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="startTime"
          label="Время начала"
          rules={[{ required: true, message: 'Введите время начала' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="endTime"
          label="Время окончания"
          rules={[{ required: true, message: 'Введите время окончания' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="reminder"
          label="Напомнить за (минуты)"
          rules={[{ required: true, message: 'Введите время напоминания' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EventForm;
