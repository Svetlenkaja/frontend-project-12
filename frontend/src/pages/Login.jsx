import {
  Container,
  Form,
  Row,
  Card,
  Button,
} from 'react-bootstrap';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from '../api/authApi';
import { useAuth } from '../context/authContext';

const Login = () => {
  const [login] = useLoginMutation();
  const { t } = useTranslation();
  const { logIn } = useAuth();

  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="login.jpeg" className="rounded-circle" alt={t('titles.login')} />
              </div>
              <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                  const { data, error } = await login(values);
                  if (data) {
                    logIn(data);
                  } else {
                    switch (error?.data.statusCode) {
                      case 0: {
                        toast.error(t('errors.network_error'));
                        break;
                      }
                      case 401: {
                        setErrors({ password: t('errors.authorize_error') });
                        break;
                      }
                      default: {
                        toast.error(t('errors.unknown_error'));
                        break;
                      }
                    }
                  }
                }}
                validateOnChange={false}
              >
                {({
                  values,
                  handleSubmit,
                  handleChange,
                  isSubmitting,
                  errors,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('titles.login')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        required
                        placeholder={t('form.login.username')}
                        isInvalid={!!errors.username}
                      />
                      <Form.Label htmlFor="username">{t('form.login.username')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder={t('form.login.password')}
                        required
                        isInvalid={!!errors.password}
                      />
                      <Form.Label htmlFor="password">{t('form.login.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3 btn" disabled={isSubmitting}>
                      {t('form.login.btn_login')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="card-border p-4">
              <div className="text-center">
                <span>
                  {t('titles.no_account')}
                </span>
                <a href="/signup">
                  {t('titles.signup')}
                </a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
