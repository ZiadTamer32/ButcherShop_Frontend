/* eslint-disable react-hooks/exhaustive-deps */
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useClearCart from "../featuers/cart/useClearCart";

const ThankyouPage = () => {
  const [timer, setTimer] = useState(7);
  const navigate = useNavigate();
  const { clearCart } = useClearCart();

  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      navigate("/products");
    }
  }, [timer, navigate]);

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white px-4 md:px-12 py-6 md:py-12 rounded-2xl shadow-lg text-center">
        <div className="w-24 h-24 gradient-hero rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-16 h-16 text-primary-foreground" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-primary mb-4">
          شكراً لطلبك!
        </h1>
        <p className="text-lg sm:text-2xl text-muted-foreground font-semibold">
          تم استلام طلبك بنجاح وسنتواصل معك قريباً
        </p>
        <div className="bg-secondary rounded-lg p-4 mt-4 shadow-sm">
          <p className="text-sm md:text-lg text-muted-foreground">
            سيتم تحويلك إلى صفحة المنتجات خلال
            <span className="text-xl font-bold text-primary mx-1">{timer}</span>
            ثواني
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankyouPage;
