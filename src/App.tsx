import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderForm, {
  type OrderData,
  type UniformItem,
} from "./components/OrderForm";

type OrderItem = {
  name: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
};

const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export const getUniformType = (uniform: string) =>
  uniform.replace(/['/ ]/g, "_");

function App() {
  const uniforms: UniformItem[] = [
    { uniformType: "Boy's Shirt", price: 31.5 },
    { uniformType: "Boy's/Girl's Shorts", price: 25.5 },
    { uniformType: "Girl's Dress", price: 47 },
    {
      uniformType: "Green Shorts (till stock lasts)",
      price: 12,
    },
    { uniformType: "Polo T‑Shirt", price: 20.5 },
    { uniformType: "Yellow T‑Shirt", price: 20.5 },
  ];

  const uniformPriceMap = new Map(
    uniforms.map((u) => [getUniformType(u.uniformType), u.price]),
  );

  const [childClass, setChildClass] = useState("");

  const generateDefaultSizes = (): Record<string, Record<string, number>> => {
    return Object.fromEntries(
      uniforms.map((u) => [
        u.uniformType,
        Object.fromEntries(sizes.map((size) => [size, 0])),
      ]),
    );
  };

  console.log("Default", generateDefaultSizes());

  const handleSubmitOrder = async (data: OrderData, total: number) => {
    const items: OrderItem[] = [];

    Object.entries(data.sizeOrders).forEach(([uniform, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        if (qty > 0) {
          items.push({
            name: uniform,
            size,
            quantity: qty,
            price: (uniformPriceMap.get(uniform) ?? 0) * qty,
            total,
          });
        }
      });
    });

    const payload = {
      childName: data.childName,
      childClass: data.childClass,
      items,
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbyBGy7iEoH7_oRBuD6x0doOm04cxuzMntNygmueckukqP9ExrV6FPK0zVh4NlVH-HxD/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      },
    );
    toast.success("Order placed successfully");
  };

  return (
    <div className="flex flex-col m-4 p-4">
      <h1 className="font-bold text-3xl text-gray-700 mb-4 self-center">
        EIS International Pre-school
      </h1>
      <OrderForm
        uniforms={uniforms}
        sizes={sizes}
        onSubmit={handleSubmitOrder}
        onSelect={(childClass) => setChildClass(childClass)}
        generateDefaultSizes={generateDefaultSizes}
      />
      <ToastContainer position="top-center" theme="colored" closeOnClick />
    </div>
  );
}

export default App;
