import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { CheckCircle, Info, XCircle } from "lucide-react";
import Applayout from "./components/Applayout";
import IsOpen from "./components/IsOpen";
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ConfirmPage = lazy(() => import("./pages/ConfirmPage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ThankyouPage = lazy(() => import("./pages/ThankyouPage"));

function App() {
  const reactQuery = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={reactQuery}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<Applayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/products"
              element={
                <IsOpen>
                  <ProductsPage />
                </IsOpen>
              }
            />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/confirm"
              element={
                <IsOpen>
                  <ConfirmPage />
                </IsOpen>
              }
            />
            <Route path="/order/:orderId" element={<OrderPage />} />
            <Route
              path="/thankyou"
              element={
                <IsOpen>
                  <ThankyouPage />
                </IsOpen>
              }
            />
            <Route path="/*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-left"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#fff",
            color: "#000",
            padding: "10px 16px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            direction: "rtl",
            border: "1px solid #eee",
          },
          success: {
            icon: <CheckCircle color="green" />,
          },
          error: {
            icon: <XCircle color="red" />,
          },
          blank: {
            icon: <Info color="blue" />,
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
