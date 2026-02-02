import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader";
import {
  Star,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  Package,
  RefreshCw,
  Zap,
} from "lucide-react";
import { CartContext } from "../components/context/CartContext";
import { notifications } from "@mantine/notifications";
import { IconThumbUp } from "@tabler/icons-react";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { productID } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const getProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${productID}`,
      );
      setProduct(res.data);
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productID]);

  // Handle "Buy Now" direct checkout flow
  // Handle "Buy Now" direct checkout flow
  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product: product,
        quantity: quantity,
      },
    });
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
            onClick={getProduct}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);
  const hasDiscount = product.discountPercentage > 1;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header with Breadcrumb */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-sm text-slate-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900 font-semibold">
              {product.title}
            </span>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
              {/* Product Images Section */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative bg-linear-to-br from-slate-50 to-slate-100 rounded-3xl overflow-hidden shadow-lg group">
                  <img
                    src={images[selectedImage]}
                    alt={product.title}
                    className="w-full h-96 object-contain p-8 transition-transform duration-500 group-hover:scale-110"
                  />
                  {hasDiscount && (
                    <div className="absolute top-4 right-4 bg-linear-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-2xl font-black text-lg shadow-lg">
                      -{Math.round(product.discountPercentage)}%
                    </div>
                  )}
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                          selectedImage === idx
                            ? "ring-4 ring-blue-500 shadow-lg scale-110"
                            : "ring-2 ring-slate-200 hover:ring-blue-300 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="flex flex-col">
                {/* Category Badge */}
                <div className="inline-flex items-center w-fit bg-linear-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                  {product.category}
                </div>

                {/* Product Title */}
                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                  {product.title}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.round(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-slate-200 text-slate-200"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-slate-700">
                    {product.rating.toFixed(1)} ({product.reviews?.length || 0}{" "}
                    reviews)
                  </span>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <Check className="w-5 h-5" />
                    {product.stock} In Stock
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-slate-700 leading-relaxed mb-8 border-l-4 border-blue-500 pl-4 bg-blue-50 p-4 rounded-r-lg">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8">
                  {hasDiscount && (
                    <div className="flex items-center gap-3 mb-3">
                      <span className="line-through text-slate-400 text-2xl font-bold">
                        ${originalPrice}
                      </span>
                      <span className="bg-linear-to-r from-red-500 to-pink-600 text-white px-4 py-1 rounded-xl text-sm font-black shadow-lg">
                        Save ${(originalPrice - product.price).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-slate-500 text-lg">Final Price</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-slate-900 font-bold mb-4 text-lg">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-slate-300 rounded-2xl overflow-hidden shadow-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xl transition-colors"
                      >
                        −
                      </button>
                      <span className="px-8 py-3 bg-white font-bold text-xl text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(Math.min(product.stock, quantity + 1))
                        }
                        className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xl transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-slate-600 font-semibold">
                      Total:{" "}
                      <span className="font-black text-blue-600 text-2xl">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      notifications.show({
                        title: "Added to Cart!",
                        message: "Check your cart now.",
                        color: "blue",
                        icon: <IconThumbUp size={18} />,
                        radius: "md",
                        withBorder: true,
                        autoClose: 3000,
                      });
                    }}
                    className="flex-1 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group"
                  >
                    <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </button>

                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    <Zap className="w-6 h-6" />
                    Buy Now
                  </button>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-2xl">
                    <Truck className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Free Shipping</p>
                      <p className="text-sm text-slate-600">Orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-linear-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl">
                    <RotateCcw className="w-6 h-6 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">Easy Returns</p>
                      <p className="text-sm text-slate-600">Within 30 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-linear-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                    <Check className="w-6 h-6 text-purple-600 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-900">
                        Quality Guarantee
                      </p>
                      <p className="text-sm text-slate-600">
                        Authentic products
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
