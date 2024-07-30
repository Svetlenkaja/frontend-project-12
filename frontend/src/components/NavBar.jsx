import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import appPath from '../routes';
import { useAuth } from '../context/authContext';

const NavBar = () => {
  const { t } = useTranslation();
  const { token, logOut } = useAuth();

  return (
    <Navbar expand="lg" className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to={token ? appPath.home() : appPath.login()}>
          {t('titles.appName')}
        </Navbar.Brand>
        {token ? (
          <Button
            type="button"
            variant="outline-primary"
            onClick={logOut}
          >
            {t('titles.logout')}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  );
};

export default NavBar;
