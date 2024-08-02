import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as filter from 'leo-profanity';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../api/channelsApi.js';
import { setCurrentChannel } from '../../slices/appSlice';

const CreateChannel = ({ handleCloseModal, validationSchema, t }) => {
  const [addChannel] = useAddChannelMutation();
  const dispatch = useDispatch();

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
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
                <Form.Label htmlFor="name" className="visually-hidden">{t('titles.modal.channelName')}</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  id="name"
                  aria-label={t('titles.modal.channelName')}
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  autoFocus
                  disabled={isSubmitting}
                  required
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

export default CreateChannel;
