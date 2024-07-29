import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAddChannelMutation } from '../../api/channelsApi.js'
import { setCurrentChannel } from '../../slices/appSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as filter from 'leo-profanity';


const CreateChannel = ({ handleCloseModal, validationSchema, t }) => {
  const [addChannel] = useAddChannelMutation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={ async (values) => {
        try {
          const newChannel = { name: filter.clean(values.name) };
          const { data: channel, error } = await addChannel(newChannel);
          if (error?.status === 'FETCH_ERROR') {
            toast.error(t('notification.network_error'));
          } else {
            handleCloseModal();
            dispatch(setCurrentChannel(channel));
            toast.success(t('notification.create'));
          }
        } catch (error) {
          toast.error(t('notification.error'));
          console.error(error);
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
          <Modal.Title>{t('titles.modal.create')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={touched.name && !!errors.name}
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
}

export default CreateChannel;