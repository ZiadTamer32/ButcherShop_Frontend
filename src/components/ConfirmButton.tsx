import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";

interface ConfirmButtonProps {
  isOpen: boolean;
  isCreating: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
}

const ConfirmButton = ({
  isOpen,
  isCreating,
  setIsOpen,
  onConfirm,
}: ConfirmButtonProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            تأكيد الطلب
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="sr-only">
          تأكيد الطلب من السلة
        </DialogDescription>

        <p className="font-semibold text-xl">هل أنت متأكد من طلبك؟</p>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
          >
            تراجع
          </Button>
          <Button
            type="submit"
            disabled={isCreating}
            onClick={() => {
              onConfirm();
            }}
          >
            {isCreating ? <Loader className="size-4 animate-spin" /> : "تأكيد"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmButton;
