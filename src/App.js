import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
// import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signUp",
    element: <SignUpPage/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
