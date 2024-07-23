import { useSelector, useDispatch } from 'react-redux';
import CreateChannel from './CreateChannel';
import { useGetChannelsQuery } from '../../api/channelsApi';
import { setActiveModal } from '../../slices/appSlice';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const Modal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channels = [] } = useGetChannelsQuery();
  const { activeModal } = useSelector((state) => state.app);

  const handleCloseModal = () => {
    dispatch(setActiveModal(''));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .notOneOf(channels.map(channel => channel.name), t('forms.validation.unique'))
      .min(3, t('form.validation.length'))
      .max(20, t('form.validation.length'))
      .required(t('form.validation.required')),
  });

  if (!activeModal) {
    return null;
  }
  
  return (
    <CreateChannel handleCloseModal={handleCloseModal} validationSchema={validationSchema}/>
  );
}

export default Modal;