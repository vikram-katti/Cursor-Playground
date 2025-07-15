// GYG Supplier Dashboard JavaScript
class DashboardManager {
    constructor() {
        this.charts = {};
        this.resizeObserver = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        try {
            this.setupEventListeners();
            this.initializeCharts();
            this.setupResizeObserver();
            this.hideLoadingOverlay();
            this.isInitialized = true;
        } catch (error) {
            console.error('Failed to initialize dashboard:', error);
            this.showError('Failed to initialize dashboard. Please refresh the page.');
        }
    }

    initializeCharts() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
            this.showError('Chart.js library is not loaded. Please check your internet connection.');
            return;
        }

        try {
            this.createRevenueTravelChart();
            this.createSourceMarketsChart();
            this.createRevenuePurchaseChart();
            this.createVisitorsCRChart();
        } catch (error) {
            console.error('Failed to create charts:', error);
            this.showError('Failed to create charts. Please refresh the page.');
        }
    }

    createRevenueTravelChart() {
        const ctx = document.getElementById('revenue-travel-chart');
        if (!ctx) {
            console.warn('Revenue travel chart canvas not found');
            return;
        }

        try {
            // Sample data for Jun 9, 2025 to Jul 14, 2025
            const dates = this.generateDateRange('2025-06-09', '2025-07-14');
            const revenueData = [1200, 1400, 1100, 1600, 1300, 1500, 1800, 1400, 1200, 1100, 900, 800, 700, 600, 500, 400, 300, 200, 150, 100, 80, 60, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1, 0, 0, 0, 0];
            const ticketsData = [45, 52, 38, 65, 48, 58, 72, 55, 42, 38, 32, 28, 25, 22, 18, 15, 12, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            // Destroy existing chart if it exists
            if (this.charts.revenueTravel) {
                this.charts.revenueTravel.destroy();
            }

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
                    devicePixelRatio: window.devicePixelRatio || 1,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            titleFont: {
                                size: this.getResponsiveFontSize(12)
                            },
                            bodyFont: {
                                size: this.getResponsiveFontSize(11)
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
                                maxTicksLimit: this.getMaxTicks(),
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                }
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Revenue',
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                color: '#f1f5f9'
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                },
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
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
                    onResize: (chart, size) => {
                        this.handleChartResize(chart, size);
                    }
                }
            });
        } catch (error) {
            console.error('Failed to create revenue travel chart:', error);
            this.showChartError(ctx.parentElement, 'Failed to load revenue travel chart');
        }
    }

    createSourceMarketsChart() {
        const ctx = document.getElementById('source-markets-chart');
        if (!ctx) {
            console.warn('Source markets chart canvas not found');
            return;
        }

        try {
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

            // Destroy existing chart if it exists
            if (this.charts.sourceMarkets) {
                this.charts.sourceMarkets.destroy();
            }

            this.charts.sourceMarkets = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    devicePixelRatio: window.devicePixelRatio || 1,
                    indexAxis: 'y',
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            }
                        },
                        tooltip: {
                            titleFont: {
                                size: this.getResponsiveFontSize(12)
                            },
                            bodyFont: {
                                size: this.getResponsiveFontSize(11)
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Revenue',
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                color: '#f1f5f9'
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                },
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
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                }
                            }
                        }
                    },
                    onResize: (chart, size) => {
                        this.handleChartResize(chart, size);
                    }
                }
            });
        } catch (error) {
            console.error('Failed to create source markets chart:', error);
            this.showChartError(ctx.parentElement, 'Failed to load source markets chart');
        }
    }

    createRevenuePurchaseChart() {
        const ctx = document.getElementById('revenue-purchase-chart');
        if (!ctx) {
            console.warn('Revenue purchase chart canvas not found');
            return;
        }

        try {
            // Sample data for Jun 9, 2025 to Jul 14, 2025
            const dates = this.generateDateRange('2025-06-09', '2025-07-14');
            const revenueData = [1100, 1300, 1000, 1500, 1200, 1400, 1700, 1300, 1100, 1000, 800, 700, 600, 500, 400, 300, 200, 150, 100, 80, 60, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1, 0, 0, 0, 0, 0];
            const ticketsData = [42, 48, 35, 58, 45, 52, 68, 50, 40, 35, 28, 25, 22, 18, 15, 12, 8, 6, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

            // Destroy existing chart if it exists
            if (this.charts.revenuePurchase) {
                this.charts.revenuePurchase.destroy();
            }

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
                    devicePixelRatio: window.devicePixelRatio || 1,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            titleFont: {
                                size: this.getResponsiveFontSize(12)
                            },
                            bodyFont: {
                                size: this.getResponsiveFontSize(11)
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
                                maxTicksLimit: this.getMaxTicks(),
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                }
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Revenue',
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                color: '#f1f5f9'
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                },
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
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    },
                    onResize: (chart, size) => {
                        this.handleChartResize(chart, size);
                    }
                }
            });
        } catch (error) {
            console.error('Failed to create revenue purchase chart:', error);
            this.showChartError(ctx.parentElement, 'Failed to load revenue purchase chart');
        }
    }

    createVisitorsCRChart() {
        const ctx = document.getElementById('visitors-cr-chart');
        if (!ctx) {
            console.warn('Visitors CR chart canvas not found');
            return;
        }

        try {
            // Sample data for Jun 9, 2025 to Jul 14, 2025
            const dates = this.generateDateRange('2025-06-09', '2025-07-14');
            const visitorsData = [1800, 2000, 1600, 2200, 1900, 2100, 2400, 2000, 1800, 1600, 1400, 1200, 1000, 800, 600, 400, 300, 200, 150, 100, 80, 60, 40, 30, 20, 15, 10, 8, 5, 3, 2, 1, 0, 0, 0, 0];
            const crData = [1.2, 1.4, 1.1, 1.6, 1.3, 1.5, 1.8, 1.4, 1.2, 1.1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15, 0.1, 0.08, 0.06, 0.04, 0.03, 0.02, 0.015, 0.01, 0.008, 0.005, 0.003, 0.002, 0.001, 0, 0, 0, 0];

            // Destroy existing chart if it exists
            if (this.charts.visitorsCR) {
                this.charts.visitorsCR.destroy();
            }

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
                    devicePixelRatio: window.devicePixelRatio || 1,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            titleFont: {
                                size: this.getResponsiveFontSize(12)
                            },
                            bodyFont: {
                                size: this.getResponsiveFontSize(11)
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
                                maxTicksLimit: this.getMaxTicks(),
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                }
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Total views',
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                color: '#f1f5f9'
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                },
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
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(12)
                                }
                            },
                            grid: {
                                drawOnChartArea: false
                            },
                            ticks: {
                                color: '#64748b',
                                font: {
                                    size: this.getResponsiveFontSize(11)
                                },
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
                    },
                    onResize: (chart, size) => {
                        this.handleChartResize(chart, size);
                    }
                }
            });
        } catch (error) {
            console.error('Failed to create visitors CR chart:', error);
            this.showChartError(ctx.parentElement, 'Failed to load visitors CR chart');
        }
    }

    generateDateRange(startDate, endDate) {
        if (typeof moment === 'undefined') {
            console.error('Moment.js is not loaded');
            return [];
        }

        try {
            const dates = [];
            let currentDate = moment(startDate);
            const end = moment(endDate);
            
            while (currentDate.isSameOrBefore(end)) {
                dates.push(currentDate.format('YYYY-MM-DD'));
                currentDate.add(1, 'day');
            }
            
            return dates;
        } catch (error) {
            console.error('Failed to generate date range:', error);
            return [];
        }
    }

    setupEventListeners() {
        try {
            // Toggle switch event listener
            const toggleSwitch = document.getElementById('last-year-toggle');
            if (toggleSwitch) {
                toggleSwitch.addEventListener('change', (e) => {
                    console.log('Toggle changed:', e.target.checked);
                    this.handleToggleChange(e.target.checked);
                });
            }

            // Window resize event listener
            window.addEventListener('resize', this.debounce(() => {
                this.handleWindowResize();
            }, 250));

            // Zoom detection
            window.addEventListener('wheel', (e) => {
                if (e.ctrlKey) {
                    // User is zooming
                    this.debounce(() => {
                        this.handleZoomChange();
                    }, 100)();
                }
            });

            // Orientation change for mobile
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    this.handleWindowResize();
                }, 100);
            });

            // Visibility change to handle tab switching
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden && this.isInitialized) {
                    setTimeout(() => {
                        this.refreshCharts();
                    }, 100);
                }
            });
        } catch (error) {
            console.error('Failed to setup event listeners:', error);
        }
    }

    setupResizeObserver() {
        if ('ResizeObserver' in window) {
            this.resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.target.classList.contains('chart-container')) {
                        this.debounce(() => {
                            this.handleChartContainerResize(entry.target);
                        }, 100)();
                    }
                }
            });

            // Observe all chart containers
            const chartContainers = document.querySelectorAll('.chart-container');
            chartContainers.forEach(container => {
                this.resizeObserver.observe(container);
            });
        }
    }

    handleToggleChange(checked) {
        console.log('Handling toggle change:', checked);
        // Add your toggle logic here
    }

    handleWindowResize() {
        if (!this.isInitialized) return;
        
        setTimeout(() => {
            this.refreshCharts();
        }, 100);
    }

    handleZoomChange() {
        if (!this.isInitialized) return;
        
        setTimeout(() => {
            this.refreshCharts();
        }, 150);
    }

    handleChartResize(chart, size) {
        // Handle individual chart resize
        if (chart && chart.update) {
            chart.update('none');
        }
    }

    handleChartContainerResize(container) {
        // Find the chart in this container and update it
        const canvas = container.querySelector('canvas');
        if (canvas) {
            const chartId = canvas.id;
            const chartKey = this.getChartKeyFromId(chartId);
            if (chartKey && this.charts[chartKey]) {
                this.charts[chartKey].resize();
            }
        }
    }

    getChartKeyFromId(id) {
        const idMap = {
            'revenue-travel-chart': 'revenueTravel',
            'source-markets-chart': 'sourceMarkets',
            'revenue-purchase-chart': 'revenuePurchase',
            'visitors-cr-chart': 'visitorsCR'
        };
        return idMap[id];
    }

    refreshCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }

    getResponsiveFontSize(baseSize) {
        const screenWidth = window.innerWidth;
        const zoomLevel = window.devicePixelRatio || 1;
        
        let scaleFactor = 1;
        if (screenWidth < 480) {
            scaleFactor = 0.8;
        } else if (screenWidth < 768) {
            scaleFactor = 0.9;
        }
        
        return Math.max(10, baseSize * scaleFactor / zoomLevel);
    }

    getMaxTicks() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) return 4;
        if (screenWidth < 768) return 6;
        return 8;
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }

    showError(message) {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.innerHTML = `
                <div style="text-align: center; color: #ef4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>${message}</p>
                    <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
            overlay.style.display = 'flex';
        }
    }

    showChartError(container, message) {
        if (container) {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; min-height: 200px; text-align: center; color: #ef4444;">
                    <div>
                        <i class="fas fa-chart-line" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>${message}</p>
                    </div>
                </div>
            `;
        }
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Cleanup method
    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
        
        this.charts = {};
        this.isInitialized = false;
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new DashboardManager();
    } catch (error) {
        console.error('Failed to initialize dashboard manager:', error);
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.dashboardManager) {
        window.dashboardManager.destroy();
    }
});