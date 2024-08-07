import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col,
  Button,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../api/channelsApi';
import {
  setActiveModal,
  setModalChannel,
} from '../slices/appSlice.js';
import { setCurrentChannelId, defaultChannelId } from '../slices/channelSlice.js';
import Modal from './modal/Modal.jsx';

const Channels = () => {
  const { data: channels = [] } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scrollToRef = useRef(null);
  const scrollToTop = useRef(null);

  const { currentChannelId } = useSelector((state) => state.channel);

  const selectChannel = (channel) => {
    if (channel.id !== currentChannelId) {
      dispatch(setCurrentChannelId(channel.id));
    }
  };

  const selectModalChannel = (channel) => dispatch(setModalChannel(channel));

  useEffect(() => {
    if (currentChannelId === defaultChannelId) {
      scrollToTop.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (scrollToRef.current) {
      scrollToRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [channels.length, currentChannelId]);

  const buttonHandle = () => {
    dispatch(setActiveModal('create'));
  };

  const activeModal = (channel, nameModal) => {
    selectModalChannel(channel);
    dispatch(setActiveModal(nameModal));
  };

  return (
    <Col xs={4} md={2} className="col-4 col-md-2border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <div>
          <b>
            {t('titles.channel')}
          </b>
        </div>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={buttonHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (!channel.removable ? (
          <li className="nav-item w-100" key={channel.id} ref={Number(channel.id) === Number(defaultChannelId) ? scrollToTop : null}>
            <Button
              type="button"
              className="w-100 rounded-0 text-start text-truncate"
              variant={`${
                Number(currentChannelId) === Number(channel.id) ? 'secondary' : ''
              }`}
              onClick={() => selectChannel(channel)}
            >
              <span className="me-1">#</span>
              {channel.name}
            </Button>
          </li>
        )
          : (
            <li className="nav-item w-100" key={channel.id} ref={channel.id === currentChannelId ? scrollToRef : null}>
              <Dropdown as={ButtonGroup} className="w-100 d-flex">
                <Button
                  type="button"
                  className="w-100 rounded-0 text-start text-truncate"
                  variant={`${
                    Number(currentChannelId) === Number(channel.id) ? 'secondary' : ''
                  }`}
                  onClick={() => selectChannel(channel)}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </Button>
                <Dropdown.Toggle variant={`${
                  Number(currentChannelId) === Number(channel.id) ? 'secondary' : ''
                }`}
                >
                  <span className="visually-hidden">{t('titles.channelManagement')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => activeModal(channel, 'remove')}>
                    {t('titles.menu.remove')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => activeModal(channel, 'rename')}>
                    {t('titles.menu.rename')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          )))}
      </ul>
      <Modal />
    </Col>
  );
};

export default Channels;
