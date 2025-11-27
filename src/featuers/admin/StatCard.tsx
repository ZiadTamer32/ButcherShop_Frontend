import { Loader } from "lucide-react";

interface IProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  revenue?: number;
  color: "blue" | "green" | "yellow" | "indigo" | "red" | "purple";
  isLoading?: boolean;
}

function StatCard({
  icon: Icon,
  title,
  value,
  color,
  isLoading,
  revenue,
}: IProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    indigo: "bg-indigo-100 text-indigo-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  };

  const iconColorClass = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-primary-foreground border border-border rounded-lg p-6 grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-6 gap-y-1">
      <div
        className={`row-span-2 aspect-square rounded-full flex items-center justify-center ${iconColorClass}`}
      >
        {Icon && <Icon className="w-8 h-8" />}
      </div>
      <h5 className="self-end text-lg uppercase tracking-wide font-semibold text-muted-foreground">
        {title}
      </h5>
      <div className="space-y-2">
        <p className="text-2xl leading-none font-medium">
          {isLoading ? <Loader className="animate-spin w-6 h-6" /> : value}
        </p>
        {revenue && (
          <h5 className="self-end text-lg uppercase tracking-wide font-semibold text-green-700">
            {Math.ceil(revenue).toLocaleString()} ج.م
          </h5>
        )}
      </div>
    </div>
  );
}

export default StatCard;
