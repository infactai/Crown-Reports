# Backend API Changes - Date Filtering

## 🚨 Breaking Changes

All report endpoints now **require** query parameters: `period` and `value`.

---

## What Changed

### Old Behavior (Deprecated)

- Endpoints worked without parameters
- Always returned December 2025 data (hardcoded)
- Response included `currentMonth` field

### New Behavior

- Endpoints require `period` and `value` query parameters
- Returns data for the specified time period
- Response includes `period` and `value` fields (no more `currentMonth`)
- Missing/invalid parameters return **400 Bad Request**

---

## API Endpoints

### 1. Main Page Report

**Endpoint:** `GET /api/reports/main`

**Required Query Parameters:**

- `period` - Filter type: `month`, `quarter`, or `year`
- `value` - Date value (format depends on period)

**Examples:**

```bash
# Month filter
GET /api/reports/main?period=month&value=2025-12

# Quarter filter
GET /api/reports/main?period=quarter&value=2025-Q4

# Year filter
GET /api/reports/main?period=year&value=2024
```

**Response (200 OK):**

```json
{
  "success": true,
  "period": "month",
  "value": "2025-12",
  "stats": {
    "salesValue": 150000.0,
    "expectedSalesValue": 75000.0,
    "leadCount": 450,
    "productCount": 12
  },
  "tableData": [
    {
      "productName": "Gazebo",
      "sold": 25,
      "saleValue": 75000.0
    }
  ]
}
```

---

### 2. Sales Page Report

**Endpoint:** `GET /api/reports/sales/:salespersonName`

**Required Query Parameters:**

- `period` - Filter type: `month`, `quarter`, or `year`
- `value` - Date value (format depends on period)

**URL Parameters:**

- `salespersonName` - Name of salesperson (URL encoded)

**Examples:**

```bash
# Month filter
GET /api/reports/sales/Carl%20Hooper?period=month&value=2025-12

# Quarter filter
GET /api/reports/sales/Julia%20Murden?period=quarter&value=2025-Q4

# Year filter
GET /api/reports/sales/Andrew%20Cook?period=year&value=2024
```

**Response (200 OK):**

```json
{
  "success": true,
  "period": "month",
  "value": "2025-12",
  "salesperson": "Carl Hooper",
  "stats": {
    "salesValue": 50000.0,
    "expectedSalesValue": 25000.0,
    "leadCount": 45,
    "productCount": 8,
    "salesWon": 10,
    "salesLost": 8,
    "expectedToWin": 15,
    "incompleteData": 5
  },
  "tableData": [
    {
      "id": 15015460,
      "client": "Peter CLELAND",
      "clientImage": "https://...",
      "milestone": "Quote",
      "salesValue": 25000,
      "productName": "Gazebo",
      "probability": 75,
      "ranking": "1 - Excellent"
    }
  ]
}
```

---

### 3. Other Endpoints (Unchanged)

These endpoints still work the same way:

```bash
GET /health                        # Health check
GET /api/salespeople              # List salespeople
GET /api/opportunities/status     # Cache status
GET /api/opportunities/refresh    # Manual refresh
```

---

## Parameter Reference

### Valid Period Values

- `"month"` - Monthly data
- `"quarter"` - Quarterly data (3 months)
- `"year"` - Yearly data (12 months)

### Valid Value Formats

| Period    | Format        | Example   | Description       |
| --------- | ------------- | --------- | ----------------- |
| `month`   | `YYYY-MM`     | `2025-12` | December 2025     |
| `quarter` | `YYYY-Q[1-4]` | `2025-Q4` | Q4 2025 (Oct-Dec) |
| `year`    | `YYYY`        | `2025`    | Year 2025         |

### Quarter Mapping

- **Q1**: January - March (months 1-3)
- **Q2**: April - June (months 4-6)
- **Q3**: July - September (months 7-9)
- **Q4**: October - December (months 10-12)

---

---

## Error Responses

### 400 Bad Request - Missing/Invalid Parameters

**Missing Parameter:**

```json
{
  "success": false,
  "error": "Missing required parameter: period"
}
```

**Invalid Period:**

```json
{
  "success": false,
  "error": "Invalid period. Expected: month, quarter, or year. Got: weekly"
}
```

**Invalid Month Format:**

```json
{
  "success": false,
  "error": "Invalid month format. Expected YYYY-MM (e.g., 2025-12). Got: 2025-13"
}
```

**Invalid Quarter Format:**

```json
{
  "success": false,
  "error": "Invalid quarter format. Expected YYYY-Q[1-4] (e.g., 2025-Q4). Got: 2025-Q5"
}
```

**Invalid Year Format:**

```json
{
  "success": false,
  "error": "Invalid year format. Expected YYYY (e.g., 2024). Got: 24"
}
```

### 404 Not Found - Invalid Salesperson

```json
{
  "success": false,
  "error": "No data found for salesperson: Invalid Name"
}
```

---

## Common Errors

| HTTP Status | Error                                | Solution                                   |
| ----------- | ------------------------------------ | ------------------------------------------ |
| 400         | "Missing required parameter: period" | Add `?period=month` to URL                 |
| 400         | "Missing required parameter: value"  | Add `&value=2025-12` to URL                |
| 400         | "Invalid period"                     | Use `month`, `quarter`, or `year`          |
| 400         | "Invalid month format"               | Use `YYYY-MM` format (e.g., `2025-12`)     |
| 400         | "Invalid quarter format"             | Use `YYYY-Q[1-4]` format (e.g., `2025-Q4`) |
| 400         | "Invalid year format"                | Use `YYYY` format (e.g., `2024`)           |
| 404         | "No data found for salesperson"      | Check name with `/api/salespeople`         |

---

## Testing Examples

```bash
# Valid requests
curl "http://localhost:3000/api/reports/main?period=month&value=2025-12"
curl "http://localhost:3000/api/reports/main?period=quarter&value=2025-Q4"
curl "http://localhost:3000/api/reports/main?period=year&value=2024"
curl "http://localhost:3000/api/reports/sales/Carl%20Hooper?period=month&value=2025-12"

# Invalid requests (will return 400 errors)
curl "http://localhost:3000/api/reports/main"
curl "http://localhost:3000/api/reports/main?period=week&value=2025-12"
curl "http://localhost:3000/api/reports/main?period=month&value=invalid"
```

---

## Summary

**What you need to update:**

1. Add `?period=X&value=Y` to all API calls
2. Response now has `period` and `value` fields instead of `currentMonth`
3. Handle 400 validation errors
