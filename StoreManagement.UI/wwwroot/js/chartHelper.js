// Performance Chart Function
window.createPerformanceChart = function(canvasId, data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) {
        console.error('Canvas element not found:', canvasId);
        return false;
    }

    // Destroy existing chart if it exists
    if (window.performanceChart) {
        window.performanceChart.destroy();
    }

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 51, 51, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(0, 212, 170, 0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(176, 196, 196, 0.8)',
                        font: { size: 11 }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 1,
                    max: 7,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgb(0, 212, 170)',
                        font: { size: 11, weight: 'bold' },
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    min: 1,
                    max: 7,
                    grid: {
                        drawOnChartArea: false,
                        color: 'rgba(255, 255, 255, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgb(74, 144, 226)',
                        font: { size: 11, weight: 'bold' },
                        callback: function(value) {
                            return value.toFixed(0);
                        }
                    }
                }
            }
        }
    };

    try {
        window.performanceChart = new Chart(ctx, config);
        return true;
    } catch (error) {
        console.error('Error creating performance chart:', error);
        return false;
    }
};

window.chartHelper = {
    charts: {},

    createChart: function (canvasId, config) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) {
            console.error('Canvas element not found:', canvasId);
            return false;
        }

        // Destroy existing chart if it exists
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
        }

        try {
            this.charts[canvasId] = new Chart(ctx, config);
            return true;
        } catch (error) {
            console.error('Error creating chart:', error);
            return false;
        }
    },

    updateChart: function (canvasId, config) {
        if (this.charts[canvasId]) {
            // Update the chart data
            this.charts[canvasId].data = config.data;
            this.charts[canvasId].update();
            return true;
        }
        return false;
    },

    destroyChart: function (canvasId) {
        if (this.charts[canvasId]) {
            this.charts[canvasId].destroy();
            delete this.charts[canvasId];
            return true;
        }
        return false;
    },

    // Predefined chart configurations
    getBarChartConfig: function (labels, data, label, colors) {
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: label || 'Dataset',
                    data: data,
                    backgroundColor: colors || [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: colors ? colors.map(color => color.replace('0.2', '1')) : [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    },

    getLineChartConfig: function (labels, data, label, color) {
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label || 'Dataset',
                    data: data,
                    borderColor: color || 'rgb(255, 99, 132)',
                    backgroundColor: color ? color.replace('rgb', 'rgba').replace(')', ', 0.2)') : 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };
    },

    getPieChartConfig: function (labels, data, colors) {
        return {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors || [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12
                            },
                            boxWidth: 12
                        }
                    },
                    title: {
                        display: false
                    }
                }
            }
        };
    },

    getDualAxisChartConfig: function (labels, primaryData, secondaryData, primaryLabel, secondaryLabel, primaryColor, secondaryColor) {
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: primaryLabel,
                        data: primaryData,
                        borderColor: primaryColor,
                        backgroundColor: primaryColor.replace('rgb', 'rgba').replace(')', ', 0.1)'),
                        yAxisID: 'y',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: false
                    },
                    {
                        label: secondaryLabel,
                        data: secondaryData,
                        borderColor: secondaryColor,
                        backgroundColor: secondaryColor.replace('rgb', 'rgba').replace(')', ', 0.1)'),
                        yAxisID: 'y1',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: primaryColor,
                            callback: function(value) {
                                return value.toFixed(1);
                            }
                        },
                        title: {
                            display: true,
                            text: primaryLabel,
                            color: primaryColor
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: secondaryColor,
                            callback: function(value) {
                                return value.toFixed(1);
                            }
                        },
                        title: {
                            display: true,
                            text: secondaryLabel,
                            color: secondaryColor
                        }
                    }
                }
            }
        };
    },

    getSolarChartConfig: function (labels, primaryData, secondaryData, primaryLabel, secondaryLabel) {
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: primaryLabel,
                        data: primaryData,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        yAxisID: 'y',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#2ecc71',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#2ecc71',
                        pointHoverBorderColor: '#ffffff',
                        fill: false
                    },
                    {
                        label: secondaryLabel,
                        data: secondaryData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        yAxisID: 'y1',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#3498db',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: '#3498db',
                        pointHoverBorderColor: '#ffffff',
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false // We'll use custom legend
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.95)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                        borderColor: 'rgba(52, 152, 219, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            labelColor: function(context) {
                                return {
                                    borderColor: context.dataset.borderColor,
                                    backgroundColor: context.dataset.borderColor,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                };
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 1,
                        max: 5,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#2ecc71',
                            font: {
                                size: 11,
                                weight: 'bold'
                            },
                            callback: function(value) {
                                return value.toFixed(0);
                            },
                            stepSize: 1
                        },
                        border: {
                            display: false
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min: 1,
                        max: 7,
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#3498db',
                            font: {
                                size: 11,
                                weight: 'bold'
                            },
                            callback: function(value) {
                                return value.toFixed(0);
                            },
                            stepSize: 1
                        },
                        border: {
                            display: false
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        };
    },

    getDoughnutChartConfig: function (labels, data, colors) {
        return {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors || [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(199, 199, 199, 0.8)',
                        'rgba(83, 102, 255, 0.8)'
                    ],
                    borderColor: colors ? colors.map(color => color.replace('0.8', '1')) : [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(83, 102, 255, 1)'
                    ],
                    borderWidth: 2,
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 1,
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20,
                        left: 20,
                        right: 20
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: {
                                size: 12
                            },
                            boxWidth: 12
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        };
    },

    getAreaChartConfig: function (labels, data, label, backgroundColor) {
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label || 'Area Dataset',
                    data: data,
                    borderColor: backgroundColor ? backgroundColor.replace('0.4', '1') : 'rgba(75, 192, 192, 1)',
                    backgroundColor: backgroundColor || 'rgba(75, 192, 192, 0.4)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointHoverRadius: 8,
                    pointBackgroundColor: backgroundColor ? backgroundColor.replace('0.4', '1') : 'rgba(75, 192, 192, 1)',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    y: {
                        display: true,
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        };
    },

    getGenerationChartConfig: function (labels, data, label) {
        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label || 'Energy Generated (MWh)',
                    data: data,
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.3)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#ff9800',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointHoverBackgroundColor: '#ff9800',
                    pointHoverBorderColor: '#ffffff',
                    pointHoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false // We'll use custom legend
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.95)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                        borderColor: 'rgba(255, 152, 0, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return `Energy Generated (MWh): ${context.parsed.y.toFixed(2)} MWh`;
                            },
                            labelColor: function(context) {
                                return {
                                    borderColor: '#ff9800',
                                    backgroundColor: '#ff9800',
                                    borderWidth: 2,
                                    borderRadius: 2,
                                };
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        display: true,
                        min: 0,
                        max: 10,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return value.toFixed(0);
                            },
                            stepSize: 2
                        },
                        border: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Energy Generated (MWh)',
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        };
    },

    getLossSummaryChartConfig: function(labels, data) {
        const datasets = [
            {
                label: 'Soiling Loss',
                data: labels.map(label => data[label]['Soiling'] || 0),
                backgroundColor: '#ff6b6b',
                borderColor: '#ff6b6b',
                borderWidth: 0
            },
            {
                label: 'Shading Loss',
                data: labels.map(label => data[label]['Shading'] || 0),
                backgroundColor: '#ffd93d',
                borderColor: '#ffd93d',
                borderWidth: 0
            },
            {
                label: 'Downtime Loss',
                data: labels.map(label => data[label]['Downtime'] || 0),
                backgroundColor: '#6bcf7f',
                borderColor: '#6bcf7f',
                borderWidth: 0
            },
            {
                label: 'Thermal Loss',
                data: labels.map(label => data[label]['Thermal'] || 0),
                backgroundColor: '#ff9800',
                borderColor: '#ff9800',
                borderWidth: 0
            },
            {
                label: 'Inverter Loss',
                data: labels.map(label => data[label]['Inverter'] || 0),
                backgroundColor: '#9c27b0',
                borderColor: '#9c27b0',
                borderWidth: 0
            },
            {
                label: 'Clipping Loss',
                data: labels.map(label => data[label]['Clipping'] || 0),
                backgroundColor: '#4caf50',
                borderColor: '#4caf50',
                borderWidth: 0
            },
            {
                label: 'Curtailment Loss',
                data: labels.map(label => data[label]['Curtailment'] || 0),
                backgroundColor: '#f44336',
                borderColor: '#f44336',
                borderWidth: 0
            }
        ];

        const config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' kWh';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#bdc3c7',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        stacked: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#bdc3c7',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                if (value >= 1000) {
                                    return (value / 1000).toFixed(1) + 'k';
                                }
                                return value;
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        return config;
    },

    getHourlyGenerationChartConfig: function(data, legendLabel) {
        const dates = Object.keys(data);
        const hours = Array.from({length: 24}, (_, i) => {
            const hour = i.toString().padStart(2, '0') + ':00';
            return hour;
        });

        // Create datasets for each day
        const datasets = dates.map((date, index) => {
            const colors = [
                '#ff9800', '#ff8f00', '#ff6f00', '#e65100',
                '#ff5722', '#f4511e', '#e64a19', '#d84315'
            ];

            return {
                label: date,
                data: data[date],
                backgroundColor: colors[index % colors.length],
                borderColor: colors[index % colors.length],
                borderWidth: 0,
                borderRadius: 2,
                borderSkipped: false,
                categoryPercentage: 0.8,
                barPercentage: 0.9
            };
        });

        const config = {
            type: 'bar',
            data: {
                labels: hours,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' kWh';
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
                            color: '#bdc3c7',
                            font: {
                                size: 10
                            },
                            maxRotation: 45,
                            minRotation: 0,
                            callback: function(value, index) {
                                // Show every 2nd hour to avoid crowding
                                return index % 2 === 0 ? this.getLabelForValue(value) : '';
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#bdc3c7',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return value.toFixed(0);
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        };

        return config;
    },

    getPerformanceChartConfig: function(labels, actualData, expectedData, efficiencyData) {
        const actualValues = Object.values(actualData);
        const expectedValues = Object.values(expectedData);
        const efficiencyValues = Object.values(efficiencyData);

        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Actual Performance',
                        data: actualValues,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        yAxisID: 'y',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#3498db',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Expected Performance',
                        data: expectedValues,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        yAxisID: 'y',
                        tension: 0.4,
                        borderWidth: 2,
                        borderDash: [5, 5],
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Efficiency Ratio',
                        data: efficiencyValues,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        yAxisID: 'y1',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#2ecc71',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(30, 60, 114, 0.95)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                        borderColor: 'rgba(52, 152, 219, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            labelColor: function(context) {
                                return {
                                    borderColor: context.dataset.borderColor,
                                    backgroundColor: context.dataset.borderColor,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                };
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 0,
                        max: 5,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#3498db',
                            font: {
                                size: 11,
                                weight: 'bold'
                            },
                            callback: function(value) {
                                return value.toFixed(1) + ' MW';
                            }
                        },
                        border: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Power Output (MW)',
                            color: '#3498db',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        min: 0,
                        max: 100,
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#2ecc71',
                            font: {
                                size: 11,
                                weight: 'bold'
                            },
                            callback: function(value) {
                                return value.toFixed(0) + '%';
                            }
                        },
                        border: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Efficiency (%)',
                            color: '#2ecc71',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        };
    },

    getDegradationChartConfig: function(labels, performanceData, trendData, baselineData) {
        const performanceValues = Object.values(performanceData);
        const trendValues = Object.values(trendData);
        const baselineValues = Object.values(baselineData);

        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Performance Ratio',
                        data: performanceValues,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.3,
                        borderWidth: 3,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#3498db',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Degradation Trend',
                        data: trendValues,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.3,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Expected Baseline',
                        data: baselineValues,
                        borderColor: '#95a5a6',
                        backgroundColor: 'rgba(149, 165, 166, 0.1)',
                        tension: 0.3,
                        borderWidth: 2,
                        borderDash: [8, 4],
                        pointRadius: 3,
                        pointHoverRadius: 5,
                        pointBackgroundColor: '#95a5a6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 1,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(142, 68, 173, 0.95)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                        borderColor: 'rgba(155, 89, 182, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                            },
                            labelColor: function(context) {
                                return {
                                    borderColor: context.dataset.borderColor,
                                    backgroundColor: context.dataset.borderColor,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                };
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Year',
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        display: true,
                        min: 95,
                        max: 100.5,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return value.toFixed(1) + '%';
                            }
                        },
                        border: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Performance Ratio (%)',
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        };
    },

    getWeatherChartConfig: function(labels, irradianceData, temperatureData, outputData, efficiencyData) {
        const irradianceValues = Object.values(irradianceData);
        const temperatureValues = Object.values(temperatureData);
        const outputValues = Object.values(outputData);
        const efficiencyValues = Object.values(efficiencyData);

        return {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Solar Irradiance (W/m²)',
                        data: irradianceValues,
                        borderColor: '#f39c12',
                        backgroundColor: 'rgba(243, 156, 18, 0.1)',
                        yAxisID: 'y',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#f39c12',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Temperature (°C)',
                        data: temperatureValues,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        yAxisID: 'y1',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Power Output (MW)',
                        data: outputValues,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        yAxisID: 'y2',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: '#3498db',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    },
                    {
                        label: 'Efficiency (%)',
                        data: efficiencyValues,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        yAxisID: 'y3',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6,
                        pointBackgroundColor: '#2ecc71',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(22, 160, 133, 0.95)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                        borderColor: 'rgba(26, 188, 156, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const dataset = context.dataset;
                                const value = context.parsed.y;

                                if (dataset.label.includes('Irradiance')) {
                                    return dataset.label + ': ' + value.toFixed(0) + ' W/m²';
                                } else if (dataset.label.includes('Temperature')) {
                                    return dataset.label + ': ' + value.toFixed(1) + '°C';
                                } else if (dataset.label.includes('Output')) {
                                    return dataset.label + ': ' + value.toFixed(1) + ' MW';
                                } else if (dataset.label.includes('Efficiency')) {
                                    return dataset.label + ': ' + value.toFixed(1) + '%';
                                }
                                return dataset.label + ': ' + value.toFixed(1);
                            },
                            labelColor: function(context) {
                                return {
                                    borderColor: context.dataset.borderColor,
                                    backgroundColor: context.dataset.borderColor,
                                    borderWidth: 2,
                                    borderRadius: 2,
                                };
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        min: 0,
                        max: 1200,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#f39c12',
                            font: {
                                size: 10
                            },
                            callback: function(value) {
                                return value.toFixed(0);
                            }
                        },
                        border: {
                            display: false
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: false,
                        position: 'right',
                        min: 15,
                        max: 40,
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    y2: {
                        type: 'linear',
                        display: false,
                        min: 0,
                        max: 6
                    },
                    y3: {
                        type: 'linear',
                        display: false,
                        min: 75,
                        max: 100
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                }
            }
        };
    },

    getSolarModulesChartConfig: function(labels, data) {
        return {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Module count',
                    data: data,
                    backgroundColor: '#1abc9c',
                    borderColor: '#16a085',
                    borderWidth: 0,
                    borderRadius: 4,
                    borderSkipped: false,
                    barThickness: 'flex',
                    maxBarThickness: 40
                }]
            },
            options: {
                indexAxis: 'y', // This makes it horizontal
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 85, 48, 0.95)',
                        titleColor: '#ecf0f1',
                        bodyColor: '#ecf0f1',
                        borderColor: 'rgba(26, 188, 156, 0.3)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.x;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return [
                                    `Modules: ${value.toLocaleString()}`,
                                    `Share: ${percentage}%`
                                ];
                            },
                            labelColor: function(context) {
                                return {
                                    borderColor: '#1abc9c',
                                    backgroundColor: '#1abc9c',
                                    borderWidth: 2,
                                    borderRadius: 2,
                                };
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false,
                            lineWidth: 1
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 10
                            },
                            callback: function(value) {
                                if (value >= 1000000) {
                                    return (value / 1000000).toFixed(1) + 'M';
                                } else if (value >= 1000) {
                                    return (value / 1000).toFixed(0) + 'K';
                                }
                                return value.toLocaleString();
                            }
                        },
                        border: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Module Count',
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: 'rgba(236, 240, 241, 0.8)',
                            font: {
                                size: 11
                            },
                            crossAlign: 'far'
                        },
                        border: {
                            display: false
                        }
                    }
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 20,
                        top: 10,
                        bottom: 10
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        };
    },

    createSolarModulesChart: function(canvasId, labels, data) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (window.chartInstances && window.chartInstances[canvasId]) {
            window.chartInstances[canvasId].destroy();
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Module Count',
                    data: data,
                    backgroundColor: '#00d4aa',
                    borderColor: '#00d4aa',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                }]
            },
            options: {
                indexAxis: 'y', // This makes it horizontal
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return context.parsed.x.toLocaleString() + ' modules';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            callback: function(value) {
                                return (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)',
                            font: {
                                size: 11
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        // Store chart instance for cleanup
        if (!window.chartInstances) {
            window.chartInstances = {};
        }
        window.chartInstances[canvasId] = chart;

        return chart;
    }
};
