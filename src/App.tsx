import React, { useMemo } from 'react';
import { BrowserRouter as Router, Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes);
export default function App() {
  return (
    <div id="app">
      <RouterProvider router={router} />
    </div>
  );
}
