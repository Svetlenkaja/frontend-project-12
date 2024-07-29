import { useSelector, useDispatch } from 'react-redux';
import CreateChannel from './CreateChannel';
import RenameChannel from './RenameChannel';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setActiveModal } from '../../slices/appSlice';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import RemoveChannel from './RemoveChannel';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const { activeModal, currentChannel } = useSelector((state) => state.app);

  const handleCloseModal = () => {
    dispatch(setActiveModal(''));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .notOneOf(channels.map(channel => channel.name), t('form.validation.unique'))
      .min(3, t('form.validation.length'))
      .max(20, t('form.validation.length'))
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
    <Component curChannel={currentChannel} handleCloseModal={handleCloseModal} validationSchema={validationSchema} dispatch={dispatch} t={t}/>  
  );
}

export default Modal;