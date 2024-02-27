import React, { useEffect } from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
// import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import { createRoot } from "react-dom/client";
import Protected from './features/auth/components/Protected';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CheckOut from './pages/CheckOut';
import ProductDetailsPage from './pages/ProductDetailsPage';
import { Error } from './pages/error';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
     <Protected>
      <Home/>
     </Protected>
        
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
  {
    path: "/cart",
    element: ( <Protected>
      <CartPage/>
     </Protected>),
  },
  {
    path: "/checkOutPage",
    element: <Protected><CheckOut/></Protected>,
  },
  {
    path: "/productDetailsPage/:id",
    element : <ProductDetailsPage/>,
  },
  {
    path: "*",
    element : <Error/>
  }
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user])

  return (
    <div className="App">
          <RouterProvider router={router} />
    </div>

  );
}

export default App;
