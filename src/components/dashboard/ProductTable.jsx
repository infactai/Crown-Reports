import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "../../utils/mockData";

const ProductTable = ({ data, sortConfig, onSort }) => {
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="w-4 h-4 text-teal-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-teal-600" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("productName")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Product Name
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("productName")}
                </span>
              </button>
            </th>
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("sold")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Units Sold
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("sold")}
                </span>
              </button>
            </th>
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("saleValue")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Sale Value
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("saleValue")}
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr
              key={index}
              className="
                border-b border-gray-100 
                hover:bg-teal-50
                transition-all duration-300
                group cursor-pointer
              "
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                    {product.productName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                      {product.productName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="font-bold text-gray-900 text-lg">
                  {product.sold}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="font-bold text-gray-900 text-lg">
                  {formatCurrency(product.saleValue)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
