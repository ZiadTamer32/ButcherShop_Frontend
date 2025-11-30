import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Package, Loader } from "lucide-react";
import { Button } from "./ui/button";
import type { Order } from "@/types";
import useGetCart from "../featuers/cart/useGetCart";
import useGetAllOrdersByUser from "../featuers/orders/useGetAllOrdersByUser";
import AllOrdersByUser from "../featuers/orders/AllOrdersByUser";

export const Navbar = () => {
  // Cart
  const { getCart } = useGetCart();
  const totalItems = Array.isArray(getCart) ? getCart.length : 0;

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Drawer Order
  const { getAllOrdersByUser, isGetting } = useGetAllOrdersByUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Orders
  const orders: Order[] = getAllOrdersByUser?.data?.data ?? [];
  const hasOrders = orders?.length > 0;

  // Location
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-lg md:text-2xl font-bold text-primary hover:text-accent transition-smooth"
          >
            جزارة أولاد حسن الحداد
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              aria-label="Go to products page"
              to="/products"
              className={`${
                location.pathname === "/products"
                  ? "text-primary"
                  : "text-foreground"
              } hover:text-primary transition-smooth font-semibold`}
            >
              المنتجات
            </Link>
            <Button
              variant="outline"
              onClick={() => hasOrders && setIsDrawerOpen(true)}
              disabled={!hasOrders}
              className="relative gap-2"
            >
              {isGetting ? (
                <Loader className="animate-spin size-4" />
              ) : (
                <>
                  <Package className="w-5 h-5" />
                  <span>طلباتي ({orders.length})</span>
                </>
              )}
            </Button>

            <Link to="/confirm" aria-label={`Go to cart, ${totalItems} items`}>
              <Button variant="outline" className="relative gap-2">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <Link to="/confirm" aria-label={`Go to cart, ${totalItems} items`}>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open mobile menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[65px] bg-background border-t border-border shadow-md p-4 flex flex-col gap-3 animate-slideDown">
            <Link
              to="/products"
              aria-label="Go to products page"
              className="text-foreground hover:text-primary transition-smooth font-semibold py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              المنتجات
            </Link>
            <Button
              variant="outline"
              aria-label="My orders"
              onClick={() => {
                setIsDrawerOpen(true);
                setMobileMenuOpen(false);
              }}
              disabled={!hasOrders}
              className="relative gap-2"
            >
              <Package className="w-5 h-5" />
              <span>طلباتي ({orders.length})</span>
            </Button>
          </div>
        )}
      </div>
      {/* Open Drawer */}
      <AllOrdersByUser
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        orders={orders}
      />
    </nav>
  );
};
