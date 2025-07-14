// Mock data for GYG Supplier Dashboard
const dashboardData = {
    // Supplier Information
    supplier: {
        name: "Acme Adventures",
        id: "SUP-2024-001",
        status: "online",
        lastUpdated: new Date().toISOString()
    },

    // Performance Metrics
    metrics: {
        uptime: {
            "1d": 98.5,
            "7d": 96.2,
            "30d": 94.8,
            "90d": 93.1
        },
        errorRate: {
            "1d": 0.8,
            "7d": 1.2,
            "30d": 1.5,
            "90d": 1.8
        },
        lostRevenue: {
            "1d": 245,
            "7d": 1890,
            "30d": 8450,
            "90d": 23400
        },
        responseTime: {
            "1d": 2.3,
            "7d": 2.1,
            "30d": 2.4,
            "90d": 2.6
        }
    },

    // Time series data for charts
    timeSeriesData: {
        uptime: {
            "7": [
                { date: "2024-01-01", value: 98.2 },
                { date: "2024-01-02", value: 97.8 },
                { date: "2024-01-03", value: 99.1 },
                { date: "2024-01-04", value: 96.5 },
                { date: "2024-01-05", value: 97.2 },
                { date: "2024-01-06", value: 98.9 },
                { date: "2024-01-07", value: 96.2 }
            ],
            "30": [
                { date: "2024-01-01", value: 98.2 },
                { date: "2024-01-02", value: 97.8 },
                { date: "2024-01-03", value: 99.1 },
                { date: "2024-01-04", value: 96.5 },
                { date: "2024-01-05", value: 97.2 },
                { date: "2024-01-06", value: 98.9 },
                { date: "2024-01-07", value: 96.2 },
                { date: "2024-01-08", value: 95.8 },
                { date: "2024-01-09", value: 97.4 },
                { date: "2024-01-10", value: 98.1 },
                { date: "2024-01-11", value: 96.7 },
                { date: "2024-01-12", value: 97.9 },
                { date: "2024-01-13", value: 98.3 },
                { date: "2024-01-14", value: 96.8 },
                { date: "2024-01-15", value: 97.5 },
                { date: "2024-01-16", value: 98.6 },
                { date: "2024-01-17", value: 96.1 },
                { date: "2024-01-18", value: 97.8 },
                { date: "2024-01-19", value: 98.4 },
                { date: "2024-01-20", value: 96.9 },
                { date: "2024-01-21", value: 97.2 },
                { date: "2024-01-22", value: 98.7 },
                { date: "2024-01-23", value: 96.3 },
                { date: "2024-01-24", value: 97.6 },
                { date: "2024-01-25", value: 98.1 },
                { date: "2024-01-26", value: 96.8 },
                { date: "2024-01-27", value: 97.9 },
                { date: "2024-01-28", value: 98.5 },
                { date: "2024-01-29", value: 96.4 },
                { date: "2024-01-30", value: 97.7 },
                { date: "2024-01-31", value: 94.8 }
            ],
            "90": generateTimeSeriesData(90, 93.1, 99.5, 0.8)
        },
        errorRate: {
            "7": [
                { date: "2024-01-01", value: 0.5 },
                { date: "2024-01-02", value: 0.8 },
                { date: "2024-01-03", value: 0.3 },
                { date: "2024-01-04", value: 1.2 },
                { date: "2024-01-05", value: 0.9 },
                { date: "2024-01-06", value: 0.4 },
                { date: "2024-01-07", value: 1.2 }
            ],
            "30": [
                { date: "2024-01-01", value: 0.5 },
                { date: "2024-01-02", value: 0.8 },
                { date: "2024-01-03", value: 0.3 },
                { date: "2024-01-04", value: 1.2 },
                { date: "2024-01-05", value: 0.9 },
                { date: "2024-01-06", value: 0.4 },
                { date: "2024-01-07", value: 1.2 },
                { date: "2024-01-08", value: 1.1 },
                { date: "2024-01-09", value: 0.7 },
                { date: "2024-01-10", value: 0.6 },
                { date: "2024-01-11", value: 1.0 },
                { date: "2024-01-12", value: 0.8 },
                { date: "2024-01-13", value: 0.5 },
                { date: "2024-01-14", value: 1.1 },
                { date: "2024-01-15", value: 0.9 },
                { date: "2024-01-16", value: 0.4 },
                { date: "2024-01-17", value: 1.3 },
                { date: "2024-01-18", value: 0.8 },
                { date: "2024-01-19", value: 0.6 },
                { date: "2024-01-20", value: 1.0 },
                { date: "2024-01-21", value: 0.9 },
                { date: "2024-01-22", value: 0.5 },
                { date: "2024-01-23", value: 1.2 },
                { date: "2024-01-24", value: 0.8 },
                { date: "2024-01-25", value: 0.7 },
                { date: "2024-01-26", value: 1.1 },
                { date: "2024-01-27", value: 0.8 },
                { date: "2024-01-28", value: 0.4 },
                { date: "2024-01-29", value: 1.3 },
                { date: "2024-01-30", value: 0.9 },
                { date: "2024-01-31", value: 1.5 }
            ],
            "90": generateTimeSeriesData(90, 1.8, 0.1, 2.5)
        },
        revenue: {
            "7": [
                { date: "2024-01-01", value: 180 },
                { date: "2024-01-02", value: 320 },
                { date: "2024-01-03", value: 95 },
                { date: "2024-01-04", value: 450 },
                { date: "2024-01-05", value: 280 },
                { date: "2024-01-06", value: 120 },
                { date: "2024-01-07", value: 445 }
            ],
            "30": generateTimeSeriesData(30, 8450, 50, 800),
            "90": generateTimeSeriesData(90, 23400, 100, 1200)
        }
    },

    // Benchmarking Data
    benchmarking: {
        uptime: {
            supplier: 94.8,
            industryAverage: 95.3,
            topPerformers: 98.2,
            percentile: 65
        },
        errorRate: {
            supplier: 1.5,
            industryAverage: 1.2,
            topPerformers: 0.3,
            percentile: 45
        },
        lostRevenue: {
            supplier: 8450,
            industryAverage: 6200,
            topPerformers: 1800,
            potentialRecovery: 2250
        },
        responseTime: {
            supplier: 2.4,
            industryAverage: 1.7,
            topPerformers: 0.8,
            percentile: 35
        }
    },

    // Recommendations
    recommendations: [
        {
            id: 1,
            priority: "high",
            title: "Optimize API Response Times",
            description: "Your average response time is 2.3s, which is 40% slower than the industry average. Consider implementing caching strategies.",
            impact: "High",
            effort: "Medium",
            actions: [
                { type: "documentation", label: "Documentation", url: "#" },
                { type: "support", label: "Contact Support", url: "#" }
            ]
        },
        {
            id: 2,
            priority: "medium",
            title: "Implement Retry Logic",
            description: "Add exponential backoff retry logic to handle temporary network issues and reduce error rates.",
            impact: "Medium",
            effort: "Low",
            actions: [
                { type: "code", label: "Code Examples", url: "#" },
                { type: "tutorial", label: "Tutorial", url: "#" }
            ]
        },
        {
            id: 3,
            priority: "low",
            title: "Monitor Peak Hours",
            description: "Your system shows higher error rates during peak booking hours (2-4 PM). Consider scaling resources during these times.",
            impact: "Low",
            effort: "Medium",
            actions: [
                { type: "analytics", label: "Analytics", url: "#" },
                { type: "settings", label: "Settings", url: "#" }
            ]
        }
    ],

    // Alert History
    alerts: [
        {
            id: 1,
            type: "error",
            message: "High error rate detected: 3.2% in the last hour",
            timestamp: "2024-01-31T14:30:00Z",
            resolved: true
        },
        {
            id: 2,
            type: "warning",
            message: "Response time increased to 3.1s",
            timestamp: "2024-01-31T12:15:00Z",
            resolved: false
        },
        {
            id: 3,
            type: "info",
            message: "System maintenance scheduled for tomorrow 2-4 AM",
            timestamp: "2024-01-31T10:00:00Z",
            resolved: false
        }
    ],

    // Performance Goals
    goals: {
        uptime: 99.0,
        errorRate: 0.5,
        responseTime: 1.5,
        lostRevenue: 1000
    }
};

// Helper function to generate time series data
function generateTimeSeriesData(days, totalValue, minValue, maxValue) {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        // Generate realistic data with some variation
        const baseValue = totalValue / days;
        const variation = (Math.random() - 0.5) * (maxValue - minValue) * 0.3;
        const value = Math.max(minValue, Math.min(maxValue, baseValue + variation));
        
        data.push({
            date: date.toISOString().split('T')[0],
            value: Math.round(value * 100) / 100
        });
    }
    
    return data;
}

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = dashboardData;
}