import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Filter, Search } from "lucide-react";
import Loader from "../components/ui/Loader";
import { CartContext } from "../components/context/CartContext";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconThumbUp, IconX } from "@tabler/icons-react";

/**
 * Products Page Component.
 * Allows users to:
 * - View a list of products.
 * - Search products by title.
 * - Filter by category and price.
 * - Add products to cart.
 */
function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);

  const { addToCart } = useContext(CartContext);

  // Extract unique categories from products
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Combined Filtering Logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://dummyjson.com/products?limit=0");
      setProducts(res.data.products);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Fetches products from API on mount.
   */
  useEffect(() => {
    getProducts();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error)
    return <div className="text-center p-10 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header & Controls Section */}
      <section className="bg-linear-to-br from-slate-900 to-slate-800 text-white pt-12 pb-24 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Title & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <h1 className="text-4xl font-black">Shop Now</h1>
            <div className="w-full md:w-96 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Filters Area */}
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 flex flex-col lg:flex-row gap-8">
            {/* 1. Category Filter Buttons */}
            <div className="flex-1 overflow-hidden">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Filter size={16} /> Categories
              </h3>

              {/* Horizontal Scrollable Categories */}
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mask-image-linear-gradient-to-r">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold capitalize whitespace-nowrap shrink-0 transition-all ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-white/10 text-slate-300 hover:bg-white/20"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Filter Slider */}
            <div className="w-full lg:w-72 shrink-0 lg:border-l lg:border-white/10 lg:pl-8">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  Max Price
                </h3>
                <span className="bg-blue-600 px-3 py-1 rounded-lg text-sm font-bold">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>$0</span>
                <span>$2000+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 -mt-16 relative z-10 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                    {/* Image */}
                    <div className="relative aspect-square bg-slate-50 p-6">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                          -{Math.round(product.discountPercentage)}%
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="text-xs font-bold text-blue-600 uppercase mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">
                        {product.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-2xl font-black text-slate-900">
                          ${product.price}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
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
                          className="bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white p-3 rounded-xl transition-all"
                        >
                          <ShoppingBag size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
              <p className="text-xl text-slate-400 font-medium">
                No products match your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                  setMaxPrice(2000);
                }}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
