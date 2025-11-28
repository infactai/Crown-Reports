import { TrendingUp, TrendingDown } from "lucide-react";

const MetricCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon, 
  iconBgColor = "bg-teal-600",
}) => {
  const isPositive = trend === "up";
  
  return (
    <div
      className="
        group
        bg-white rounded-2xl p-6 
        shadow-lg shadow-gray-200/50 
        border border-gray-100
        hover:shadow-xl hover:shadow-gray-300/50
        transition-all duration-300 
        hover:-translate-y-2
        cursor-pointer
      "
    >
      {/* Icon and Trend */}
      <div className="flex items-center justify-between mb-4">
        <div className={`
          w-12 h-12 
          ${iconBgColor}
          rounded-xl 
          flex items-center justify-center
          shadow-lg shadow-teal-500/20
          group-hover:scale-110 group-hover:rotate-3
          transition-all duration-300
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {trendValue && (
          <div className={`
            flex items-center gap-1 
            px-2.5 py-1 rounded-lg
            text-sm font-bold
            ${isPositive 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
            }
            group-hover:scale-105 transition-transform duration-300
          `}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {trendValue}
          </div>
        )}
      </div>

      {/* Label */}
      <h3 className="text-gray-500 text-sm font-semibold mb-2 group-hover:text-gray-700 transition-colors duration-300">
        {title}
      </h3>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
        {value}
      </p>
    </div>
  );
};

export default MetricCard;

