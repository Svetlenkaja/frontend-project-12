import Col from 'react-bootstrap/Col';
import { useGetMessagesQuery } from '../api/messagesApi';
import Message from './Message';

const Messages = () => {
  const {data: messages } = useGetMessagesQuery();
  return(
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">0 messages</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
        <div className="mt-auto px-5 py-3">
          <Message></Message>
        </div>
      </div>
    </Col>
  )
}

export default Messages;