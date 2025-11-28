import { Bell, RefreshCw, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";

const Header = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notificationCount] = useState(3);
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/salespersons") return "Sales Persons";
    if (path === "/notes") return "Notes";
    if (path === "/settings") return "Settings";
    return "Dashboard";
  };

  const getPageSubtitle = () => {
    const path = location.pathname;
    if (path === "/") return "Overview of your sales performance";
    if (path === "/salespersons") return "Track your sales team performance";
    if (path === "/notes") return "Your personal notes and reminders";
    if (path === "/settings") return "Configure your preferences";
    return "";
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await api.refreshCache();
      // Invalidate all queries to refetch with new data
      await queryClient.invalidateQueries();
    } catch (error) {
      console.error("Failed to refresh cache:", error);
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    }
  };

  return (
    <header
      className={`
        bg-white sticky top-0 z-50 
        transition-all duration-300
        ${
          scrolled
            ? "shadow-lg shadow-gray-200/50 border-b border-gray-200"
            : "border-b border-gray-100"
        }
      `}
    >
      <div className="flex items-center justify-between px-8 py-5">
        {/* Page Title Section */}
        <div className="flex-1 animate-fadeInUp">
          <h2 className="text-3xl font-bold font-display text-gray-900 mb-1">
            {getPageTitle()}
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            {getPageSubtitle()}
          </p>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="
              flex items-center gap-2.5 px-5 py-2.5
              bg-teal-600
              text-white font-semibold rounded-xl
              shadow-lg shadow-teal-500/30
              hover:shadow-xl hover:shadow-teal-500/40
              hover:bg-teal-700
              hover:scale-105 active:scale-95
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <RefreshCw
              className={`w-4 h-4 transition-transform duration-500 ${
                isRefreshing ? "animate-spin" : "group-hover:rotate-180"
              }`}
            />
            <span>Refresh Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
