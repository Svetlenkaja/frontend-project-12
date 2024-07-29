import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { useEditChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel } from '../../slices/appSlice';
import { toast } from 'react-toastify';
import * as filter from 'leo-profanity';

const RenameChannel = ({ curChannel, handleCloseModal, validationSchema, dispatch, t }) => {
  const [editChannel] = useEditChannelMutation();

  return (
    <Formik
      initialValues={{ name: curChannel.name }}
      validationSchema={validationSchema}
      onSubmit={ async (values) => {
        try {
          const channel = { id: curChannel.id, name: filter.clean(values.name) };
          await editChannel(channel);
          toast.success(t('notification.rename'));
          dispatch(setCurrentChannel(channel));
          handleCloseModal();
        } catch (error) {
          toast.error(t('notification.error'));
          console.error('Error: ', error);
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <Modal 
          show
          centered
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('titles.modal.rename')}</Modal.Title>   
          </Modal.Header>
          <Modal.Body className="mb-0 pb-0">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  isInvalid={errors.name && touched.name}
                  value={values.name}
                  disabled={isSubmitting}
                  required
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                <Modal.Footer className="border-0 d-flex justify-content-end">
                <Button variant="secondary" onClick={handleCloseModal}>{t('titles.btn.cancel')}</Button>
                <Button type="submit" variant="primary">{t('titles.btn.send')}</Button>
                </Modal.Footer>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannel;