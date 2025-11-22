import { useState } from "react";
import { Loader, Pen } from "lucide-react";
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
import { Checkbox } from "../../components/ui/checkbox";
import type { Product } from "@/types";
import useEditProduct from "./useEditProduct";

const EditProduct = ({ product }: { product: Product }) => {
  const { register, handleSubmit, control, setValue } = useForm<Product>({
    defaultValues: {
      _id: product._id,
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0,
      category: product.category || "beef",
      image: product.image || undefined,
      isAvailable: product.isAvailable || false,
    },
  });

  const { editProduct, isEditing } = useEditProduct();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = (data: Product) => {
    editProduct(data, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full basis-1/2" variant="outline">
          <Pen className="size-4" />
          تعديل
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            تعديل منتج
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          نموذج تعديل منتج
        </DialogDescription>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* الاسم */}
          <div>
            <label className="block text-sm font-medium mb-1">اسم المنتج</label>
            <Input type="text" placeholder="اسم المنتج" {...register("name")} />
          </div>

          {/* الوصف */}
          <div>
            <label className="block text-sm font-medium mb-1">الوصف</label>
            <Textarea
              rows={3}
              placeholder="الوصف"
              {...register("description")}
            />
          </div>

          {/* السعر والفئة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">السعر</label>
              <Input
                type="number"
                placeholder="السعر"
                {...register("price", { valueAsNumber: true })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الفئة</label>
              <Controller
                name="category"
                control={control}
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
          {/* متوفر */}
          <div className="flex items-center gap-3 mb-4">
            <Controller
              name="isAvailable"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="isAvailable"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <label htmlFor="isAvailable">المنتج متوفر للبيع</label>
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
            <Button type="submit" disabled={isEditing}>
              {isEditing ? <Loader className="animate-spin" /> : "تعديل"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
