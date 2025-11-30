import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Loader } from "lucide-react";

interface IProps {
  title: string;
  value: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  revenue?: number;
  isLoading: boolean;
}

function StatCard({ icon: Icon, title, value, isLoading, revenue }: IProps) {
  return (
    <>
      <Card className="gradient-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon && <Icon className="h-6 w-6 text-muted-foreground" />}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            {isLoading ? <Loader className="animate-spin w-6 h-6" /> : value}
          </div>
          {revenue && (
            <p className="text-sm text-muted-foreground mt-1">
              {Math.ceil(revenue).toLocaleString()} ج.م
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default StatCard;
