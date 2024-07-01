import React, { useState } from 'react';
import './App.css';
import { Flex, Layout, Menu, MenuProps } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import TaskOne from './components/TaskOne';
import { Link, Route, Routes } from 'react-router-dom';
import ServiceDetails from './components/TaskTwo/molecules/ServiceDetails';
import ServicesList from './components/TaskTwo/organisms/ServicesList';
import CalendarView from './components/TaskTree/organisms/CalendarView';
import EventsList from './components/TaskTree/organisms/EventsList';
import AddEventPage from './components/TaskTree/organisms/AddEventPage';
import EditEventPage from './components/TaskTree/organisms/EditEventPage';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to="1">Task 1</Link>,
    key: '1',
  },
  {
    label: <Link to="/2">Task 2</Link>,
    key: '2',
  },
  {
    label: <Link to="/3">Task 3</Link>,
    key: '3',
  },
];

function App() {
  const [current, setCurrent] = useState('1');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };
  return (
    <div className="App">
      <Flex gap="middle" wrap style={{ minHeight: '100vh' }}>
        <Layout>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Menu
              mode="horizontal"
              selectedKeys={[current]}
              items={items}
              theme="dark"
              style={{ flex: 1, minWidth: 0 }}
              onClick={onClick}
            />
          </Header>
          <Content style={{ height: '100%' }}>
            <>
              <Routes>
                <Route path="/1" element={<TaskOne />} />
                <Route path="/2" element={<ServicesList />} />
                <Route path="/2/:id/details" element={<ServiceDetails />} />
                <Route path="/3" element={<CalendarView />} />
                <Route path="/3/:date/list" element={<EventsList />} />
                <Route path="/3/add-event" element={<AddEventPage />} />
                <Route path="/3/edit-event/:id" element={<EditEventPage />} />
              </Routes>
            </>
          </Content>
          <Footer>Developed by Burnashkin Maxim</Footer>
        </Layout>
      </Flex>
    </div>
  );
}

export default App;
