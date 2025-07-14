// GYG Supplier Dashboard JavaScript
class DashboardManager {
    constructor() {
        this.charts = {};
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.updateDateTime();
        this.initializeCharts();
        this.setupEventListeners();
        this.hideLoadingOverlay();
        this.startRealTimeUpdates();
        this.updateMetricCards();
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeToggleButton();
    }

    updateThemeToggleButton() {
        const btn = document.getElementById('theme-toggle-btn');
        const icon = btn.querySelector('i');
        
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeToggleButton();
        this.updateChartsTheme();
    }

    updateDateTime() {
        const datetimeElement = document.getElementById('current-datetime');
        const updateTime = () => {
            const now = new Date();
            datetimeElement.textContent = now.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    initializeCharts() {
        this.createUptimeChart();
        this.createErrorChart();
        this.updateMetricColors();
    }

    createUptimeChart() {
        const ctx = document.getElementById('uptime-chart');
        if (!ctx) return;
        const period = document.getElementById('uptime-period').value;
        const data = dashboardData.timeSeriesData.uptime[period];
        // Example benchmark: industry average for the same period
        const benchmarkValue = dashboardData.benchmarking.uptime.industryAverage;
        const benchmarkData = data.map(() => benchmarkValue);
        this.charts.uptime = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => moment(item.date).format('MMM DD')),
                datasets: [
                    {
                        label: 'Uptime (%)',
                        data: data.map(item => item.value),
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Benchmark',
                        data: benchmarkData,
                        borderColor: '#64748b',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#2563eb',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid')
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 90,
                        max: 100,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid')
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
                            callback: function(value) {
                                return value + '%';
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

    createErrorChart() {
        const ctx = document.getElementById('error-chart');
        if (!ctx) return;
        const period = document.getElementById('error-period').value;
        const data = dashboardData.timeSeriesData.errorRate[period];
        // Example benchmark: industry average for the same period
        const benchmarkValue = dashboardData.benchmarking.errorRate.industryAverage;
        const benchmarkData = data.map(() => benchmarkValue);
        this.charts.error = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => moment(item.date).format('MMM DD')),
                datasets: [
                    {
                        label: 'Error Rate (%)',
                        data: data.map(item => item.value),
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Benchmark',
                        data: benchmarkData,
                        borderColor: '#64748b',
                        borderWidth: 2,
                        borderDash: [6, 6],
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#ef4444',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid')
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary')
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 3,
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid')
                        },
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'),
                            callback: function(value) {
                                return value + '%';
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

    updateChartsTheme() {
        const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--chart-grid');
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');

        Object.values(this.charts).forEach(chart => {
            if (chart.options.scales) {
                chart.options.scales.x.grid.color = gridColor;
                chart.options.scales.y.grid.color = gridColor;
                chart.options.scales.x.ticks.color = textColor;
                chart.options.scales.y.ticks.color = textColor;
            }
            chart.update();
        });
    }

    updateMetricColors() {
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach(card => {
            const values = card.querySelectorAll('.value');
            values.forEach(value => {
                const numValue = parseFloat(value.dataset.value);
                if (card.classList.contains('uptime')) {
                    if (numValue >= 98) value.style.color = '#10b981';
                    else if (numValue >= 95) value.style.color = '#f59e0b';
                    else value.style.color = '#ef4444';
                } else if (card.classList.contains('error-rate')) {
                    if (numValue <= 0.5) value.style.color = '#10b981';
                    else if (numValue <= 1.5) value.style.color = '#f59e0b';
                    else value.style.color = '#ef4444';
                } else if (card.classList.contains('revenue-impact')) {
                    if (numValue <= 500) value.style.color = '#10b981';
                    else if (numValue <= 2000) value.style.color = '#f59e0b';
                    else value.style.color = '#ef4444';
                }
            });
        });
    }

    setupEventListeners() {
        // Period selector changes
        document.getElementById('uptime-period')?.addEventListener('change', (e) => {
            this.updateChartData('uptime', e.target.value);
        });

        document.getElementById('error-period')?.addEventListener('change', (e) => {
            this.updateChartData('error', e.target.value);
        });

        // Add hover effects to metric cards
        document.querySelectorAll('.metric-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        // Add click effects to recommendation cards
        document.querySelectorAll('.recommendation-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.action-link')) {
                    card.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
    }

    updateChartData(chartType, period) {
        const chart = this.charts[chartType];
        if (!chart) return;

        const data = dashboardData.timeSeriesData[chartType === 'uptime' ? 'uptime' : 'errorRate'][period];
        
        chart.data.labels = data.map(item => moment(item.date).format('MMM DD'));
        chart.data.datasets[0].data = data.map(item => item.value);
        chart.update();
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }, 1000);
        }
    }

    startRealTimeUpdates() {
        // Simulate real-time status updates
        setInterval(() => {
            this.updateStatusIndicator();
        }, 30000); // Update every 30 seconds
    }

    updateStatusIndicator() {
        const statusIndicator = document.querySelector('.status-indicator');
        if (statusIndicator) {
            // Simulate occasional status changes
            if (Math.random() < 0.1) { // 10% chance of status change
                const isOnline = Math.random() > 0.3; // 70% chance of being online
                statusIndicator.className = `status-indicator ${isOnline ? 'online' : 'offline'}`;
                statusIndicator.querySelector('span').textContent = isOnline ? 'Online' : 'Offline';
            }
        }
    }

    // Add this to update metric cards with values and revenue loss
    updateMetricCards() {
        // Uptime
        const uptime1d = dashboardData.metrics.uptime['1d'];
        const uptime7d = dashboardData.metrics.uptime['7d'];
        const uptime30d = dashboardData.metrics.uptime['30d'];
        const uptimeTrends = [uptime1d, uptime7d, uptime30d];
        const uptimeBench = dashboardData.benchmarking.uptime.industryAverage;
        const revenueUptime = [dashboardData.metrics.lostRevenue['1d'], dashboardData.metrics.lostRevenue['7d'], dashboardData.metrics.lostRevenue['30d']];
        ['1d','7d','30d'].forEach((period, i) => {
            document.getElementById(`uptime-${period}`).textContent = uptimeTrends[i] + '%';
            document.getElementById(`revenue-uptime-${period}`).textContent = `Est. Revenue Loss: $${revenueUptime[i].toLocaleString()}`;
            const trend = uptimeTrends[i] - uptimeBench;
            const trendElem = document.getElementById(`uptime-${period}-trend`);
            if (trendElem) {
                trendElem.innerHTML = trend >= 0 ? `<span class='trend up'><i class='fas fa-arrow-up'></i> +${trend.toFixed(1)}%</span>` : `<span class='trend down'><i class='fas fa-arrow-down'></i> ${trend.toFixed(1)}%</span>`;
            }
        });
        // Error Rate
        const error1d = dashboardData.metrics.errorRate['1d'];
        const error7d = dashboardData.metrics.errorRate['7d'];
        const error30d = dashboardData.metrics.errorRate['30d'];
        const errorTrends = [error1d, error7d, error30d];
        const errorBench = dashboardData.benchmarking.errorRate.industryAverage;
        const revenueError = [dashboardData.metrics.lostRevenue['1d'], dashboardData.metrics.lostRevenue['7d'], dashboardData.metrics.lostRevenue['30d']];
        ['1d','7d','30d'].forEach((period, i) => {
            document.getElementById(`error-${period}`).textContent = errorTrends[i] + '%';
            document.getElementById(`revenue-error-${period}`).textContent = `Est. Revenue Loss: $${revenueError[i].toLocaleString()}`;
            const trend = errorTrends[i] - errorBench;
            const trendElem = document.getElementById(`error-${period}-trend`);
            if (trendElem) {
                trendElem.innerHTML = trend >= 0 ? `<span class='trend up'><i class='fas fa-arrow-up'></i> +${trend.toFixed(1)}%</span>` : `<span class='trend down'><i class='fas fa-arrow-down'></i> ${trend.toFixed(1)}%</span>`;
            }
        });
    }
}

// Export and Download Functions
function downloadChart(chartId) {
    const chart = dashboardManager.charts[chartId === 'uptime-chart' ? 'uptime' : 'error'];
    if (chart) {
        const link = document.createElement('a');
        link.download = `${chartId}-${new Date().toISOString().split('T')[0]}.png`;
        link.href = chart.toBase64Image();
        link.click();
    }
}

function exportDashboard(format) {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.opacity = '1';

    setTimeout(() => {
        if (format === 'pdf') {
            // Simulate PDF generation
            alert('PDF report generation started. You will receive an email when ready.');
        } else if (format === 'csv') {
            // Generate CSV data
            const csvData = generateCSVData();
            downloadCSV(csvData, `gyg-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
        }
        
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 300);
    }, 2000);
}

function generateCSVData() {
    const headers = ['Date', 'Uptime (%)', 'Error Rate (%)', 'Lost Revenue ($)'];
    const data = dashboardData.timeSeriesData.uptime['30'].map((item, index) => {
        const errorItem = dashboardData.timeSeriesData.errorRate['30'][index];
        const revenueItem = dashboardData.timeSeriesData.revenue['30'][index];
        return [
            item.date,
            item.value,
            errorItem ? errorItem.value : '',
            revenueItem ? revenueItem.value : ''
        ];
    });
    
    return [headers, ...data].map(row => row.join(',')).join('\n');
}

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

function shareReport() {
    const shareData = {
        title: 'GYG Supplier Dashboard Report',
        text: 'Check out our latest performance metrics and recommendations.',
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData);
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text + '\n\n' + shareData.url)}`;
        window.open(url);
    }
}

// Global theme toggle function
function toggleTheme() {
    dashboardManager.toggleTheme();
}

// Initialize dashboard when DOM is loaded
let dashboardManager;

document.addEventListener('DOMContentLoaded', () => {
    dashboardManager = new DashboardManager();
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'd':
                e.preventDefault();
                toggleTheme();
                break;
            case 'e':
                e.preventDefault();
                exportDashboard('csv');
                break;
            case 'p':
                e.preventDefault();
                exportDashboard('pdf');
                break;
        }
    }
});

// Add tooltips for better UX
document.addEventListener('DOMContentLoaded', () => {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
});

// Performance monitoring
window.addEventListener('load', () => {
    // Log dashboard load time
    const loadTime = performance.now();
    console.log(`Dashboard loaded in ${loadTime.toFixed(2)}ms`);
    
    // Monitor for any console errors
    const originalError = console.error;
    console.error = function(...args) {
        originalError.apply(console, args);
        // Could send error to analytics service here
    };
});

// Export functions for global access
window.downloadChart = downloadChart;
window.exportDashboard = exportDashboard;
window.shareReport = shareReport;
window.toggleTheme = toggleTheme;