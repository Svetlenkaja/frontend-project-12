import { useTranslation } from 'react-i18next';
import appPath from '../routes';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="h4 text-muted">
        {t('errors.not_found')}
      </h1>
      <p className="text-muted">
        <a href={appPath.home()}>{t('titles.to_home')}</a>
      </p>
    </div>
  );
};

export default NotFound;
