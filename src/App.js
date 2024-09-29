import React, { useEffect } from "react";
// import { Counter } from './features/counter/Counter';
import "./App.css";
// import ProductList from './features/product-list/ProductList';
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import { createRoot } from "react-dom/client";
import Protected from "./features/auth/components/Protected";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import CheckOut from "./pages/CheckOut";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { useDispatch, useSelector } from "react-redux";
import {selectUserChecked,checkAuthAsync,selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { PageNotFound } from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import {positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'; 
import StripeCheckout from "./pages/StripeCheckout";


const options = {
  timeout: 3000,
  position: positions.TOP_RIGHT
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkOutPage",
    element: (
      <Protected>
        <CheckOut />
      </Protected>
    ),
  },
  {
    path: "/products/:id",
    element: <ProductDetailsPage />,
  },
  {
    path: "/products/:id",
    element: <AdminProductDetailPage />,
  },
  { path: '/order-success/:id',
  element: (
    <Protected>
      <OrderSuccessPage></OrderSuccessPage>{' '}
    </Protected>
  )},
 
  {
    path: "/my-orders",
    element:(<Protected>
     <UserOrdersPage />{''}
     </Protected>)
    
  },
  {
    path: "/profile",
    element:(<Protected>
      <UserProfilePage></UserProfilePage>{' '}
    </Protected>),
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/stripe-checkout/",
    
    element: (<Protected>
      <StripeCheckout />
      </Protected>)
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {userChecked && <AlertProvider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </AlertProvider>}
    </div>
  );
}

export default App;
