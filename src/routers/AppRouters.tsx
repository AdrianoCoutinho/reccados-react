import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Contact } from '../pages';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/contact',
    element: <Contact />
  }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
