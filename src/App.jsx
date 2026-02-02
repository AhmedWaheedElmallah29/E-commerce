import { Route, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Categories from "./Pages/Categories";
import SignUp from "./Pages/SignUp";
import Signin from "./Pages/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import ProductDetails from "./Pages/ProductDetails";
import CategoriesDetails from "./Pages/CategoriesDetails";
import CartProvider from "./components/context/CartContext";
import Cart from "./Pages/Cart";
import ScrollToTop from "./components/ScrollToTop";
import AuthProvider from "./components/context/AuthContext";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./Pages/Checkout";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
          <NavBar />
          <Notifications position="top-center" zIndex={1000} />
          <ScrollToTop />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productID" element={<ProductDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/categories/:category"
              element={<CategoriesDetails />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
