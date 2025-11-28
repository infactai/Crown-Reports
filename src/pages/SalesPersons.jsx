import { useState, useCallback } from "react";
import {
  DollarSign,
  Package,
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import MetricCard from "../components/common/MetricCard";
import SalesTable from "../components/salespersons/SalesTable";
import SalesFilters from "../components/salespersons/SalesFilters";
import Pagination from "../components/common/Pagination";
import { useSalesReport } from "../hooks/useSalesReport";
import { useSalespeople } from "../hooks/useSalespeople";

const SalesPersons = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Fetch salespeople list
  const { data: salesPeopleData } = useSalespeople();

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page when sorting
  };
  const salespeople = salesPeopleData?.salespeople || [];

  // If no salesperson selected, use the first one
  const activeSalesPerson =
    selectedSalesPerson ||
    (salespeople.length > 0 ? salespeople[0]?.name : null);

  // Fetch sales report data (current month only)
  const { data, isLoading, error } = useSalesReport(activeSalesPerson);

  // Handle salesperson change
  const handleSalespersonChange = useCallback((salesperson) => {
    setSelectedSalesPerson(salesperson);
    setCurrentPage(1);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading sales data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
          <p className="text-red-600 font-semibold mb-2">Failed to load data</p>
          <p className="text-red-500 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  const apiData = data || {};
  const stats = apiData.stats || {};
  const tableData = apiData.tableData || [];
  const currentMonth = apiData.currentMonth || "";

  // Sort the entire dataset
  const sortedData = [...tableData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination on sorted data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sortedData.slice(startIndex, endIndex);

  // Format current month for display
  const formatMonth = (monthStr) => {
    if (!monthStr) return "";
    const [year, month] = monthStr.split("-");
    const date = new Date(year, parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Format stats for metric cards
  const metrics = [
    {
      title: "Sales Value",
      value: stats.salesValue
        ? `£${stats.salesValue.toLocaleString("en-GB", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`
        : "£0",
      icon: DollarSign,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Expected Sales Value",
      value: stats.expectedSalesValue
        ? `£${stats.expectedSalesValue.toLocaleString("en-GB", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}`
        : "£0",
      icon: TrendingUp,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Lead Count Bespoken To",
      value: stats.leadCount?.toString() || "0",
      icon: Users,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Product Count",
      value: stats.productCount?.toString() || "0",
      icon: Package,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Sales Won",
      value: stats.salesWon?.toString() || "0",
      icon: CheckCircle,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Sales Lost",
      value: stats.salesLost?.toString() || "0",
      icon: XCircle,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Expected to Win",
      value: stats.expectedToWin?.toString() || "0",
      icon: Clock,
      iconBgColor: "bg-teal-600",
    },
    {
      title: "Incomplete Data",
      value: stats.incompleteData?.toString() || "0",
      icon: AlertCircle,
      iconBgColor: "bg-teal-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Current Month & Salesperson Selector */}
      <div className="bg-white rounded-2xl px-6 py-4 shadow-lg shadow-gray-200/50 border border-gray-100">
        <div className="flex items-center justify-between">
          {/* Current Period */}
          <p className="text-gray-500 text-sm font-medium">
            Current Period:{" "}
            <span className="text-gray-900 font-bold">
              {formatMonth(currentMonth)}
            </span>
          </p>
          {/* Salesperson Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-medium">
              Salesperson:
            </span>
            <SalesFilters
              salesPersons={salespeople}
              onSalespersonChange={handleSalespersonChange}
              selectedSalesPerson={activeSalesPerson}
            />
          </div>
        </div>
      </div>

      {/* Metric Cards - 8 cards in responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sales Activity
          </h2>
          <p className="text-gray-500">
            Detailed sales performance by team members
          </p>
        </div>

        <SalesTable
          data={currentData}
          sortConfig={sortConfig}
          onSort={handleSort}
        />

        {/* Pagination with Items Per Page Selector */}
        <div className="flex items-center justify-between mt-6">
          {/* Items Per Page Selector */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">
              Rows per page:
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="
                px-3 py-2 
                bg-white border border-gray-200 rounded-lg
                text-sm text-gray-900 font-medium
                hover:border-gray-300 hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent
                transition-all duration-200
                cursor-pointer
              "
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={sortedData.length}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesPersons;
