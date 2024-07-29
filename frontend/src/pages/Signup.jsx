import { Container, Form, Row, Card, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../api/authApi';
import { setUser } from '../slices/authSlice';
import { appPath } from '../routes';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();
  const nav = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .required(t('form.validation.required'))
      .min(3, t('form.validation.length'))
      .max(20, t('form.validation.length')),
    password: Yup.string()
      .min(6, t('form.validation.lengthPassword'))
      .required(t('form.validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('form.validation.confirmPassword'))
      .required(t('form.validation.required')),
  });

  return (
    <Container className="container-fluid h-100">
       <Row className="justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              </div>
              <Formik
                initialValues={{ username: '', password: '', confirmPassword: '', }}
                validationSchema={validationSchema}
                onSubmit = { async (values, { setErrors }) => {
                  try {
                    const { data, error } = await register(values);
                    if(data) {
                      localStorage.setItem('token', data.token);
                      localStorage.setItem('username', data.username);
                      dispatch(setUser(data));
                      nav(appPath.home());
                    } else if (error?.status === 409) {
                      setErrors({ username: t('form.validation.userExists') });
                    } else {
                      console.error('Signup error');
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }}
                validateOnChange={false}
              >
                {({
                  values,
                  handleSubmit,
                  handleChange,
                  errors,
                  isSubmitting,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}> 
                    <h1 className="text-center mb-4">{t('titles.signup')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control 
                        type="text"
                        name="username"
                        id="username"
                        value={values.username}
                        onChange={handleChange}
                        placeholder={t('form.validation.length')}
                        isInvalid={!!errors.username}
                      />
                      <Form.Label htmlFor="username">{t('form.signup.username')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control 
                        type="password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        placeholder={t('form.validation.lengthPassword')}                  
                        isInvalid={!!errors.password}
                      />
                      <Form.Label htmlFor="password">{t('form.signup.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        placeholder={t('form.validation.confirmPassword')}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Label htmlFor="confirmPassword">{t('form.signup.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3 btn" disabled={isSubmitting}>{t('form.signup.btn_signup')}</Button>               
                  </Form>
                )}
              </Formik>
            </Card.Body> 
          </Card>
          </div>
       </Row>
    </Container>

  )
};

export default Signup;