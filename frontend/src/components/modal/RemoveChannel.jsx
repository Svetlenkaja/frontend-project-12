import { useSelector } from 'react-redux';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel, defaultChannel } from '../../slices/appSlice';

const RemoveChannel = ({
  modalChannel,
  handleCloseModal,
  dispatch,
  t,
}) => {
  const [removeChannel] = useRemoveChannelMutation();
  const { currentChannel } = useSelector((state) => state.app);

  const handleRemove = async () => {
    try {
      const { id } = modalChannel;
      await removeChannel(id).unwrap();
      toast.success(t('notification.remove'));
      if (Number(currentChannel.id) === Number(id)) {
        dispatch(setCurrentChannel(defaultChannel));
      }
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
        <Form onSubmit={handleRemove}>
          <Form.Group className="mb-2">
            <p className="lead">{t('titles.modal.isSure')}</p>
            <Modal.Footer className="border-0 d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal}>{t('titles.btn.cancel')}</Button>
              <Button type="submit" variant="danger">{t('titles.btn.remove')}</Button>
            </Modal.Footer>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
