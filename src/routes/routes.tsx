import { createBrowserRouter } from 'react-router-dom';
import Home from '../page/home/Home';

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

export default routes;