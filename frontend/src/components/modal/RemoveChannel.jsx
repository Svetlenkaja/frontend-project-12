import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel, defaultChannel } from '../../slices/appSlice';
import { toast } from 'react-toastify';

const RemoveChannel = ({ curChannel, handleCloseModal, dispatch, t }) => {
  const [removeChannel] = useRemoveChannelMutation();

  return (
    <Formik
      initialValues={{ name: curChannel.name }}
      onSubmit={ async () => {
        try {
          await removeChannel(curChannel.id);
          toast.success(t('notification.remove'));
          dispatch(setCurrentChannel(defaultChannel));
          handleCloseModal();
        } catch (error) {
          toast.error(t('notification.error'));
          console.error('Error: ', error);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Modal 
          show
          centered
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('titles.modal.remove')}</Modal.Title>   
          </Modal.Header>
          <Modal.Body className="mb-0 pb-0">
            <Form onSubmit={handleSubmit}>
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
      )}
    </Formik>
  );
};

export default RemoveChannel;