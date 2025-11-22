import { useState, useMemo } from "react";
import { ProductCard } from "../components/ProductCard";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import type { CartItemLocalStorage, Product } from "@/types";
import useGetProducts from "../featuers/admin/useGetProducts";
import Spinner from "../components/Spinner";

// Products page component - displays product catalog with filtering and search
const Products = () => {
  // Fetch all products from API
  const { products, isPending } = useGetProducts();

  // React Router hook to manage URL search parameters (for search and category)
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for search input - initialized from URL params if exists
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  // Get category filter from URL params, default to "all"
  const categoryFilter = searchParams.get("category") || "all";

  // Extract products array from API response
  const allProducts = products?.data?.data;

  // Memoized filtered products based on search term and category
  // Only recalculates when dependencies change (searchTerm, categoryFilter, allProducts)
  const filteredProducts = useMemo(() => {
    return allProducts?.filter((product: Product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter, allProducts]);

  // Category filter buttons configuration - available product categories
  const categoryButtons = [
    { label: "الكل", value: "all" },
    { label: "ضاني", value: "lamb" },
    { label: "كندوز", value: "beef" },
  ];

  // Handle search input change - updates local state and URL params
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchParams({ category: categoryFilter, search: e.target.value });
  };

  // Clear search term and reset URL params
  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({ category: categoryFilter });
  };

  // Show loading spinner while fetching products
  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="min-h-[calc(100vh-70px)] bg-background">
      <div className="container px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-3">
            منتجاتنا
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground">
            اختر من مجموعة متنوعة من اللحوم الطازجة عالية الجودة
          </p>
        </div>

        {/* Filters Section - Search and Category */}
        <div className="mb-8 gradient-card p-4 md:p-6 rounded-xl shadow-soft">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl sm:text-3xl font-bold text-foreground">
              فلترة المنتجات
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-6">
            {/* Search Input Field */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-foreground mb-2">
                بحث
              </label>
              <div className="relative">
                {/* Search icon inside input */}
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ابحث عن المنتج..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pr-10"
                />
                {/* Clear button - only shows when search term exists */}
                {searchTerm && (
                  <Button
                    size={"sm"}
                    variant="destructive"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full h-0 w-0"
                    onClick={handleClearSearch}
                  >
                    <X />
                  </Button>
                )}
              </div>
            </div>

            {/* Category Filter Buttons */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                الفئة
              </label>
              <div className="grid grid-cols-2 md:flex gap-2">
                {categoryButtons.map((cat, index) => (
                  <Button
                    key={index}
                    // Use default style if category is selected, outline otherwise
                    variant={
                      categoryFilter === cat.value ? "default" : "outline"
                    }
                    // Update URL params with selected category
                    onClick={() =>
                      setSearchParams({
                        category: cat.value,
                        search: searchTerm,
                      })
                    }
                    // Make "كندوز" button span 2 columns on mobile
                    className={`${cat.label === "كندوز" ? "col-span-2" : ""}`}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid - Display filtered products or empty state */}
        {filteredProducts?.length > 0 ? (
          // Responsive grid layout: 2 columns on mobile, 3 on tablet, 4 on desktop
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen">
            {filteredProducts?.map((product: CartItemLocalStorage) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          // Empty state message when no products match filters
          <div className="text-center py-20">
            <p className="text-2xl sm:text-4xl font-semibold text-muted-foreground">
              لا توجد منتجات متوفرة
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
