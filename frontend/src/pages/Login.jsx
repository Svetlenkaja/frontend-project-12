import { Container, Form, Row, Card, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { useLoginMutation } from '../api/authApi';
import { useTranslation } from 'react-i18next';
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
              </div>
              <Formik
                initialValues={{ username: '', password: ''}}
                onSubmit = { async (values, { setErrors }) => {
                  const { data, error } = await login(values);
                  if (data) {
                    logIn(data);
                  }
                  if (error) {
                    switch (error.data.statusCode) {
                      case 0: {
                        setErrors({ name: 'Ошибка сети' });
                        break;
                      }
                      case 401: {
                        setErrors({ name: 'Неверные имя пользователя или пароль' });
                        break;
                      }
                      default: {
                        setErrors({ name: 'Неизвестная ошибка' });
                        break;
                      }
                    }
                  }
                }
              }
              >
                {props => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={props.handleSubmit}> 
                    <h1 className="text-center mb-4">{t('titles.login')}</h1>
                    <Form.Group className="form-floating mb-3">
                      
                      <Form.Control 
                        type="text" 
                        name="username" 
                        id="username" 
                        value={props.values.username}
                        onChange={props.handleChange}
                        required
                        placeholder={t('form.login.username')}
                        isInvalid={!!props.errors.username}
                      />
                      <Form.Label htmlFor="username">{t('form.login.username')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{props.errors.username}</Form.Control.Feedback>
                    </Form.Group>                   
                    <Form.Group className="form-floating mb-3">                       
                      <Form.Control 
                        type="password"
                        name="password"
                        id="password"
                        value={props.values.password}
                        onChange={props.handleChange}
                        placeholder={t('form.login.password')}                     
                        required
                        isInvalid={!!props.errors.password} 
                      />
                      <Form.Label htmlFor="password">{t('form.login.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{props.errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" className="w-100 mb-3 btn">{t('form.login.btn_login')}</Button>
                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}                    
                  </Form>
                )}
              </Formik>
            </Card.Body> 
            <Card.Footer className="card-border p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup"> Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  );
}

export default Login;
