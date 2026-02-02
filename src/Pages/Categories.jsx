import { useEffect, useState } from "react";
import { Package, RefreshCw, TrendingUp, ArrowRight } from "lucide-react";
import Loader from "../components/ui/Loader";
import axios from "axios";
import { Link } from "react-router-dom";

/**
 * Categories Page Component.
 * Fetches and displays all available product categories.
 * Each category card shows a dynamic image from one of its products.
 */
function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categoriesRes = await axios.get(
        "https://dummyjson.com/products/categories"
      );

      const categoriesWithImages = await Promise.all(
        categoriesRes.data.map(async (category) => {
          try {
            const productsRes = await axios.get(
              `https://dummyjson.com/products/category/${category.slug}?limit=1`
            );
            return {
              ...category,
              image: productsRes.data.products[0]?.thumbnail || null,
            };
          } catch (err) {
            console.error(err);
            return { ...category, image: null };
          }
        })
      );

      setCategories(categoriesWithImages);
    } catch (err) {
      setError(err.message || "Failed to load categories");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
            onClick={fetchCategories}
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 px-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No categories found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Header Section */}
      <section className="bg-linear-to-br from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <span className="text-blue-300 font-semibold">
              Shop by Category
            </span>
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-black">All Categories</h1>
            <p className="text-xl text-slate-300">
              Explore {categories.length} premium categories
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={`${category.slug}-${index}`}
                to={`/categories/${category.slug}`}
              >
                <div className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-80 cursor-pointer hover:-translate-y-2">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="text-3xl font-black mb-2 capitalize transform group-hover:translate-y-0 transition-transform">
                      {category.name}
                    </h3>
                    <p className="text-sm font-semibold text-white/90 mb-4">
                      Products in this category
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
    </div>
  );
}

export default Categories;
