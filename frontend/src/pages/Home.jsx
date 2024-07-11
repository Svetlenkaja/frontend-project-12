
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Channels from '../components/Channels.jsx';
import Messages from '../components/Messages.jsx';



const Home = () => {

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