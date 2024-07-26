import { Modal, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useAddChannelMutation } from '../../api/channelsApi.js'
import { setCurrentChannel } from '../../slices/appSlice';
import { useDispatch } from 'react-redux';

const CreateChannel = ({ handleCloseModal, validationSchema }) => {
  const [addChannel] = useAddChannelMutation();
  const dispatch = useDispatch();

  return (
    <Modal show onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={validationSchema}
        onSubmit={ async (values) => {
          console.log('submit');
          try {
            const newChannel = { name: values.name };
            const { data: channel } = await addChannel(newChannel);
            console.log(channel);
            handleCloseModal();
            dispatch(setCurrentChannel(channel));
          } catch (e) {
            console.error(e);
          }
        }}
        >
          {({
            values, handleChange, handleSubmit, errors, touched,
          }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Label htmlFor="name" className="visually-hidden">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={touched.name && !!errors.name}
              required
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button type="submit" variant="primary">Add</Button>
          </Form>)}
          </Formik>
      </Modal.Body> 
    </Modal>
  )
}

export default CreateChannel;