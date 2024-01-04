import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Forget from "./pages/Auth/Forget";
import Reset from "./pages/Auth/Reset";
import Sidebar from "./components/sidebar/Sidebar"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authServices";
import { SET_LOGIN } from "./Redux/features/auth/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import UpdateProduct from "./pages/updateProduct/UpdateProduct";
import Profile from "./pages/userProfile/Profile";
import EditProfile from "./pages/userProfile/EditProfile";
import Contact from "./pages/contact/Contact";


axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function logInStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status))
    }
    logInStatus();
  }, [dispatch])


  return (
    <div >
      <Router>
        <ToastContainer />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetPassword" element={<Forget />} />
          <Route path="/resetPassword/:resetToken" element={<Reset />} />

          <Route path="/dashboard" element={
            <Sidebar >
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          } />
          <Route path="/add-product" element={
            <Sidebar >
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          } />
          <Route path="/product-detail/:id" element={
            <Sidebar >
              <Layout>
                <ProductDetails />
              </Layout>
            </Sidebar>
          } />
          <Route path="/product-update/:id" element={
            <Sidebar >
              <Layout>
                <UpdateProduct />
              </Layout>
            </Sidebar>
          } />
          <Route path="/profile" element={
            <Sidebar >
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          } />
          <Route path="/edit-profile" element={
            <Sidebar >
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          } />
          <Route path="/contact-us" element={
            <Sidebar >
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
