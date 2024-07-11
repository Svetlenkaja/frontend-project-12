
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { appPath } from './routes';

function App() {
  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container"></div>
              <a className="navbar-brand" href="/">Hexlet Chat</a>
          </nav>
            <BrowserRouter>
              <Routes>
                <Route path={appPath.login()} element={<Login />} />
                <Route path={appPath.home()} element={<Home />} />
                <Route path={appPath.notFound()} element={<NotFound />} />
              </Routes>
            </BrowserRouter>
        </div>
      </div>
  </div>
  );
}

export default App;
