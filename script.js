// GYG Supplier Dashboard JavaScript
class DashboardManager {
    constructor() {
        this.charts = {};
        this.init();
    }

    init() {
        this.initializeCharts();
        this.setupEventListeners();
        this.hideLoadingOverlay();
    }

    initializeCharts() {
        this.createRevenueTravelChart();
        this.createSourceMarketsChart();
        this.createRevenuePurchaseChart();
        this.createVisitorsCRChart();
    }

    createRevenueTravelChart() {
        const ctx = document.getElementById('revenue-travel-chart');
        if (!ctx) return;

        // Sample data for Jun 9, 2025 to Jul 14, 2025
        const dates = this.generateDateRange('2025-06-09', '2025-07-14');
        const revenueData = [1200, 1400, 1100, 1600, 1300, 1500, 1800, 1400, 1200, 1100, 900, 800, 700, 600, 500, 400, 300, 200, 150, 100, 80, 60, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1, 0, 0, 0, 0];
        const ticketsData = [45, 52, 38, 65, 48, 58, 72, 55, 42, 38, 32, 28, 25, 22, 18, 15, 12, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.charts.revenueTravel = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates.map(date => moment(date).format('MMM DD, YYYY')),
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenueData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Tickets',
                        data: ticketsData,
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#f97316',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Revenue',
                            color: '#64748b'
                        },
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '€' + (value / 1000).toFixed(1) + 'K';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Tickets',
                            color: '#64748b'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    createSourceMarketsChart() {
        const ctx = document.getElementById('source-markets-chart');
        if (!ctx) return;

        const data = {
            labels: ['Germany', 'Denmark', 'United States', 'Australia', 'Austria', 'Rest'],
            datasets: [{
                label: 'Revenue',
                data: [1800, 1200, 800, 600, 400, 300],
                backgroundColor: '#3b82f6',
                borderColor: '#3b82f6',
                borderWidth: 0,
                borderRadius: 4
            }]
        };

        this.charts.sourceMarkets = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Revenue',
                            color: '#64748b'
                        },
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '€' + (value / 1000).toFixed(1) + 'K';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }

    createRevenuePurchaseChart() {
        const ctx = document.getElementById('revenue-purchase-chart');
        if (!ctx) return;

        // Sample data for Jun 9, 2025 to Jul 14, 2025
        const dates = this.generateDateRange('2025-06-09', '2025-07-14');
        const revenueData = [1100, 1300, 1000, 1500, 1200, 1400, 1700, 1300, 1100, 1000, 800, 700, 600, 500, 400, 300, 200, 150, 100, 80, 60, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1, 0, 0, 0, 0, 0];
        const ticketsData = [42, 48, 35, 58, 45, 52, 68, 50, 40, 35, 28, 25, 22, 18, 15, 12, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        this.charts.revenuePurchase = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates.map(date => moment(date).format('MMM DD, YYYY')),
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenueData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Tickets',
                        data: ticketsData,
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#f97316',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Revenue',
                            color: '#64748b'
                        },
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return '€' + (value / 1000).toFixed(1) + 'K';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Tickets',
                            color: '#64748b'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            color: '#64748b'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    createVisitorsCRChart() {
        const ctx = document.getElementById('visitors-cr-chart');
        if (!ctx) return;

        // Sample data for Jun 9, 2025 to Jul 14, 2025
        const dates = this.generateDateRange('2025-06-09', '2025-07-14');
        const visitorsData = [1800, 2000, 1600, 2200, 1900, 2100, 2400, 2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400, 300, 200, 150, 100, 80, 60, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1, 0, 0, 0, 0];
        const crData = [1.2, 1.4, 1.1, 1.6, 1.3, 1.5, 1.8, 1.4, 1.2, 1.1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.08, 0.06, 0.04, 0.03, 0.02, 0.015, 0.01, 0.008, 0.005, 0.003, 0.002, 0.001, 0, 0, 0, 0];

        this.charts.visitorsCR = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates.map(date => moment(date).format('MMM DD, YYYY')),
                datasets: [
                    {
                        label: 'Total views',
                        data: visitorsData,
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'CR',
                        data: crData,
                        borderColor: '#f97316',
                        backgroundColor: 'rgba(249, 115, 22, 0.1)',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#f97316',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#64748b',
                            maxTicksLimit: 8
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Total views',
                            color: '#64748b'
                        },
                        grid: {
                            color: '#f1f5f9'
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return (value / 1000).toFixed(1) + 'K';
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'CR',
                            color: '#64748b'
                        },
                        grid: {
                            drawOnChartArea: false
                        },
                        ticks: {
                            color: '#64748b',
                            callback: function(value) {
                                return value.toFixed(2) + '%';
                            }
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    }

    generateDateRange(startDate, endDate) {
        const dates = [];
        let currentDate = moment(startDate);
        const end = moment(endDate);
        
        while (currentDate.isSameOrBefore(end)) {
            dates.push(currentDate.format('YYYY-MM-DD'));
            currentDate.add(1, 'day');
        }
        
        return dates;
    }

    setupEventListeners() {
        // Add any event listeners here
        const toggleSwitch = document.getElementById('last-year-toggle');
        if (toggleSwitch) {
            toggleSwitch.addEventListener('change', (e) => {
                console.log('Toggle changed:', e.target.checked);
                // Handle toggle change
            });
        }
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DashboardManager();
});