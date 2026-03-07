interface UniformItem {
  uniformType: string;
  price: number;
}

interface UniformItemListProps {
  uniforms: UniformItem[];
  sizes: string[];
  onUpdateQuantity: (data: {
    item: string;
    size: string;
    quantity: number;
  }) => void;
}

const UniformList = ({
  uniforms,
  sizes,
  onUpdateQuantity,
}: UniformItemListProps) => {
  return (
    <div>
      <table className="table-auto border-collapse border border-gray-400 w-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-400 p-2">Item</th>
            <th className="border border-gray-400 p-2">Price</th>
            {sizes.map((size) => (
              <th key={size} className="border border-gray-400 p-2">
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniforms.map((uniform, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">
                {uniform.uniformType}
              </td>
              <td className="border border-gray-400 p-2">
                ${uniform.price.toFixed(2)}
              </td>
              {sizes.map((size) => (
                <td className="border border-gray-400 p-2" key={size}>
                  <input
                    onChange={(e) =>
                      onUpdateQuantity({
                        item: uniform.uniformType,
                        size,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                    key={size}
                    type="number"
                    name={size}
                    min={0}
                    className="block w-30 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniformList;
