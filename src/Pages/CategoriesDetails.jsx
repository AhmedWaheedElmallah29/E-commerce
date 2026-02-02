import Loader from "@/components/ui/Loader";
import axios from "axios";
import { Package, RefreshCw } from "lucide-react";
import { useContext, useEffect, useState } from "react"; // 1. ضفنا useContext
import { FaCartPlus, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../components/context/CartContext"; // 2. استيراد الكونتكست
import { notifications } from "@mantine/notifications"; // 3. استيراد الإشعارات
import { IconCheck } from "@tabler/icons-react";

function CategoriesDetails() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 4. استخدام دالة الإضافة من الكونتكست
  const { addToCart } = useContext(CartContext);

  async function getProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`,
      );
      setProducts(res.data.products);
    } catch (err) {
      setError(err.message || "Failed to load categories");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [category]); // يفضل إضافة category للـ dependencies

  const calculateOriginalPrice = (price, discountPercentage) => {
    return (price / (1 - discountPercentage / 100)).toFixed(2);
  };

  // 👇 5. دالة التعامل مع إضافة المنتج (UX Logic)
  const handleAddToCart = (e, product) => {
    e.preventDefault(); // 🛑 أهم سطر: بيمنع اللينك إنه يفتح صفحة المنتج

    addToCart(product, 1); // إضافة للسلة

    // إظهار إشعار النجاح
    notifications.show({
      title: "Added to Cart",
      message: `${product.title} has been added!`,
      color: "green",
      icon: <IconCheck size={18} />,
      autoClose: 2000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-red-50 to-orange-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-red-600 text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={getProducts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">No Products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {category.toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group block h-full">
            <Link to={`/products/${product.id}`}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden cursor-pointer">
                {/* ... الجزء الخاص بالصورة زي ما هو ... */}
                <div className="relative w-full h-48 bg-gray-50 flex items-center justify-center p-4">
                  {product.discountPercentage >= 1 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                      -{Math.round(product.discountPercentage)}%
                    </span>
                  )}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="object-contain h-full w-full mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-4 flex flex-col grow">
                  {/* ... التقييم والعنوان والوصف زي ما هو ... */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center text-yellow-400 text-xs font-bold">
                      <FaStar className="mr-1" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h5
                    className="text-lg font-bold text-gray-800 mb-1 truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h5>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 grow">
                    {product.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xl font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.discountPercentage >= 1 && (
                        <small className="line-through text-gray-400 text-sm">
                          $
                          {calculateOriginalPrice(
                            product.price,
                            product.discountPercentage,
                          )}
                        </small>
                      )}
                    </div>

                    {/* 👇 6. ربط الزرار بالدالة الجديدة */}
                    <button
                      className="w-full border border-blue-600 text-blue-600 font-bold py-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 text-sm z-20 relative"
                      onClick={(e) => handleAddToCart(e, product)}
                      aria-label={`Add ${product.title} to cart`}
                    >
                      <FaCartPlus />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesDetails;
