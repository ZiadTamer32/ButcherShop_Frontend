import { useState } from "react";
import { Loader, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import { useLocation } from "react-router-dom";
import useDeleteProduct from "../featuers/admin/useDeleteProduct";
import useDeleteCart from "../featuers/cart/useDeleteCart";

const DeleteButton = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { deleteProduct, isDeleting } = useDeleteProduct();
  const { deleteCart, isDeletingCart } = useDeleteCart();

  const isLoading = isDeleting || isDeletingCart;

  const handleDelete = () => {
    if (location.pathname === "/dashboard") {
      deleteProduct(id, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    } else {
      const productId = id;
      deleteCart(productId, {
        onSuccess: () => {
          setIsOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={`${location.pathname === "/dashboard" ? "basis-1/2" : ""}`}
          size={`${location.pathname === "/dashboard" ? "default" : "icon"}`}
          variant="destructive"
        >
          <Trash className="size-4" />
          {location.pathname === "/dashboard" ? "حذف " : ""}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            تأكيد الحذف
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          تأكيد حذف المنتج من القائمة
        </DialogDescription>

        <p className="font-semibold text-xl">
          {location.pathname === "/dashboard"
            ? "هل أنت متأكد من حذف هذا المنتج نهائيا؟"
            : "هل أنت متأكد؟"}
        </p>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            تراجع
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isDeleting}
          >
            {isLoading ? <Loader className="animate-spin" /> : "حذف"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
