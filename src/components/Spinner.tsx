import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="bg-background min-h-[calc(100vh-70px)] flex items-center justify-center">
      <Loader className="animate-spin size-16 text-primary" />
    </div>
  );
};

export default Spinner;
