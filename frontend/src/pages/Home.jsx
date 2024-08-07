import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import appPath from '../routes';
import { useAuth } from '../context/authContext.jsx';

const Home = () => {
  const nav = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      nav(appPath.login());
    }
  }, [token, nav]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default Home;
