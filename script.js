// GYG Supplier Dashboard JavaScript
class DashboardManager {
    constructor() {
        this.charts = {};
        this.chartConfigs = {};
        this.resizeObserver = null;
        this.isDestroyed = false;
        
        // Bind methods to maintain context
        this.handleResize = this.handleResize.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        
        this.init();
    }

    init() {
        try {
            // Check if required dependencies are available
            if (!window.Chart || !window.moment) {
                console.error('Required dependencies (Chart.js or Moment.js) not found');
                this.showError('Required dependencies not loaded');
                return;
            }

            // Set up event listeners first
            this.setupEventListeners();
            
            // Initialize charts with delay to ensure DOM is ready
            setTimeout(() => {
                this.initializeCharts();
                this.hideLoadingOverlay();
            }, 100);
            
        } catch (error) {
            console.error('Dashboard initialization failed:', error);
            this.showError('Dashboard initialization failed');
        }
    }

    initializeCharts() {
        try {
            // Create charts with error handling for each one
            this.createRevenueTravelChart();
            this.createSourceMarketsChart();
            this.createRevenuePurchaseChart();
            this.createVisitorsCRChart();
            
            // Set up resize observer for responsive behavior
            this.setupResizeObserver();
            
        } catch (error) {
            console.error('Chart initialization failed:', error);
            this.showError('Chart initialization failed');
        }
    }

    createRevenueTravelChart() {
        try {
            const ctx = document.getElementById('revenue-travel-chart');
            if (!ctx) {
                console.warn('Revenue travel chart canvas not found');
                return;
            }

            // Clean up existing chart if it exists
            if (this.charts.revenueTravel) {
                this.charts.revenueTravel.destroy();
            }

            // Sample data for Jun 9, 2025 to Jul 14, 2025
            const dates = this.generateDateRange('2025-06-09', '2025-07-14');
            const revenueData = this.generateSampleData(dates.length, 1200, 200, 1800);
            const ticketsData = this.generateSampleData(dates.length, 45, 10, 75);

            const config = {
                type: 'line',
                data: {
                    labels: dates.map(date => {
                        try {
                            return moment(date).format('MMM DD, YYYY');
                        } catch (e) {
                            return date;
                        }
                    }),
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
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
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
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.datasetIndex === 0) {
                                        label += '€' + context.parsed.y.toLocaleString();
                                    } else {
                                        label += context.parsed.y.toLocaleString();
                                    }
                                    return label;
                                }
                            }
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
                    }
                }
            };

            this.charts.revenueTravel = new Chart(ctx, config);
            this.chartConfigs.revenueTravel = config;
            
        } catch (error) {
            console.error('Failed to create revenue travel chart:', error);
            this.showChartError('revenue-travel-chart', 'Failed to load revenue travel chart');
        }
    }

    createSourceMarketsChart() {
        try {
            const ctx = document.getElementById('source-markets-chart');
            if (!ctx) {
                console.warn('Source markets chart canvas not found');
                return;
            }

            // Clean up existing chart if it exists
            if (this.charts.sourceMarkets) {
                this.charts.sourceMarkets.destroy();
            }

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

            const config = {
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
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return 'Revenue: €' + context.parsed.x.toLocaleString();
                                }
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
            };

            this.charts.sourceMarkets = new Chart(ctx, config);
            this.chartConfigs.sourceMarkets = config;
            
        } catch (error) {
            console.error('Failed to create source markets chart:', error);
            this.showChartError('source-markets-chart', 'Failed to load source markets chart');
        }
    }

    createRevenuePurchaseChart() {
        try {
            const ctx = document.getElementById('revenue-purchase-chart');
            if (!ctx) {
                console.warn('Revenue purchase chart canvas not found');
                return;
            }

            // Clean up existing chart if it exists
            if (this.charts.revenuePurchase) {
                this.charts.revenuePurchase.destroy();
            }

            // Sample data for Jun 9, 2025 to Jul 14, 2025
            const dates = this.generateDateRange('2025-06-09', '2025-07-14');
            const revenueData = this.generateSampleData(dates.length, 1100, 200, 1700);
            const ticketsData = this.generateSampleData(dates.length, 42, 8, 70);

            const config = {
                type: 'line',
                data: {
                    labels: dates.map(date => {
                        try {
                            return moment(date).format('MMM DD, YYYY');
                        } catch (e) {
                            return date;
                        }
                    }),
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
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
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
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.datasetIndex === 0) {
                                        label += '€' + context.parsed.y.toLocaleString();
                                    } else {
                                        label += context.parsed.y.toLocaleString();
                                    }
                                    return label;
                                }
                            }
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
                    }
                }
            };

            this.charts.revenuePurchase = new Chart(ctx, config);
            this.chartConfigs.revenuePurchase = config;
            
        } catch (error) {
            console.error('Failed to create revenue purchase chart:', error);
            this.showChartError('revenue-purchase-chart', 'Failed to load revenue purchase chart');
        }
    }

    createVisitorsCRChart() {
        try {
            const ctx = document.getElementById('visitors-cr-chart');
            if (!ctx) {
                console.warn('Visitors CR chart canvas not found');
                return;
            }

            // Clean up existing chart if it exists
            if (this.charts.visitorsCR) {
                this.charts.visitorsCR.destroy();
            }

            // Sample data for Jun 9, 2025 to Jul 14, 2025
            const dates = this.generateDateRange('2025-06-09', '2025-07-14');
            const visitorsData = this.generateSampleData(dates.length, 1800, 500, 2500);
            const crData = this.generateSampleData(dates.length, 1.2, 0.5, 2.0);

            const config = {
                type: 'line',
                data: {
                    labels: dates.map(date => {
                        try {
                            return moment(date).format('MMM DD, YYYY');
                        } catch (e) {
                            return date;
                        }
                    }),
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
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
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
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.datasetIndex === 0) {
                                        label += context.parsed.y.toLocaleString();
                                    } else {
                                        label += context.parsed.y.toFixed(2) + '%';
                                    }
                                    return label;
                                }
                            }
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
                    }
                }
            };

            this.charts.visitorsCR = new Chart(ctx, config);
            this.chartConfigs.visitorsCR = config;
            
        } catch (error) {
            console.error('Failed to create visitors CR chart:', error);
            this.showChartError('visitors-cr-chart', 'Failed to load visitors CR chart');
        }
    }

    generateDateRange(startDate, endDate) {
        try {
            const dates = [];
            let currentDate = moment(startDate);
            const end = moment(endDate);
            
            // Safety check to prevent infinite loops
            let iterationCount = 0;
            const maxIterations = 100;
            
            while (currentDate.isSameOrBefore(end) && iterationCount < maxIterations) {
                dates.push(currentDate.format('YYYY-MM-DD'));
                currentDate.add(1, 'day');
                iterationCount++;
            }
            
            return dates.length > 0 ? dates : [startDate, endDate];
        } catch (error) {
            console.error('Error generating date range:', error);
            return [startDate, endDate];
        }
    }

    generateSampleData(length, baseValue, minValue, maxValue) {
        try {
            const data = [];
            for (let i = 0; i < length; i++) {
                // Generate realistic data with some variation
                const variation = (Math.random() - 0.5) * (maxValue - minValue) * 0.3;
                const value = Math.max(minValue, Math.min(maxValue, baseValue + variation));
                data.push(Math.round(value * 100) / 100);
            }
            return data;
        } catch (error) {
            console.error('Error generating sample data:', error);
            return Array(length).fill(baseValue);
        }
    }

    setupEventListeners() {
        try {
            // Toggle switch listener
            const toggleSwitch = document.getElementById('last-year-toggle');
            if (toggleSwitch) {
                toggleSwitch.addEventListener('change', (e) => {
                    console.log('Toggle changed:', e.target.checked);
                    // Handle toggle change
                });
            }

            // Window resize listener
            window.addEventListener('resize', this.handleResize);
            
            // Visibility change listener (for performance optimization)
            document.addEventListener('visibilitychange', this.handleVisibilityChange);
            
            // Error handling for global errors
            window.addEventListener('error', (e) => {
                console.error('Global error:', e.error);
            });
            
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    setupResizeObserver() {
        try {
            if (window.ResizeObserver) {
                this.resizeObserver = new ResizeObserver((entries) => {
                    if (this.isDestroyed) return;
                    
                    // Debounce resize events
                    clearTimeout(this.resizeTimeout);
                    this.resizeTimeout = setTimeout(() => {
                        this.handleChartResize();
                    }, 100);
                });

                // Observe chart containers
                const chartContainers = document.querySelectorAll('.chart-container');
                chartContainers.forEach(container => {
                    this.resizeObserver.observe(container);
                });
            }
        } catch (error) {
            console.error('Error setting up resize observer:', error);
        }
    }

    handleResize() {
        if (this.isDestroyed) return;
        
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.handleChartResize();
        }, 250);
    }

    handleChartResize() {
        try {
            Object.values(this.charts).forEach(chart => {
                if (chart && typeof chart.resize === 'function') {
                    chart.resize();
                }
            });
        } catch (error) {
            console.error('Error handling chart resize:', error);
        }
    }

    handleVisibilityChange() {
        try {
            if (document.hidden) {
                // Page is hidden, pause any animations or updates
                Object.values(this.charts).forEach(chart => {
                    if (chart && chart.options && chart.options.animation) {
                        chart.options.animation.duration = 0;
                    }
                });
            } else {
                // Page is visible, resume animations
                Object.values(this.charts).forEach(chart => {
                    if (chart && chart.options && chart.options.animation) {
                        chart.options.animation.duration = 400;
                    }
                });
            }
        } catch (error) {
            console.error('Error handling visibility change:', error);
        }
    }

    hideLoadingOverlay() {
        try {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 300);
                }, 500);
            }
        } catch (error) {
            console.error('Error hiding loading overlay:', error);
        }
    }

    showError(message) {
        try {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.innerHTML = `
                    <div style="text-align: center; color: #ef4444;">
                        <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                        <p>${message}</p>
                        <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                            Reload Page
                        </button>
                    </div>
                `;
                overlay.style.display = 'flex';
            }
        } catch (error) {
            console.error('Error showing error message:', error);
        }
    }

    showChartError(chartId, message) {
        try {
            const canvas = document.getElementById(chartId);
            if (canvas) {
                const container = canvas.parentElement;
                if (container) {
                    container.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: center; min-height: 200px; text-align: center; color: #64748b;">
                            <div>
                                <i class="fas fa-chart-line" style="font-size: 2rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
                                <p style="margin: 0;">${message}</p>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Error showing chart error:', error);
        }
    }

    // Clean up method to prevent memory leaks
    destroy() {
        try {
            this.isDestroyed = true;
            
            // Clean up charts
            Object.values(this.charts).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                }
            });
            this.charts = {};
            this.chartConfigs = {};
            
            // Clean up resize observer
            if (this.resizeObserver) {
                this.resizeObserver.disconnect();
                this.resizeObserver = null;
            }
            
            // Clean up event listeners
            window.removeEventListener('resize', this.handleResize);
            document.removeEventListener('visibilitychange', this.handleVisibilityChange);
            
            // Clear timeouts
            if (this.resizeTimeout) {
                clearTimeout(this.resizeTimeout);
            }
            
        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }
}

// Initialize dashboard when DOM is loaded
let dashboardInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    try {
        dashboardInstance = new DashboardManager();
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (dashboardInstance) {
        dashboardInstance.destroy();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardManager;
}