import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import classLevels from "../classLevels";
import { useEffect } from "react";
import { getUniformType } from "../App";

export type UniformItem = {
  uniformType: string;
  price: number;
};

const KeySchema = z.string();

const schema = z.object({
  childName: z.string().min(1, "Name is required"),
  childClass: z.string().min(1, "Class is required"),
  sizeOrders: z.record(
    KeySchema,
    z.record(KeySchema, z.coerce.number().min(0)),
  ),
});

export type OrderData = z.infer<typeof schema>;

type SizeOrders = Record<string, Record<string, number>>;

type Props = {
  uniforms: UniformItem[];
  sizes: string[];
  onSubmit: (data: OrderData) => void;
  onSelect: (classLevel: string) => void;
  generateDefaultSizes: () => SizeOrders;
};

export default function OrderForm({
  uniforms,
  sizes,
  onSubmit,
  onSelect,
  generateDefaultSizes,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<OrderData>({
    resolver: zodResolver(schema),
    defaultValues: { sizeOrders: generateDefaultSizes() },
  });

  useEffect(() => {
    reset({
      childName: "",
      childClass: "",
    });
    setValue("sizeOrders", generateDefaultSizes(), {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [isSubmitSuccessful]);
  const values = watch("sizeOrders");

  const total = uniforms.reduce((sum, item) => {
    const sizesData = values?.[getUniformType(item.uniformType)] || {};

    return (
      sum +
      sizes.reduce((s, size) => {
        const qty = sizesData[size] || 0;
        return s + qty * item.price;
      }, 0)
    );
  }, 0);

  const submit = handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <form
      onSubmit={submit}
      className="max-w-3xl mx-auto p-8 flex flex-col items-start gap-6 bg-orange-100"
    >
      <h1 className="text-xl text-gray-700 font-bold self-center">
        Uniform Order Form
      </h1>

      <div className="flex flex-col items-start">
        <label className="block text-sm font-medium">Child Name</label>
        <input {...register("childName")} className="border rounded p-2 w-md" />

        {errors.childName && (
          <p className="text-red-500 text-sm">{errors.childName.message}</p>
        )}
      </div>

      <div className="flex flex-col items-start">
        <label className="block text-sm font-medium">Class</label>
        <select
          {...register("childClass")}
          onChange={(e) => onSelect(e.target.value)}
          id="childClass"
          className="border rounded p-2 w-min"
        >
          <option value=""> -- Select Class --</option>
          {classLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>

        {errors.childClass && (
          <p className="text-red-500 text-sm">{errors.childClass.message}</p>
        )}
      </div>

      {uniforms.map((item) => (
        <div key={item.uniformType}>
          <h2 className="font-semibold">
            {item.uniformType} (${item.price})
          </h2>

          <div className="grid grid-cols-3 gap-2 mt-2">
            {sizes.map((size) => (
              <input
                onWheel={(event) => event?.currentTarget?.blur()}
                key={size}
                type="number"
                min="0"
                placeholder={size}
                className="border p-2 rounded"
                {...register(
                  `sizeOrders.${getUniformType(item.uniformType)}.${size}"]`,
                )}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="font-semibold text-lg">Total: ${total.toFixed(2)}</div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Order
      </button>
    </form>
  );
}
