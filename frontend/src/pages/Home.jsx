
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Channels from '../components/Channels.jsx';



const Home = () => {

  return (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels>

      </Channels>
    </Row>
  </Container>
  )
};

export default Home;