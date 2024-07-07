import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field } from 'formik';
import { useLoginMutation } from '../authApi';
import { setUser } from '../slices/authSlice';
import { appPath } from '../routes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const Login = () => {
  const [login] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  return (
    <Container className="rounded shadow h-100 mb-2 overflow-hidden">
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
            setErrors({ name: error.data.message });
          }
        }
      }
      >
        {props => (
          <Form onSubmit={props.handleSubmit}> 
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                type="text"
                name="username"
                className="form-control"
                onChange={props.handleChange}
                value={props.values.username}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
                onChange={props.handleChange}
                value={props.values.password}
              />
            </div>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <Button type="submit">Login</Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default Login;
