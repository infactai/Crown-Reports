// API Base URL
// const API_BASE_URL = "https://localhost:3000";
const API_BASE_URL = "https://crown-report-backend-production.up.railway.app";

// API Service
export const api = {
  /**
   * Get main dashboard report
   * @param {string} period - Filter period: "month", "quarter", or "year"
   * @param {string} value - Filter value (format depends on period)
   */
  async getMainReport(period, value) {
    const url = new URL(`${API_BASE_URL}/api/reports/main`);
    url.searchParams.set("period", period);
    url.searchParams.set("value", value);

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch main report");
    }

    return data;
  },

  /**
   * Get sales dashboard report for a specific salesperson
   * @param {string} salespersonName - Name of the salesperson
   * @param {string} period - Filter period: "month", "quarter", or "year"
   * @param {string} value - Filter value (format depends on period)
   */
  async getSalesReport(salespersonName, period, value) {
    const encodedName = encodeURIComponent(salespersonName);
    const url = new URL(`${API_BASE_URL}/api/reports/sales/${encodedName}`);
    url.searchParams.set("period", period);
    url.searchParams.set("value", value);

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch sales report");
    }

    return data;
  },

  /**
   * Get list of all salespeople
   */
  async getSalespeople() {
    const response = await fetch(`${API_BASE_URL}/api/salespeople`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch salespeople");
    }

    return data;
  },

  /**
   * Manually refresh cache
   */
  async refreshCache() {
    const response = await fetch(`${API_BASE_URL}/api/opportunities/refresh`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to refresh cache");
    }

    return data;
  },

  /**
   * Get cache status
   */
  async getCacheStatus() {
    const response = await fetch(`${API_BASE_URL}/api/opportunities/status`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || "Failed to get cache status");
    }

    return data;
  },

  /**
   * Health check
   */
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return await response.json();
  },
};
