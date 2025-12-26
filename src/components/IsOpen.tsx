import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const IsOpen = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();
    setTime(currentHour);
    if (currentHour < 9 || currentHour > 18) {
      navigate("/");
      toast.error("المحل مغلق حالياً. ساعات العمل من 9 صباحاً حتى 6 مساءً.");
    }
  }, [navigate]);

  const isOpen = time !== null && time >= 9 && time <= 18;
  return isOpen ? <>{children}</> : null;
};

export default IsOpen;
