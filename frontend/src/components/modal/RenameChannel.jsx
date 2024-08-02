import { Button, Modal, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import * as filter from 'leo-profanity';
import { useEditChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel } from '../../slices/appSlice';

const RenameChannel = ({
  modalChannel,
  handleCloseModal,
  validationSchema,
  dispatch,
  t,
}) => {
  const [editChannel] = useEditChannelMutation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ name: modalChannel.name }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          const channel = { id: modalChannel.id, name: filter.clean(values.name) };
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
        handleBlur,
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
                <Form.Label htmlFor="name" className="visually-hidden">{t('titles.modal.channelName')}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  obBlur={handleBlur}
                  aria-label={t('titles.modal.channelName')}
                  isInvalid={touched.name && !!errors.name}
                  value={values.name}
                  disabled={isSubmitting}
                  required
                  autoFocus
                  ref={inputRef}
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
