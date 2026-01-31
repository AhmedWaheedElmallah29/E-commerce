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
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <CartProvider>
        <NavBar />
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productID" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<CategoriesDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
