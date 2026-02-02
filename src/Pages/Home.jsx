import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Package,
  Sparkles,
  Star,
  ShoppingBag,
  Zap,
  Shield,
  Truck,
  Heart,
  TrendingUp,
  Award,
} from "lucide-react";
import { CartContext } from "../components/context/CartContext";
import { notifications } from "@mantine/notifications";
import { IconThumbUp } from "@tabler/icons-react";

function Home() {
  const { addToCart } = useContext(CartContext);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured products
        const productsRes = await fetch(
          "https://dummyjson.com/products?limit=8", // خليتها 8 عشان الشكل يبقى متناسق (4 فوق و 4 تحت)
        );
        const productsData = await productsRes.json();
        setFeaturedProducts(productsData.products);

        // Fetch categories
        const categoriesRes = await fetch(
          "https://dummyjson.com/products/categories",
        );
        const categoriesData = await categoriesRes.json();

        // Get product images for each category
        const categoriesWithImages = await Promise.all(
          categoriesData.slice(0, 4).map(async (category) => {
            try {
              const catProductRes = await fetch(
                `https://dummyjson.com/products/category/${category.slug}?limit=1`,
              );
              const catProductData = await catProductRes.json();
              return {
                name:
                  category.name.charAt(0).toUpperCase() +
                  category.name.slice(1),
                slug: category.slug,
                image:
                  catProductData.products?.[0]?.thumbnail ||
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
                count: `${Math.floor(Math.random() * 300) + 50}+ Products`,
                linear: [
                  "from-blue-600/90 to-cyan-600/90",
                  "from-pink-600/90 to-rose-600/90",
                  "from-green-600/90 to-emerald-600/90",
                  "from-purple-600/90 to-fuchsia-600/90",
                ][categoriesData.indexOf(category) % 4], // % 4 عشان لو الاندكس زاد ميديناش ايرور
              };
            } catch (err) {
              console.error("Error fetching category image:", err);
              return {
                name: category.name,
                slug: category.slug,
                image: "https://via.placeholder.com/600x400",
                count: "50+ Products",
                linear: "from-slate-600/90 to-slate-600/90",
              };
            }
          }),
        );
        setCategories(categoriesWithImages);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
      linear: "from-cyan-500 via-blue-500 to-indigo-600",
      glow: "group-hover:shadow-cyan-500/50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure transactions",
      linear: "from-emerald-500 via-green-500 to-teal-600",
      glow: "group-hover:shadow-emerald-500/50",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "2-3 days delivery",
      linear: "from-orange-500 via-amber-500 to-yellow-600",
      glow: "group-hover:shadow-orange-500/50",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "Premium products",
      linear: "from-purple-500 via-fuchsia-500 to-pink-600",
      glow: "group-hover:shadow-purple-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-linear-to-br from-indigo-950 via-purple-900 to-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -bottom-40 right-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-white">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-2xl shadow-2xl">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold bg-linear-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Trending Now • 2024 Collection
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-snug tracking-tight">
                  <span className="block text-white">Shop</span>
                  <span className="block bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Everything
                  </span>
                </h1>
                <div className="h-1.5 w-32 bg-linear-to-r from-cyan-400 to-blue-600 rounded-full shadow-lg shadow-cyan-500/50"></div>
              </div>

              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light max-w-xl">
                Discover premium products at{" "}
                <span className="font-bold text-cyan-400">
                  unbeatable prices
                </span>
                . Your one-stop destination for quality shopping.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/products" className="w-full sm:w-auto">
                  <button className="group relative w-full sm:w-auto bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/70 hover:-translate-y-1">
                    <span className="flex items-center justify-center gap-3">
                      Shop Now
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </button>
                </Link>
                <Link to="/categories" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300">
                    Browse Categories
                  </button>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { label: "Products", value: "10K+" },
                  { label: "Customers", value: "50K+" },
                  { label: "Reviews", value: "4.9★" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-black text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-80 h-96">
                    {/* Card 1 */}
                    <div className="absolute top-0 right-0 w-64 h-80 bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform rotate-6 hover:rotate-12 transition-transform duration-500">
                      <div className="w-full h-48 bg-linear-to-br from-cyan-400 to-blue-600 rounded-2xl mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-white/30 rounded-full w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded-full w-1/2"></div>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="absolute top-10 left-0 w-64 h-80 bg-linear-to-br from-white/20 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform -rotate-6 hover:-rotate-12 transition-transform duration-500">
                      <div className="w-full h-48 bg-linear-to-br from-purple-400 to-pink-600 rounded-2xl mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-white/30 rounded-full w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded-full w-1/2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 -mt-1 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white/80 backdrop-blur-xl border border-slate-200/50 p-8 rounded-3xl hover:bg-white transition-all duration-500 shadow-lg hover:shadow-2xl ${feature.glow} hover:-translate-y-2`}
              >
                <div
                  className={`w-16 h-16 bg-linear-to-br ${feature.linear} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  <feature.icon
                    className="w-8 h-8 text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              <TrendingUp className="w-4 h-4" />
              Popular Collections
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Explore our curated collections and find exactly what you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/categories/${category.slug}`}>
                <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80 cursor-pointer hover:-translate-y-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${category.linear} group-hover:opacity-90 transition-opacity duration-500`}
                  ></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-3xl font-black mb-2 transform group-hover:translate-y-0 transition-transform">
                      {category.name}
                    </h3>
                    <p className="text-sm font-semibold text-white/90 mb-4">
                      {category.count}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Explore Now{" "}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-linear-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm mb-4">
              <Star className="w-4 h-4 fill-current" />
              Bestsellers
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Hand-picked favorites that our customers can't get enough of
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 font-semibold">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-200 rounded-3xl h-96 animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                // ✨ التعديل هنا: غلفنا الكارت بـ Link عشان يوديك للتفاصيل
                <Link key={product.id} to={`/products/${product.id}`}>
                  <div className="group bg-white rounded-3xl border-2 border-slate-100 hover:border-blue-200 overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer h-full flex flex-col hover:-translate-y-2">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-slate-50">
                      <img
                        src={product.thumbnail}
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

                      {/* Price & Cart Button */}
                      <div className="mt-auto">
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="text-3xl font-black text-slate-900">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="text-lg text-slate-400 line-through font-semibold">
                              $
                              {(
                                product.price /
                                (1 - product.discountPercentage / 100)
                              ).toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* ✨ التعديل هنا: منعنا النقل للصفحة عند الضغط على الزرار */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                            notifications.show({
                              title: "Added to Cart!",
                              message: "Check your cart now.",
                              color: "blue", // نفس اللون الأزرق اللي كنت عامله
                              icon: <IconThumbUp size={18} />, // بديل احترافي لـ 👍
                              radius: "md", // عشان الحواف المدورة (rounded)
                              withBorder: true, // عشان يعمل border خفيف زي القديم
                              autoClose: 3000,
                            });
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
          )}

          <div className="flex justify-center mt-16">
            <Link to="/products">
              <button className="group bg-linear-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 flex items-center gap-3">
                View All Products
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-950 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-cyan-400 to-blue-600 rounded-3xl mb-4 shadow-2xl shadow-blue-500/50">
              <Package className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Ready to Start Your
              <br />
              <span className="bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shopping Journey?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light">
              Join our community of satisfied customers and discover amazing
              deals on premium products
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link to="/products">
                <button className="group bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-blue-600/50 hover:shadow-blue-500/70 hover:-translate-y-1">
                  <span className="flex items-center gap-3">
                    Start Shopping
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </Link>
              <Link to="/categories">
                <button className="bg-white/10 backdrop-blur-xl border-2 border-white/30 hover:bg-white/20 hover:border-white/50 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-300">
                  Explore Categories
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
