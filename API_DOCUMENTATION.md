# Crown Reports - API Documentation

**Version**: 1.0.0  
**Base URL**: `http://localhost:3000`  
**Protocol**: REST API  
**Response Format**: JSON

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Response Format](#response-format)
4. [Endpoints](#endpoints)
   - [Health Check](#health-check)
   - [Main Dashboard Report](#main-dashboard-report)
   - [Sales Dashboard Report](#sales-dashboard-report)
   - [List Salespeople](#list-salespeople)
   - [Manual Cache Refresh](#manual-cache-refresh)
   - [Cache Status](#cache-status)
5. [Date Filtering](#date-filtering)
6. [Error Handling](#error-handling)
7. [Code Examples](#code-examples)
8. [Data Structures](#data-structures)

---

## Overview

The Crown Reports API provides access to CapsuleCRM opportunities data with analytics, filtering, and reporting capabilities. The API fetches approximately 7,000 opportunities and provides aggregated statistics, product-based reports, and salesperson performance metrics.

**Key Features**:
- Real-time data from CapsuleCRM
- Automatic hourly data refresh
- Date filtering (month, quarter, year)
- Product-based and salesperson-based analytics
- Fast response times (<50ms)
- CORS enabled for frontend integration

---

## Authentication

Currently, no authentication is required for API requests. The API is secured at the server level via environment variables.

**For Production**: Consider implementing API key authentication or JWT tokens.

---

## Response Format

All endpoints return JSON responses with a standard structure:

**Success Response**:
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ }
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Error message description"
}
```

---

## Endpoints

### Health Check

Check if the API server is running and responsive.

**Endpoint**: `GET /health`

**Parameters**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Crown Reports Backend is running",
  "timestamp": "2024-11-28T13:08:00.000Z"
}
```

**Example Request**:
```javascript
fetch('http://localhost:3000/health')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### Main Dashboard Report

Get aggregated statistics and table data grouped by product. This endpoint provides an overview of all opportunities with metrics like total sales value, product count, lead count, and average probability.

**Endpoint**: `GET /api/reports/main`

**Query Parameters**:

- **filter** (optional, string): Type of date filter to apply
  - Values: `month`, `quarter`, `year`, `all`
  - Default: `all`

- **value** (optional, string): The value for the selected filter type
  - For `month`: Format as `YYYY-MM` (e.g., `2024-11`)
  - For `quarter`: Format as `YYYY-Q1` to `YYYY-Q4` (e.g., `2024-Q4`)
  - For `year`: Format as `YYYY` (e.g., `2024`)
  - For `all`: Omit this parameter
  - Default: `null`

**Success Response** (200 OK):
```json
{
  "success": true,
  "filter": {
    "type": "month",
    "value": "2024-11"
  },
  "stats": {
    "totalSalesValue": 150000.50,
    "totalProducts": 25,
    "totalLeads": 450,
    "averageProbability": 45.75
  },
  "tableData": [
    {
      "productName": "Gazebo (model unknown)",
      "salesValue": 75000.00,
      "probability": 55.3
    },
    {
      "productName": "Premium Awning",
      "salesValue": 50000.00,
      "probability": 60.2
    }
  ]
}
```

**Stats Explained**:
- `totalSalesValue`: Sum of all opportunity values in the filtered dataset
- `totalProducts`: Count of unique products
- `totalLeads`: Total number of opportunities
- `averageProbability`: Average probability across all opportunities

**Table Data Explained**:
- Data is grouped by product name
- `salesValue`: Sum of all opportunity values for that product
- `probability`: Average probability for that product
- Results are sorted by sales value (descending)

**Example Requests**:

Get all data:
```javascript
fetch('http://localhost:3000/api/reports/main')
  .then(response => response.json())
  .then(data => console.log(data));
```

Filter by month:
```javascript
fetch('http://localhost:3000/api/reports/main?filter=month&value=2024-11')
  .then(response => response.json())
  .then(data => console.log(data));
```

Filter by quarter:
```javascript
fetch('http://localhost:3000/api/reports/main?filter=quarter&value=2024-Q4')
  .then(response => response.json())
  .then(data => console.log(data));
```

Filter by year:
```javascript
fetch('http://localhost:3000/api/reports/main?filter=year&value=2024')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### Sales Dashboard Report

Get statistics and individual opportunities for a specific salesperson. This endpoint provides detailed performance metrics and a list of all opportunities owned by the salesperson.

**Endpoint**: `GET /api/reports/sales/:salespersonName`

**URL Parameters**:

- **salespersonName** (required, string): The name of the salesperson
  - Must be URL encoded (spaces should be `%20`)
  - Case-sensitive
  - Example: `Carl%20Hooper` for "Carl Hooper"

**Query Parameters**:

Same as Main Dashboard Report (filter and value)

**Success Response** (200 OK):
```json
{
  "success": true,
  "salesperson": "Carl Hooper",
  "filter": {
    "type": "year",
    "value": "2024"
  },
  "stats": {
    "totalSalesValue": 350000.00,
    "totalProducts": 8,
    "totalLeads": 250,
    "averageWinRate": 32.0,
    "salesWon": 80,
    "salesLost": 95,
    "expectedToWin": 75,
    "incompleteData": 15
  },
  "tableData": [
    {
      "id": 15015460,
      "client": "Peter CLELAND",
      "clientImage": "https://facehub.appspot.com/default/person?text=PC&size=100&colour=-164827781",
      "milestone": "Lost",
      "salesValue": 0,
      "productName": "Gazebo (model unknown)",
      "probability": 0,
      "ranking": "3 - Very Poor: Low intent, weak signals"
    }
  ]
}
```

**Stats Explained**:
- `totalSalesValue`: Sum of all opportunity values for this salesperson
- `totalProducts`: Number of unique products they handle
- `totalLeads`: Total opportunities owned by this salesperson
- `averageWinRate`: Percentage of won opportunities (Won / Total × 100)
- `salesWon`: Count of opportunities with "Win" milestone
- `salesLost`: Count of opportunities with "Lost" milestone
- `expectedToWin`: Count of open opportunities (not won or lost)
- `incompleteData`: Count of opportunities missing required fields (Product, Lead Ranking, or Readiness)

**Table Data Explained**:
- Shows individual opportunities (not aggregated)
- Each row represents one opportunity
- Sorted by sales value (descending)
- Includes client information and profile images

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "error": "No data found for salesperson: Unknown Person"
}
```

**Example Requests**:

Get all data for Carl Hooper:
```javascript
const salesperson = encodeURIComponent('Carl Hooper');
fetch(`http://localhost:3000/api/reports/sales/${salesperson}`)
  .then(response => response.json())
  .then(data => console.log(data));
```

Filter by month:
```javascript
const salesperson = encodeURIComponent('Carl Hooper');
fetch(`http://localhost:3000/api/reports/sales/${salesperson}?filter=month&value=2024-11`)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

### List Salespeople

Get a list of all unique salespeople in the system. Useful for populating dropdowns or navigation menus.

**Endpoint**: `GET /api/salespeople`

**Parameters**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "count": 15,
  "salespeople": [
    {
      "id": 353584,
      "name": "Carl Hooper",
      "username": "Carl.Hooper",
      "pictureURL": "https://facehub.appspot.com/default/person?text=CH&size=100&colour=834332973"
    },
    {
      "id": 353585,
      "name": "Jane Smith",
      "username": "Jane.Smith",
      "pictureURL": "https://facehub.appspot.com/default/person?text=JS&size=100&colour=123456789"
    }
  ]
}
```

**Response Fields**:
- `count`: Total number of unique salespeople
- `salespeople`: Array of salesperson objects
  - `id`: Unique identifier from CapsuleCRM
  - `name`: Full name (use this for the sales report endpoint)
  - `username`: CapsuleCRM username
  - `pictureURL`: Profile picture URL

**Example Request**:
```javascript
fetch('http://localhost:3000/api/salespeople')
  .then(response => response.json())
  .then(data => {
    console.log(`Found ${data.count} salespeople`);
    data.salespeople.forEach(person => {
      console.log(person.name);
    });
  });
```

---

### Manual Cache Refresh

Manually trigger a refresh of the opportunities data from CapsuleCRM. The system automatically refreshes data every hour, but this endpoint allows you to force an immediate refresh.

**Endpoint**: `GET /api/opportunities/refresh`

**Parameters**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "Cache refresh completed",
  "count": 7000,
  "lastUpdated": "2024-11-28T13:15:00.000Z"
}
```

**Response (Already in Progress)**:
```json
{
  "success": false,
  "message": "Refresh already in progress"
}
```

**Response Fields**:
- `count`: Number of opportunities fetched
- `lastUpdated`: ISO 8601 timestamp of when data was refreshed

**Notes**:
- Refresh takes approximately 30-45 seconds to complete
- Only one refresh can run at a time
- Data is automatically refreshed every hour by the system

**Example Request**:
```javascript
async function refreshData() {
  const response = await fetch('http://localhost:3000/api/opportunities/refresh');
  const data = await response.json();
  
  if (data.success) {
    console.log(`Refreshed ${data.count} opportunities`);
    return true;
  } else {
    console.log(data.message);
    return false;
  }
}
```

---

### Cache Status

Get information about the current state of the cached data, including when it was last updated and whether a refresh is currently in progress.

**Endpoint**: `GET /api/opportunities/status`

**Parameters**: None

**Success Response** (200 OK):
```json
{
  "success": true,
  "count": 7000,
  "lastUpdated": "2024-11-28T12:00:00.000Z",
  "isLoading": false
}
```

**Response Fields**:
- `count`: Number of opportunities currently in cache
- `lastUpdated`: ISO 8601 timestamp of last successful refresh
- `isLoading`: Boolean indicating if a refresh is currently in progress

**Example Request**:
```javascript
fetch('http://localhost:3000/api/opportunities/status')
  .then(response => response.json())
  .then(data => {
    console.log(`Cache has ${data.count} opportunities`);
    console.log(`Last updated: ${new Date(data.lastUpdated).toLocaleString()}`);
    if (data.isLoading) {
      console.log('Currently refreshing...');
    }
  });
```

---

## Date Filtering

All report endpoints support date filtering to narrow down the dataset by time period.

**Filter Types**:

**1. Month Filter**
- Parameter: `filter=month&value=YYYY-MM`
- Example: `filter=month&value=2024-11`
- Matches: All opportunities created in November 2024

**2. Quarter Filter**
- Parameter: `filter=quarter&value=YYYY-Q[1-4]`
- Example: `filter=quarter&value=2024-Q4`
- Quarters:
  - Q1: January - March
  - Q2: April - June
  - Q3: July - September
  - Q4: October - December

**3. Year Filter**
- Parameter: `filter=year&value=YYYY`
- Example: `filter=year&value=2024`
- Matches: All opportunities created in 2024

**4. No Filter (All Data)**
- Parameter: `filter=all` or omit parameters
- Example: `filter=all` or just `/api/reports/main`
- Returns: All opportunities regardless of date

**Important Notes**:
- Filtering is based on the `createdAt` field of opportunities
- Dates are in UTC timezone
- Invalid filter values will return all data (no error thrown)

---

## Error Handling

**HTTP Status Codes**:
- `200 OK`: Request successful
- `404 Not Found`: Resource not found (e.g., unknown salesperson or invalid route)
- `500 Internal Server Error`: Server error (e.g., CapsuleCRM API failure)

**Error Response Format**:
```json
{
  "success": false,
  "error": "Human-readable error message"
}
```

**Common Errors**:

**Salesperson Not Found**:
```json
{
  "success": false,
  "error": "No data found for salesperson: Unknown Person"
}
```
Solution: Check spelling and use exact name from `/api/salespeople`

**Route Not Found**:
```json
{
  "success": false,
  "error": "Route not found"
}
```
Solution: Verify the endpoint URL

**Server Error**:
```json
{
  "success": false,
  "error": "Failed to refresh cache",
  "message": "Additional error details"
}
```
Solution: Check server logs or try again later

**Recommended Error Handling Pattern**:
```javascript
async function apiRequest(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    if (!data.success) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error.message);
    throw error;
  }
}

// Usage
try {
  const data = await apiRequest('http://localhost:3000/api/reports/main');
  // Use data...
} catch (error) {
  // Show error to user
  alert(`Failed to load data: ${error.message}`);
}
```

---

## Code Examples

### Vanilla JavaScript

**Fetch Main Report**:
```javascript
async function fetchMainReport(filter = 'all', value = null) {
  const url = new URL('http://localhost:3000/api/reports/main');
  
  if (filter !== 'all') {
    url.searchParams.append('filter', filter);
    if (value) url.searchParams.append('value', value);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  return data;
}

// Usage
const monthData = await fetchMainReport('month', '2024-11');
console.log('Total Sales:', monthData.stats.totalSalesValue);
console.log('Products:', monthData.tableData);
```

**Fetch Sales Report**:
```javascript
async function fetchSalesReport(salesperson, filter = 'all', value = null) {
  const encodedName = encodeURIComponent(salesperson);
  const url = new URL(`http://localhost:3000/api/reports/sales/${encodedName}`);
  
  if (filter !== 'all') {
    url.searchParams.append('filter', filter);
    if (value) url.searchParams.append('value', value);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.error);
  }
  
  return data;
}

// Usage
const carlData = await fetchSalesReport('Carl Hooper', 'year', '2024');
console.log('Win Rate:', carlData.stats.averageWinRate + '%');
console.log('Opportunities:', carlData.tableData.length);
```

### React Hooks

**Custom Hook for Main Report**:
```javascript
import { useState, useEffect } from 'react';

function useMainReport(filter = 'all', value = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const url = new URL('http://localhost:3000/api/reports/main');
        url.searchParams.append('filter', filter);
        if (value) url.searchParams.append('value', value);
        
        const response = await fetch(url);
        const result = await response.json();
        
        if (result.success) {
          setData(result);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [filter, value]);

  return { data, loading, error };
}

// Usage in component
function Dashboard() {
  const { data, loading, error } = useMainReport('month', '2024-11');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Total Sales: ${data.stats.totalSalesValue.toLocaleString()}</h2>
      <ul>
        {data.tableData.map((item, i) => (
          <li key={i}>
            {item.productName}: ${item.salesValue.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Component for Salesperson Selector**:
```javascript
import { useState, useEffect } from 'react';

function SalespersonSelector({ onSelect }) {
  const [salespeople, setSalespeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSalespeople() {
      try {
        const response = await fetch('http://localhost:3000/api/salespeople');
        const data = await response.json();
        
        if (data.success) {
          setSalespeople(data.salespeople);
        }
      } catch (error) {
        console.error('Failed to fetch salespeople:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSalespeople();
  }, []);

  if (loading) return <div>Loading salespeople...</div>;

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a salesperson</option>
      {salespeople.map(person => (
        <option key={person.id} value={person.name}>
          {person.name}
        </option>
      ))}
    </select>
  );
}
```

### Vue.js Composition API

**Composable for Main Report**:
```javascript
import { ref, watch } from 'vue';

export function useMainReport(filter, value) {
  const data = ref(null);
  const loading = ref(true);
  const error = ref(null);

  async function fetchData() {
    loading.value = true;
    error.value = null;
    
    try {
      const url = new URL('http://localhost:3000/api/reports/main');
      url.searchParams.append('filter', filter.value);
      if (value.value) url.searchParams.append('value', value.value);
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (result.success) {
        data.value = result;
      } else {
        error.value = result.error;
      }
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  watch([filter, value], fetchData, { immediate: true });

  return { data, loading, error, refetch: fetchData };
}
```

### Axios Integration

**Create API Client**:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error);
    throw error;
  }
);

// API methods
export const crownAPI = {
  async getMainReport(filter = 'all', value = null) {
    const params = { filter };
    if (value) params.value = value;
    return await api.get('/api/reports/main', { params });
  },

  async getSalesReport(salesperson, filter = 'all', value = null) {
    const params = { filter };
    if (value) params.value = value;
    return await api.get(`/api/reports/sales/${encodeURIComponent(salesperson)}`, { params });
  },

  async getSalespeople() {
    return await api.get('/api/salespeople');
  },

  async refreshCache() {
    return await api.get('/api/opportunities/refresh');
  },

  async getCacheStatus() {
    return await api.get('/api/opportunities/status');
  },
};

// Usage
const data = await crownAPI.getMainReport('month', '2024-11');
console.log(data.stats);
```

---

## Data Structures

### Main Report Response

```javascript
{
  success: true,                    // boolean
  filter: {
    type: "month",                  // string: "month" | "quarter" | "year" | "all"
    value: "2024-11"                // string | null
  },
  stats: {
    totalSalesValue: 150000.50,     // number (sum of all opportunity values)
    totalProducts: 25,              // number (count of unique products)
    totalLeads: 450,                // number (total opportunities)
    averageProbability: 45.75       // number (average 0-100)
  },
  tableData: [                      // array of objects
    {
      productName: "Product Name",  // string
      salesValue: 75000.00,         // number
      probability: 55.3             // number (average 0-100)
    }
  ]
}
```

### Sales Report Response

```javascript
{
  success: true,                    // boolean
  salesperson: "Carl Hooper",       // string
  filter: {
    type: "year",                   // string: "month" | "quarter" | "year" | "all"
    value: "2024"                   // string | null
  },
  stats: {
    totalSalesValue: 350000.00,     // number
    totalProducts: 8,               // number (unique products)
    totalLeads: 250,                // number (total opportunities)
    averageWinRate: 32.0,           // number (percentage 0-100)
    salesWon: 80,                   // number (count)
    salesLost: 95,                  // number (count)
    expectedToWin: 75,              // number (count)
    incompleteData: 15              // number (count)
  },
  tableData: [                      // array of objects
    {
      id: 15015460,                 // number (opportunity ID)
      client: "Peter CLELAND",      // string
      clientImage: "https://...",   // string | null
      milestone: "Lost",            // string
      salesValue: 0,                // number
      productName: "Gazebo",        // string
      probability: 0,               // number (0-100)
      ranking: "3 - Very Poor..."   // string
    }
  ]
}
```

### Salespeople List Response

```javascript
{
  success: true,                    // boolean
  count: 15,                        // number
  salespeople: [                    // array of objects
    {
      id: 353584,                   // number
      name: "Carl Hooper",          // string (use for sales report)
      username: "Carl.Hooper",      // string
      pictureURL: "https://..."     // string
    }
  ]
}
```

### Cache Status Response

```javascript
{
  success: true,                    // boolean
  count: 7000,                      // number (opportunities in cache)
  lastUpdated: "2024-11-28T12:00:00.000Z",  // string (ISO 8601)
  isLoading: false                  // boolean
}
```

---

## Best Practices

**1. Always Check `success` Field**:
```javascript
if (data.success) {
  // Use data
} else {
  // Handle error
}
```

**2. URL Encode Salesperson Names**:
```javascript
const name = encodeURIComponent('Carl Hooper');  // "Carl%20Hooper"
```

**3. Handle Loading States**:
```javascript
// Show loading indicator during initial server startup (30-45 seconds)
// Show different indicator for subsequent requests (<50ms)
```

**4. Cache Responses (Optional)**:
```javascript
// Data auto-refreshes hourly, so you can cache for a few minutes
const cacheTime = 5 * 60 * 1000; // 5 minutes
```

**5. Debounce Filter Changes**:
```javascript
// If users are rapidly changing filters, debounce API calls
const debouncedFetch = debounce(fetchReport, 300);
```

**6. Show Data Freshness**:
```javascript
// Use /api/opportunities/status to show when data was last updated
const status = await fetch('/api/opportunities/status').then(r => r.json());
console.log(`Last updated: ${new Date(status.lastUpdated).toLocaleString()}`);
```

---

## Performance Notes

- **Initial Load**: Server startup takes 30-45 seconds to fetch all data from CapsuleCRM
- **Subsequent Requests**: Response time is <50ms (data served from cache)
- **Auto Refresh**: Data automatically refreshes every hour
- **Concurrent Requests**: Multiple requests can be handled simultaneously
- **Data Size**: ~7,000 opportunities, response payload ~500KB-1MB depending on endpoint

---

## Support

**Server Health**:
```bash
GET /health
```

**Data Status**:
```bash
GET /api/opportunities/status
```

**Common Issues**:

- **Empty responses**: Wait for initial data load (check `/health` first)
- **404 errors**: Verify salesperson name with `/api/salespeople`
- **Stale data**: Trigger manual refresh with `/api/opportunities/refresh`
- **CORS errors**: Ensure backend server is running and CORS is enabled

---

## Changelog

**Version 1.0.0** (Initial Release)
- Main dashboard report endpoint
- Sales dashboard report endpoint
- Salespeople list endpoint
- Cache management endpoints
- Date filtering support (month, quarter, year)
- Automatic hourly refresh

---

**End of Documentation**

For questions or issues, check the server logs or contact the backend team.

