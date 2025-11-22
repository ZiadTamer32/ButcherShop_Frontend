import { Button } from "../components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">حدث خطأ غير متوقع</h2>

      <p className="text-gray-600 text-sm max-w-md mb-4">
        {error?.message || "Something went wrong."}
      </p>

      <Button onClick={resetErrorBoundary} className="mt-2">
        إعادة المحاولة
      </Button>
    </div>
  );
}
