import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery, messagesApi } from '../api/messagesApi.js';
import NewMessage from './NewMessage.jsx';
import SocketContext from '../context/socketContext.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { data: messages = [] } = useGetMessagesQuery();
  const { currentChannel } = useSelector((state) => state.app);
  const scrollToRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [scrollBottom, setScrollBottom] = useState(true);

  const curruntChannelMessages = messages.filter(
    (message) => Number(message.channelId) === Number(currentChannel.id),
  );

  const countMsg = curruntChannelMessages.length;

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
        draftMessages.push(newMessage);
      }));
    });

    return () => {
      socket.off('newMessage');
    };
  }, [dispatch, socket]);

  useEffect(() => {
    const chatBox = chatBoxRef.current;
    const handleScroll = () => {
      setScrollBottom(chatBoxRef.current.scrollTop === chatBoxRef.current.scrollTopMax);
    };
    chatBox.addEventListener('scroll', handleScroll);
    if (scrollBottom) {
      scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    return () => {
      chatBox.removeEventListener('scroll', handleScroll);
    };
  }, [scrollBottom, countMsg]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># general</b>
          </p>
          <span className="text-muted">{t('titles.msg', { count: countMsg })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={chatBoxRef}>
          {curruntChannelMessages.map((message) => (
            <div key={message.id} className="text-break mb-2" ref={curruntChannelMessages.at(-1).id === message.id ? scrollToRef : null}>
              <b>
                {message.username}
              </b>
              {': '}
              {message.body}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <NewMessage />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
