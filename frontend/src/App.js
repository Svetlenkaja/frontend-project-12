import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import { appPath } from './routes';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path={appPath.login()} element={<Login />} />
      <Route path={appPath.home()} element={<Home />} />
      <Route path={appPath.notFound()} element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
