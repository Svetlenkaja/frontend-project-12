
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { appPath } from '../routes';




const Home = () => {
  const nav= useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      nav(appPath.login());
    }
  }, [nav]);

  return (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels></Channels>
      <Messages></Messages>
    </Row>
  </Container>
  )
};

export default Home;