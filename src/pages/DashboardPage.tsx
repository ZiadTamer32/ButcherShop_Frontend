import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";
import AllOrders from "../featuers/admin/AllOrders";
import AllProducts from "../featuers/admin/AllProducts";
import useUser from "../featuers/admin/useUser";
import useLogout from "../featuers/admin/useLogout";
import Spinner from "../components/Spinner";
import Stats from "../featuers/admin/Stats";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isPending } = useUser();
  const { logout, isLoggingOut } = useLogout();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "products"
  );

  const tabs = [
    { label: "الطلبات", value: "orders" },
    { label: "المنتجات", value: "products" },
  ];

  useEffect(() => {
    setActiveTab(searchParams.get("tab") || "products");
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  if (isPending) {
    return <Spinner />;
  }

  // If no user, show login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
            لوحة التحكم
          </h1>
          <p className="text-muted-foreground text-sm sm:text-lg">
            إدارة ومتابعة جميع الطلبات والمنتجات
          </p>
        </div>
        <Button
          variant="destructive"
          disabled={isLoggingOut}
          onClick={() =>
            logout(undefined, {
              onSuccess: () => {
                navigate("/login");
              },
            })
          }
        >
          {isLoggingOut ? (
            <Loader className="animate-spin size-4" />
          ) : (
            "تسجيل خروج"
          )}
        </Button>
      </div>
      {/* Stats */}
      <Stats />
      {/* Tabs */}
      <div
        className="w-full sm:w-auto sm:max-w-md bg-gray-100 p-2 rounded-md flex gap-4 justify-between items-center text-center"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`${
              activeTab === tab.value
                ? "bg-white shadow-md"
                : "text-muted-foreground"
            } px-4 py-2 rounded-md basis-1/2`}
            role="tab"
            aria-selected={activeTab === tab.value}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "orders" && <AllOrders />}
      {activeTab === "products" && <AllProducts />}
    </div>
  );
};

export default DashboardPage;
