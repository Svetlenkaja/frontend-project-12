import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { useLoginMutation } from '../api/authApi';
import { setUser } from '../slices/authSlice';
import { appPath } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Login = () => {
  const [login] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              </div>
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit = { async (values, { setErrors }) => {
                  const { data, error } = await login(values);
                  if (data) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    dispatch(setUser(data));
                    nav(appPath.home());
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
                    <h1 className="text-center mb-4">Войти</h1>
                    <div className="form-floating mb-3">
                      <label htmlFor="username">Ваш ник</label>
                      <Field
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.values.username}
                        required
                        placeholder="Ваш ник"
                        
                      />
                    </div>
                    <div className="form-floating mb-4">
                      <label htmlFor="password">Пароль</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        onChange={props.handleChange}
                        value={props.values.password}
                        placeholder="Пароль"
                      />
                    </div>
                    <Button type="submit" className="w-100 mb-3 btn">Войти</Button>
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
