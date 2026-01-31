import axios from "axios";
import { useEffect, useState, useContext } from "react"; // 1. ضفنا useContext
import { Link } from "react-router-dom";
import { Star, ShoppingBag, RefreshCw, Package, Search } from "lucide-react"; // 2. ضفنا Search
import Loader from "../components/ui/Loader";
import { CartContext } from "../components/context/CartContext"; // 3. استدعاء الكارت

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // State للبحث
  const [searchQuery, setSearchQuery] = useState("");

  // استدعاء دالة الإضافة من الكارت
  const { addToCart } = useContext(CartContext);

  // معادلة الفلترة (بتشتغل أوتوماتيك مع كل حرف يتكتب)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get("https://dummyjson.com/products");
      setProducts(res.data.products);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const calculateOriginalPrice = (price, discountPercentage) => {
    return (price / (1 - discountPercentage / 100)).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-red-50 to-orange-50 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-red-600 text-2xl font-bold mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={getProducts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header Section with Search */}
      <section className="bg-linear-to-br from-slate-900 to-slate-800 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black">All Products</h1>
              <p className="text-lg text-slate-300">
                Explore our collection of {products.length} premium products
              </p>
            </div>

            {/* مربع البحث الجديد */}
            <div className="w-full md:w-96 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-12 md:py-20 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* بنستخدم filteredProducts بدل products */}
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <div className="group bg-white rounded-3xl border-2 border-slate-100 hover:border-blue-200 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer h-full flex flex-col hover:-translate-y-2">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-slate-50">
                      <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-4 right-4 bg-linear-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-xl">
                          -{product.discountPercentage.toFixed(0)}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col p-6">
                      <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>

                      <p className="text-sm text-slate-500 font-semibold mb-4">
                        {product.brand || "Premium Brand"}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < Math.round(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-slate-200 text-slate-200"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-700">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-3xl font-black text-slate-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="text-lg text-slate-400 line-through font-semibold">
                              $
                              {calculateOriginalPrice(
                                product.price,
                                product.discountPercentage,
                              )}
                            </span>
                          )}
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // مهم: عشان ميفتحش صفحة التفاصيل
                            addToCart(product); // الإضافة للسلة
                            // toast.success("Added!"); // لو مركب توست
                          }}
                          className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-3 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl group-hover:scale-105"
                        >
                          <ShoppingBag size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            // رسالة لو مفيش منتجات
            <div className="text-center py-20">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                We couldn't find any products matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
