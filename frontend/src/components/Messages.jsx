import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { useGetMessagesQuery, messagesApi } from '../api/messagesApi';
import NewMessage from './NewMessage';
import { io } from 'socket.io-client';

const Messages = () => {
  const dispatch = useDispatch();
  const {data = [] } = useGetMessagesQuery();
  
  const { currentChannel } = useSelector((state) => state.app);

  const socket = io();
  const curruntChannelMessages = data.filter(
    (message) => message.channelId === currentChannel.id,
  );

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
        draftMessages.push(newMessage);
      }));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [currentChannel, data, dispatch, socket]);

  return(
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">0 messages</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
        {curruntChannelMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>: {message.body}
          </div>
        ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <NewMessage></NewMessage>
        </div>
      </div>
    </Col>
  )
}

export default Messages;