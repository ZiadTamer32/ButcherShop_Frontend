import { sliceText } from "../../lib/utils";
import type { Product } from "@/types";
import EditProduct from "./EditProduct";
import DeleteButton from "../../components/DeleteButton";

const Card = ({ product }: { product: Product }) => {
  const imgUrl = `${import.meta.env.VITE_IMAGE_UPLOAD_PATH}/${product.image}`;
  return (
    <div className="gradient-card rounded-xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth border border-border">
      <div className="overflow-hidden">
        <img
          loading="lazy"
          src={imgUrl || ""}
          alt={product.name || ""}
          className="w-full h-64 object-cover hover:scale-105 transition-smooth"
        />
      </div>
      <div className="p-5">
        <h3
          className="text-xl font-bold text-foreground mb-2"
          title={product.name}
        >
          {sliceText(product.name)}
        </h3>
        <p
          className="text-muted-foreground mb-4 line-clamp-2"
          title={product.description}
        >
          {sliceText(product.description)}
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            {product.price} ج.م
          </span>
          <div className="flex gap-3">
            <span
              className={`text-xs border-border border rounded-full px-3 py-1 ${
                product.isAvailable
                  ? "text-primary"
                  : "bg-muted-foreground/50 text-muted"
              }`}
            >
              {product.isAvailable ? "متوفر" : "غير متوفر"}
            </span>
            <span className="text-sm text-muted-foreground">
              {product.category === "lamb" ? "لحم ضاني" : "لحم كندوز"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <EditProduct product={product} />
          <DeleteButton id={product._id} />
        </div>
      </div>
    </div>
  );
};

export default Card;
