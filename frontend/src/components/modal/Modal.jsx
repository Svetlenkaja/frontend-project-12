import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import CreateChannel from './CreateChannel';
import RenameChannel from './RenameChannel';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setActiveModal, setModalChannel } from '../../slices/appSlice';
import RemoveChannel from './RemoveChannel';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const { activeModal, modalChannel } = useSelector((state) => state.app);

  const handleCloseModal = () => {
    dispatch(setActiveModal(''));
    dispatch(setModalChannel({}));
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim()
      .notOneOf(channels.map((channel) => channel.name), t('form.validation.unique'))
      .min(3, (t('form.validation.length')))
      .max(20, (t('form.validation.length')))
      .required(t('form.validation.required')),
  });

  if (!activeModal) {
    return null;
  }

  const components = {
    create: CreateChannel,
    rename: RenameChannel,
    remove: RemoveChannel,
  };

  const getComponent = (type) => components[type];
  const Component = getComponent(activeModal);

  return (
    <Component
      modalChannel={modalChannel}
      handleCloseModal={handleCloseModal}
      validationSchema={validationSchema}
      dispatch={dispatch}
      t={t}
    />
  );
};

export default Modal;
