import { useState } from "react";
import { Loader, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "../../components/ui/dialog";
import { useForm, Controller } from "react-hook-form";
import type { Product } from "@/types";
import useAddProduct from "./useAddProduct";
const AddProduct = () => {
  const { addProduct, isAdding } = useAddProduct();
  const { register, handleSubmit, control, reset, setValue } =
    useForm<Product>();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: Product) => {
    addProduct(data, {
      onSuccess: () => {
        setIsOpen(false);
        reset();
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="font-bold text-xl p-4 mt-4 flex items-center gap-2 w-full justify-center sm:w-auto">
          إضافة منتج جديد <Plus className="mt-[2px]" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            إضافة منتج جديد
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          description goes here
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* اسم المنتج */}
          <div>
            <label className="block text-sm font-medium mb-1">اسم المنتج</label>
            <Input type="text" placeholder="اسم المنتج" {...register("name")} />
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-sm font-medium mb-1">الوصف</label>
            <Textarea
              rows={3}
              placeholder="وصف المنتج"
              {...register("description")}
            />
          </div>

          {/* السعر والفئة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">السعر</label>
              <Input
                type="number"
                placeholder="سعر المنتج"
                {...register("price")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الفئة</label>
              <Controller
                name="category"
                control={control}
                // rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beef">لحم بقري</SelectItem>
                      <SelectItem value="lamb">لحم غنم</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* الصورة */}
          <div>
            <label className="block text-sm font-medium mb-1">الصورة</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setValue("image", file);
                }
              }}
            />
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? <Loader className="animate-spin" /> : "حفظ"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
