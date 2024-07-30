import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as filter from 'leo-profanity';
import { useAddMessageMutation } from '../api/messagesApi.js';

const Message = () => {
  const { t } = useTranslation();
  const [addMessage] = useAddMessageMutation();
  const { username } = useSelector((state) => state.auth);
  const { currentChannel } = useSelector((state) => state.app);
  const channelId = currentChannel.id;

  const handleFormSubmit = async (values, { resetForm }) => {
    const { message } = values;
    const newMessage = { body: filter.clean(message), channelId, username };
    try {
      const response = await addMessage(newMessage);
      if (response.error?.status === 'FETCH_ERROR') {
        toast.error(t('notification.network_error'));
      } else {
        resetForm();
      }
    } catch (error) {
      toast.error(t('notification.unknown_error'));
      console.error('Sending message error: ', error);
    }
  };
  return (
    <Formik
      initialValues={{ message: '', channelId, username }}
      onSubmit={handleFormSubmit}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
          <div className="input-group">
            <Form.Label className="visually-hidden" htmlFor="message">
              {t('titles.newMessage')}
            </Form.Label>
            <Form.Control
              type="text"
              name="message"
              className="border-0 p-0 ps-2 form-control"
              onChange={handleChange}
              value={values.message}
              placeholder={t('titles.placeholder.in_message')}
            />
            <Button type="submit" className="btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
              <span className="visually-hidden">{t('titles.btn.send')}</span>
            </Button>
          </div>
          {errors.name && <div id="feedback">{errors.name}</div>}
        </Form>
      )}
    </Formik>
  );
};

export default Message;
