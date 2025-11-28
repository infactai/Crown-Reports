// Mock data for Dashboard
export const dashboardMetrics = {
  totalSalesValue: {
    value: "$2,847,392",
    trend: "up",
    trendValue: "+12.5%",
  },
  totalProducts: {
    value: "847",
    trend: "up",
    trendValue: "+8.2%",
  },
  totalLeads: {
    value: "1,284",
    trend: "up",
    trendValue: "+15.3%",
  },
  avgProbability: {
    value: "68.5%",
    trend: "down",
    trendValue: "-2.1%",
  },
};

// Mock product data
export const productsData = [
  {
    id: 1,
    productName: "Enterprise CRM Suite",
    salesValue: 485200,
    probability: 92,
    leads: 145,
    rating: 9,
    lastUpdated: "2024-11-20",
  },
  {
    id: 2,
    productName: "Marketing Automation Pro",
    salesValue: 387500,
    probability: 85,
    leads: 128,
    rating: 8,
    lastUpdated: "2024-11-22",
  },
  {
    id: 3,
    productName: "Sales Analytics Plus",
    salesValue: 325800,
    probability: 78,
    leads: 96,
    rating: 7,
    lastUpdated: "2024-11-19",
  },
  {
    id: 4,
    productName: "Customer Support Hub",
    salesValue: 298400,
    probability: 88,
    leads: 112,
    rating: 9,
    lastUpdated: "2024-11-21",
  },
  {
    id: 5,
    productName: "Lead Generation Tool",
    salesValue: 276900,
    probability: 72,
    leads: 87,
    rating: 7,
    lastUpdated: "2024-11-18",
  },
  {
    id: 6,
    productName: "Email Campaign Manager",
    salesValue: 245600,
    probability: 81,
    leads: 104,
    rating: 8,
    lastUpdated: "2024-11-23",
  },
  {
    id: 7,
    productName: "Social Media Suite",
    salesValue: 198700,
    probability: 65,
    leads: 73,
    rating: 6,
    lastUpdated: "2024-11-17",
  },
  {
    id: 8,
    productName: "Project Management Pro",
    salesValue: 187300,
    probability: 75,
    leads: 91,
    rating: 7,
    lastUpdated: "2024-11-24",
  },
  {
    id: 9,
    productName: "Workflow Automation",
    salesValue: 165400,
    probability: 70,
    leads: 68,
    rating: 7,
    lastUpdated: "2024-11-16",
  },
  {
    id: 10,
    productName: "Data Visualization Tool",
    salesValue: 142800,
    probability: 68,
    leads: 54,
    rating: 6,
    lastUpdated: "2024-11-25",
  },
];

// Mock sales data for SalesPersons page
export const salesPersonsData = [
  {
    id: 1,
    name: "John Smith",
    avatar: "JS",
    totalSales: 892400,
    products: 45,
    leads: 156,
    winRate: 78,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "SJ",
    totalSales: 765300,
    products: 38,
    leads: 142,
    winRate: 82,
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar: "MC",
    totalSales: 698200,
    products: 42,
    leads: 128,
    winRate: 75,
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "ED",
    totalSales: 587600,
    products: 31,
    leads: 98,
    winRate: 85,
  },
  {
    id: 5,
    name: "Robert Wilson",
    avatar: "RW",
    totalSales: 491500,
    products: 28,
    leads: 87,
    winRate: 71,
  },
];

export const salesTableData = [
  {
    id: 1,
    client: "Acme Corporation",
    milestone: "Contract Signed",
    salesValue: 125000,
    productName: "Enterprise CRM Suite",
    ranking: 5,
    probability: 95,
    salesperson: "John Smith",
  },
  {
    id: 2,
    client: "TechStart Inc",
    milestone: "Proposal Sent",
    salesValue: 87500,
    productName: "Marketing Automation Pro",
    ranking: 4,
    probability: 75,
    salesperson: "Sarah Johnson",
  },
  {
    id: 3,
    client: "Global Dynamics",
    milestone: "In Negotiation",
    salesValue: 156000,
    productName: "Sales Analytics Plus",
    ranking: 5,
    probability: 82,
    salesperson: "Michael Chen",
  },
  {
    id: 4,
    client: "Innovation Labs",
    milestone: "Discovery Call",
    salesValue: 64200,
    productName: "Customer Support Hub",
    ranking: 3,
    probability: 45,
    salesperson: "Emily Davis",
  },
  {
    id: 5,
    client: "Enterprise Solutions",
    milestone: "Contract Signed",
    salesValue: 198000,
    productName: "Lead Generation Tool",
    ranking: 5,
    probability: 98,
    salesperson: "Robert Wilson",
  },
];

// Helper function to format currency
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper function to format percentage
export const formatPercentage = (value) => {
  return `${value}%`;
};

