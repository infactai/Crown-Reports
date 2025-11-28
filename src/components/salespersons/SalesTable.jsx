import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { formatCurrency } from "../../utils/mockData";
import CircularProgress from "../common/CircularProgress";

const SalesTable = ({ data, sortConfig, onSort }) => {

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

  const getMilestoneColor = (milestone) => {
    const colors = {
      "Contract Signed": "bg-green-100 text-green-700",
      "Proposal Sent": "bg-blue-100 text-blue-700",
      "In Negotiation": "bg-yellow-100 text-yellow-700",
      "Discovery Call": "bg-purple-100 text-purple-700",
      Quote: "bg-purple-100 text-purple-700",
      "Closed Lost": "bg-red-100 text-red-700",
      "Closed Won": "bg-green-100 text-green-700",
    };
    return colors[milestone] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("client")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Client
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("client")}
                </span>
              </button>
            </th>
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("milestone")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Milestone
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("milestone")}
                </span>
              </button>
            </th>
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("salesValue")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Sales Value
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("salesValue")}
                </span>
              </button>
            </th>
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
                onClick={() => onSort("ranking")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Ranking
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("ranking")}
                </span>
              </button>
            </th>
            <th className="text-left py-4 px-4">
              <button
                type="button"
                onClick={() => onSort("probability")}
                className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200 group"
              >
                Probability
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {getSortIcon("probability")}
                </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale, index) => (
            <tr
              key={sale.id}
              className="
                border-b border-gray-100 
                hover:bg-teal-50
                transition-all duration-300
                group cursor-pointer
              "
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  {sale.clientImage ? (
                    <img
                      src={sale.clientImage}
                      alt={sale.client}
                      className="w-10 h-10 rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300">
                      {sale.client.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                      {sale.client}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`
                  px-3 py-1.5 rounded-lg font-semibold text-xs
                  ${getMilestoneColor(sale.milestone)}
                  group-hover:scale-105 transition-transform duration-300
                `}
                >
                  {sale.milestone}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="font-bold text-gray-900 text-lg">
                  {formatCurrency(sale.salesValue)}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-gray-700 font-medium">
                  {sale.productName}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-sm text-gray-700 font-medium">
                  {sale.ranking || "N/A"}
                </span>
              </td>
              <td className="py-6 px-6">
                <div className="flex items-center justify-start">
                  <CircularProgress
                    percentage={sale.probability}
                    size={54}
                    strokeWidth={4}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
