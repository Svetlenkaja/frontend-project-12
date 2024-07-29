import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useGetChannelsQuery, channelsApi } from '../api/channelsApi';
import { messagesApi } from '../api/messagesApi.js';
import { setCurrentChannel, setActiveModal } from '../slices/appSlice.js';
import  Modal from '../components/modal/Modal.jsx';
import { useTranslation } from 'react-i18next';
import SocketContext from '../context/socketContext.jsx';

const Channels = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const socket = useContext(SocketContext);

  const { currentChannel } = useSelector((state) => state.app);

  const selectChannel = (channel) => {
    if (channel.id !== currentChannel.id) {
      dispatch(setCurrentChannel(channel));
    }
  };

  useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(channelsApi.util.updateQueryData(
        'getChannels', 
        undefined, 
        (draftChannels) => {draftChannels.push(newChannel)}));
    });

    socket.on('renameChannel', (newChannel) => {
      dispatch(channelsApi.util.updateQueryData(
        'getChannels', 
        undefined, 
        (draftChannels) => {
        const channel = draftChannels.find(({ id }) => id === newChannel.id);
        if (channel) {
          channel.name = newChannel.name;
        }
      }));
    });

    socket.on('removeChannel', async (removeChannel) => {
      dispatch(channelsApi.util.updateQueryData(
        'getChannels',
        undefined,
        (draftChannels) => draftChannels.filter(({ id }) => id !== removeChannel.id),
      ));
      dispatch(messagesApi.util.updateQueryData(
        'getMessages',
        undefined,
        (draftMessages) => draftMessages.filter(({ channelId }) => channelId !== removeChannel.id),
      ));
    });

    return () => {
      socket.off('renameChannel');
      socket.off('newChannel');
      socket.off('removeChannel');
    };
  }, [currentChannel, channels, dispatch, socket]);

  const buttonHandle = () => {
    dispatch(setActiveModal('create'));
  };

  const activeModal = (channel, nameModal) => {
    selectChannel(channel);
    dispatch(setActiveModal(nameModal));
  }

  return(
    <Col xs={4} md={2} className="col-4 col-md-2border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <div><b> {t('titles.channel')}</b></div>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={buttonHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path></svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => !channel.removable ? (
          <li className="nav-item w-100" key={channel.id}>
            <Button  
              type="button" 
              className='w-100 rounded-0 text-start btn'
              variant={`${
                Number(currentChannel.id) === Number(channel.id) ? 'secondary' : ''
              }`}
              onClick={() => selectChannel(channel)}
            > 
              <span className="me-1">#</span>
              {channel.name}
            </Button >
          </li>
        ) :
        (
          <Dropdown as={ButtonGroup} className="w-100 d-flex">
            <Button  
              type="button" 
              className='w-100 rounded-0 text-start btn'
              variant={`${
                Number(currentChannel.id) === Number(channel.id) ? 'secondary' : ''
              }`}
              onClick={() => selectChannel(channel)}
            > 
              <span className="me-1">#</span>
              {channel.name}
            </Button >
            <Dropdown.Toggle variant={`${
                Number(currentChannel.id) === Number(channel.id) ? 'secondary' : ''
              }`}
            />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => activeModal(channel, 'remove')}>
                {t('titles.menu.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => activeModal(channel, 'rename')}>
                {t('titles.menu.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </ul>
      {(<Modal/>)}
    </Col>
  )
}

export default Channels;