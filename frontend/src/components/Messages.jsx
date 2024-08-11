import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { useGetMessagesQuery } from '../api/messagesApi.js';
import { useGetChannelsQuery } from '../api/channelsApi.js';
import NewMessage from './NewMessage.jsx';

const Messages = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channel);
  const { data: messages = [] } = useGetMessagesQuery();
  const { data: channels = [] } = useGetChannelsQuery();
  const chatBoxRef = useRef(null);
  const [isScrollTop, setIsScrollTop] = useState(false);

  const curruntChannelMessages = messages.filter(
    (message) => Number(message.channelId) === Number(currentChannelId),
  );

  const currentChannel = channels.find(({ id }) => Number(id) === Number(currentChannelId));

  const countMsg = curruntChannelMessages.length;

  useEffect(() => {
    const chatBox = chatBoxRef.current;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
      setIsScrollTop(scrollTop + 1 < scrollHeight - clientHeight);
    };

    chatBox.addEventListener('scroll', handleScroll);
    if (!isScrollTop) {
      chatBox.scrollTop = chatBox.scrollHeight - chatBox.clientHeight;
    }
    return () => {
      chatBox.removeEventListener('scroll', handleScroll);
    };
  }, [curruntChannelMessages.length, isScrollTop]);

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              &nbsp;
              {currentChannel?.name}
            </b>
          </p>
          <span className="text-muted">{t('titles.msg', { count: countMsg })}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5" ref={chatBoxRef}>
          {curruntChannelMessages.map((message) => (
            <div key={message.id} className="text-break mb-2">
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
