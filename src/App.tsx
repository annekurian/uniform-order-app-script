import "./App.css";
import OrderForm from "./components/OrderForm";

type OrderItem = {
  name: string;
  size: string;
  quantity: number;
};

type OrderData = {
  childName: string;
  childClass: string;
  sizeOrders: Record<string, Record<string, number>>;
};

const sizes: string[] = ["XS", "S", "M", "L", "XL", "XXL"] as const;

function App() {
  const uniforms = [
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

  const handleSubmitOrder = async (data: OrderData) => {
    const items: OrderItem[] = [];

    Object.entries(data.sizeOrders).forEach(([uniform, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        if (qty > 0) {
          items.push({
            name: uniform,
            size,
            quantity: qty,
          });
        }
      });
    });

    const payload = {
      childName: data.childName,
      childClass: data.childClass,
      items,
    };

    await fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    alert("Order submitted!");
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-gray-700 mb-4">
        EIS International Pre-school
      </h1>
      <OrderForm
        uniforms={uniforms}
        sizes={sizes}
        onSubmit={handleSubmitOrder}
      />
    </div>
  );
}

export default App;
