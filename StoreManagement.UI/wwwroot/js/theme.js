// Theme Management
window.getTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) {
        return saved === 'dark';
    }
    // Default to dark theme
    return true;
};

window.setTheme = (isDark) => {
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);

    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }

    // Force repaint
    document.body.style.display = 'none';
    document.body.offsetHeight; // trigger reflow
    document.body.style.display = '';
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const isDark = window.getTheme();
    window.setTheme(isDark);
});

// Chart.js default configuration for dark theme
if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#b0c4c4';
    Chart.defaults.borderColor = '#2d4d4d';
    Chart.defaults.backgroundColor = 'rgba(0, 212, 170, 0.1)';
    
    // Update chart colors based on theme
    window.updateChartTheme = (isDark) => {
        if (isDark) {
            Chart.defaults.color = '#b0c4c4';
            Chart.defaults.borderColor = '#2d4d4d';
        } else {
            Chart.defaults.color = '#475569';
            Chart.defaults.borderColor = '#e2e8f0';
        }
    };
}

// Smooth scrolling for navigation
window.smoothScroll = (target) => {
    document.querySelector(target)?.scrollIntoView({
        behavior: 'smooth'
    });
};

// Mobile sidebar toggle
window.toggleSidebar = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
};

// Animation utilities
window.animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.round(current * 100) / 100;
    }, 16);
};

// Performance monitoring
window.performanceMonitor = {
    startTime: performance.now(),
    
    mark: (name) => {
        performance.mark(name);
    },
    
    measure: (name, startMark, endMark) => {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    },
    
    getLoadTime: () => {
        return performance.now() - window.performanceMonitor.startTime;
    }
};

// Utility functions for data formatting
window.formatters = {
    percentage: (value) => `${value.toFixed(2)}%`,
    energy: (value) => `${value.toFixed(2)} kWh/kWp`,
    power: (value) => `${value.toFixed(2)} kW`,
    currency: (value) => `$${value.toLocaleString()}`,
    number: (value) => value.toLocaleString()
};

// Notification system
window.showNotification = (message, type = 'info', duration = 3000) => {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    switch (type) {
        case 'success':
            notification.style.background = '#00b894';
            break;
        case 'error':
            notification.style.background = '#e17055';
            break;
        case 'warning':
            notification.style.background = '#fdcb6e';
            break;
        default:
            notification.style.background = '#00d4aa';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
};

// Initialize performance monitoring
window.performanceMonitor.mark('app-start');
