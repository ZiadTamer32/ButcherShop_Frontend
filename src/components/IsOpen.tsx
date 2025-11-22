import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const IsOpen = ({ children }: { children: React.ReactNode }) => {
  // const [time, setTime] = useState<number | null>(null);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const currentHour = new Date().getHours();
  //   setTime(currentHour);
  //   if (currentHour < 7 || currentHour > 23) {
  //     navigate("/");
  //     toast.error("المحل مغلق حالياً. ساعات العمل من 7 صباحاً حتى 11 مساءً.");
  //   }
  // }, [navigate]);

  // const isOpen = time !== null && time >= 7 && time <= 23;
  const isOpen = true;
  return isOpen ? <>{children}</> : null;
};

export default IsOpen;
