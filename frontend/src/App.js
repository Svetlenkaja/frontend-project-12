import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Signup from './pages/Signup';
import appPath from './routes';

const App = () => (
  <div className="h-100">
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Routes>
          <Route path={appPath.login()} element={<Login />} />
          <Route path={appPath.home()} element={<Home />} />
          <Route path={appPath.notFound()} element={<NotFound />} />
          <Route path={appPath.signup()} element={<Signup />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default App;
