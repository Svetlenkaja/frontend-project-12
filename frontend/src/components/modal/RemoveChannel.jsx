import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { setCurrentChannelId, defaultChannelId } from '../../slices/channelSlice';

const RemoveChannel = ({
  modalChannel,
  handleCloseModal,
  dispatch,
  t,
}) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { currentChannelId } = useSelector((state) => state.channel);

  const handleRemove = async (id) => {
    try {
      await removeChannel(id).unwrap();
      if (currentChannelId === id) {
        dispatch(setCurrentChannelId(defaultChannelId));
      }
      toast.success(t('notification.remove'));
      handleCloseModal();
    } catch (error) {
      toast.error(t('notification.error'));
      console.error('Error: ', error);
    }
  };

  return (
    <Modal
      show
      centered
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('titles.modal.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="mb-0 pb-0">
        <p className="lead">{t('titles.modal.isSure')}</p>
        <Modal.Footer className="border-0 d-flex justify-content-end">
          <Button variant="secondary" onClick={handleCloseModal}>{t('titles.btn.cancel')}</Button>
          <Button type="submit" onClick={() => handleRemove(modalChannel.id)} variant="danger">{t('titles.btn.remove')}</Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
