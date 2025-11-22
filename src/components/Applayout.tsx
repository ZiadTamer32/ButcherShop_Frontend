import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./NavBar";
import { Helmet } from "react-helmet-async";

const Applayout = () => {
  const location = useLocation();
  const path = location.pathname;

  const titles: Record<string, string> = {
    "/": "الرئيسية - جزارة أولاد حسن سيد الحداد",
    "/products": "منتجات - جزارة أولاد حسن سيد الحداد",
    "/dashboard": "لوحة التحكم - جزارة أولاد حسن سيد الحداد",
    "/login": "تسجيل الدخول - جزارة أولاد حسن سيد الحداد",
    "/confirm": "تأكيد الطلب - جزارة أولاد حسن سيد الحداد",
    "/thankyou": "نجاح الطلب - جزارة أولاد حسن سيد الحداد",
  };

  const title = titles[path] || "جزارة أولاد حسن سيد الحداد";

  return (
    <main>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={window.location.href} />
      </Helmet>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default Applayout;
