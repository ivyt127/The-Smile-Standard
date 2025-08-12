
document.addEventListener('DOMContentLoaded', function() {
    const configBtn = document.getElementById('configurationButton');
    const configModal = document.getElementById('configurationModal');
    const configCloseBtn = document.getElementById('configurationCloseButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeCloseBtn = document.getElementById('welcomeCloseButton');
    const surveillanceBtn = document.getElementById('surveillanceButton');
    const neuralLogsModal = document.getElementById('neuralLogsModal');
    const closeBtn = document.getElementById('closeButton');
    const deviceSwitch = document.getElementById('deviceSwitch');
    const switchStatus = document.getElementById('switchStatus');
    const corporateBtn = document.getElementById('corporateButton');
    const corporateBtnContainer = document.querySelector('.corporatebutton');
    const checkInLoader = document.getElementById('checkInLoader');
    
    initializeStats();
    
    if (configBtn && configModal) {
        configBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Config button clicked'); // Debug
            showConfigurationModal();
        });
    }
    
    if (configCloseBtn && configModal) {
        configCloseBtn.addEventListener('click', function() {
            hideConfigurationModal();
        });
    }
    
    if (welcomeCloseBtn) {
        welcomeCloseBtn.addEventListener('click', function() {
            hideWelcomeMessage();
        });
    }
    
    if (surveillanceBtn) {
        surveillanceBtn.addEventListener('click', function() {
            showNeuralLogs();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeNeuralLogs();
        });
    }
    
    if (deviceSwitch && switchStatus) {
        deviceSwitch.addEventListener('change', function() {
            if (this.checked) {
                switchStatus.textContent = 'ON';
                switchStatus.style.color = '#4CAF50';
                updateStatsForActiveMode();
                showWelcomeMessage();
                showCheckInButton();
            } else {
                switchStatus.textContent = 'OFF';
                switchStatus.style.color = '#ffffff';
                updateStatsForInactiveMode();
                hideWelcomeMessage();
                hideCheckInButton();
            }
        });
    }
    
    if (corporateBtn) {
        corporateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showCheckInLoader();
        });
    }
    
    initializeConfigSettings();
});


function showConfigurationModal() {
    console.log('showConfigurationModal called'); // Debug
    const configModal = document.getElementById('configurationModal');
    console.log('configModal element:', configModal); // Debug
    if (configModal) {
        configModal.classList.add('show');
        configModal.style.display = 'flex';
        configModal.style.opacity = '1';
        configModal.style.pointerEvents = 'auto';
        console.log('Modal should be visible now'); // Debug
    }
}

function hideConfigurationModal() {
    const configModal = document.getElementById('configurationModal');
    if (configModal) {
        configModal.classList.remove('show');
        configModal.style.display = 'none';
        configModal.style.opacity = '0';
        configModal.style.pointerEvents = 'none';
    }
}


function showWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const welcomeCloseBtn = document.getElementById('welcomeCloseButton');
    
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
        welcomeMessage.style.position = 'fixed';
        welcomeMessage.style.zIndex = '999999';
        
        setTimeout(() => {
            welcomeMessage.classList.add('show');
        }, 300);
        
        if (welcomeCloseBtn) {
            welcomeCloseBtn.addEventListener('click', function() {
                hideWelcomeMessage();
            });
        }
    }
}

function hideWelcomeMessage() {
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (welcomeMessage) {
        welcomeMessage.classList.remove('show');
        setTimeout(() => {
            welcomeMessage.style.display = 'none';
        }, 500);
    }
}

function showNeuralLogs() {
    const modal = document.getElementById('neuralLogsModal');
    if (modal) {
        const scrollY = window.scrollY;
        
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
        document.body.style.top = `-${scrollY}px`;
        
        if (modal.parentElement !== document.body) {
            document.body.appendChild(modal);
        }
        
        modal.style.setProperty('position', 'fixed', 'important');
        modal.style.setProperty('top', '0', 'important');
        modal.style.setProperty('left', '0', 'important');
        modal.style.setProperty('width', '100vw', 'important');
        modal.style.setProperty('height', '100vh', 'important');
        modal.style.setProperty('z-index', '2147483647', 'important');
        modal.style.setProperty('background', 'rgba(0, 0, 0, 0.85)', 'important');
        
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeNeuralLogs() {
    const modal = document.getElementById('neuralLogsModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            
            const scrollY = document.body.style.top;
            document.documentElement.classList.remove('modal-open');
            document.body.classList.remove('modal-open');
            document.body.style.top = '';
            
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }, 300);
    }
}

function updateStatsForActiveMode() {
    const statValues = document.querySelectorAll('.statvalue');
    const statLabels = document.querySelectorAll('.statlabel');
    
    if (statValues.length >= 4) {
        animateStatChange(statValues[0], '98%', '#4CAF50');  
        animateStatChange(statValues[1], '287', '#4CAF50'); 
        animateStatChange(statValues[2], '4.8GB', '#4CAF50'); 
        animateStatChange(statValues[3], '31°C', '#4CAF50'); 

        if (statLabels.length >= 4) {
            statLabels[0].textContent = 'Chip Health';
            statLabels[1].textContent = 'Chip Processes';
            statLabels[2].textContent = 'Chip Memory';
            statLabels[3].textContent = 'Chip Temp';
        }
    }
}

function updateStatsForInactiveMode() {
    const statValues = document.querySelectorAll('.statvalue');
    const statLabels = document.querySelectorAll('.statlabel');
    
    if (statValues.length >= 4) {
        animateStatChange(statValues[0], '87%', '#ff4444');   
        animateStatChange(statValues[1], '142', '#ff4444');  
        animateStatChange(statValues[2], '2.4GB', '#ff4444');
        animateStatChange(statValues[3], '23°C', '#ff4444'); 

        if (statLabels.length >= 4) {
            statLabels[0].textContent = 'System Health';
            statLabels[1].textContent = 'Active Processes';
            statLabels[2].textContent = 'Memory Usage';
            statLabels[3].textContent = 'Core Temp';
        }
    }
}

function animateStatChange(element, newValue, finalColor) {
    requestAnimationFrame(() => {
        element.style.transition = 'all 0.2s ease';
        element.style.transform = 'scale(1.05)';
        element.style.color = '#FFD700';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = finalColor; 
        }, 100);
    });
}

function initializeStats() {
    const statValues = document.querySelectorAll('.statvalue');
    
    statValues.forEach(statValue => {
        statValue.style.color = '#ff4444';
    });
}

function showCheckInButton() {
    const corporateBtnContainer = document.querySelector('.corporatebutton');
    
    if (corporateBtnContainer) {
        corporateBtnContainer.classList.add('show');
    }
}

function hideCheckInButton() {
    const corporateBtnContainer = document.querySelector('.corporatebutton');
    
    if (corporateBtnContainer) {
        corporateBtnContainer.classList.remove('show');
    }
}

// Configuration Settings Management
function initializeConfigSettings() {
    loadConfigSettings();
    
    const dataSensitivity = document.getElementById('dataSensitivity');
    const sensitivityLabel = document.getElementById('sensitivityLabel');
    const applyConfigBtn = document.getElementById('applyConfiguration');
    
    if (dataSensitivity && sensitivityLabel) {
        dataSensitivity.addEventListener('input', function() {
            updateSensitivityLabel(this.value, sensitivityLabel);
        });
        // Initialize label
        updateSensitivityLabel(dataSensitivity.value, sensitivityLabel);
    }
    
    if (applyConfigBtn) {
        applyConfigBtn.addEventListener('click', function() {
            applyConfigChanges();
        });
    }
}

function updateSensitivityLabel(value, labelElement) {
    const sensitivity = parseInt(value);
    let label = 'Low';
    
    if (sensitivity >= 8) {
        label = 'Maximum';
    } else if (sensitivity >= 6) {
        label = 'High';
    } else if (sensitivity >= 4) {
        label = 'Medium';
    } else {
        label = 'Low';
    }
    
    labelElement.textContent = label;
}

function applyConfigChanges() {
    const settings = {
        syncFrequency: document.getElementById('syncFrequency')?.value || 'realtime',
        dataSensitivity: document.getElementById('dataSensitivity')?.value || '7'
    };
    
    // Save to localStorage
    localStorage.setItem('neuralChipConfig', JSON.stringify(settings));
    
    // Apply changes immediately
    setSyncFrequency(settings.syncFrequency);
    
    // Show confirmation
    showConfigConfirmation();
    
    // Close modal after a short delay
    setTimeout(() => {
        const configModal = document.getElementById('configurationModal');
        if (configModal) {
            configModal.classList.remove('show');
            configModal.style.display = 'none';
            configModal.style.opacity = '0';
            configModal.style.pointerEvents = 'none';
        }
    }, 1500);
}

function loadConfigSettings() {
    const savedSettings = localStorage.getItem('neuralChipConfig');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        const syncFrequency = document.getElementById('syncFrequency');
        const dataSensitivity = document.getElementById('dataSensitivity');
        
        if (syncFrequency) syncFrequency.value = settings.syncFrequency || 'realtime';
        if (dataSensitivity) dataSensitivity.value = settings.dataSensitivity || '7';
        
        setSyncFrequency(settings.syncFrequency || 'realtime');
    }
}

function setSyncFrequency(frequency) {
    // Update the stats refresh rate based on sync frequency
    let intervalTime = 1000; // Real-time default (1 second)
    
    switch(frequency) {
        case '5min':
            intervalTime = 300000; // 5 minutes
            break;
        case 'hourly':
            intervalTime = 3600000; // 1 hour
            break;
        default:
            intervalTime = 5000; // 5 seconds for real-time (more reasonable)
            break;
    }
    
    if (window.statsUpdateInterval) {
        clearInterval(window.statsUpdateInterval);
    }
    
    window.statsUpdateInterval = setInterval(() => {
        const deviceSwitch = document.getElementById('deviceSwitch');
        if (deviceSwitch && deviceSwitch.checked) {
            updateStatsForActiveMode();
        }
    }, intervalTime);
}

function showConfigConfirmation() {
    const applyBtn = document.getElementById('applyConfiguration');
    if (applyBtn) {
        const originalText = applyBtn.textContent;
        applyBtn.textContent = 'Applied Successfully!';
        applyBtn.style.background = 'linear-gradient(135deg, rgba(76, 175, 80, 0.8) 0%, rgba(56, 142, 60, 0.9) 100%)';
        
        setTimeout(() => {
            applyBtn.textContent = originalText;
            applyBtn.style.background = '';
        }, 1500);
    }
}

function showCheckInLoader() {
    const loader = document.getElementById('checkInLoader');
    if (loader) {
        loader.classList.add('show');
        
        setTimeout(() => {
            const subtitle = loader.querySelector('.loading-subtitle');
            if (subtitle) {
                subtitle.textContent = 'Verifying credentials...';
            }
        }, 1500);
        
        setTimeout(() => {
            const subtitle = loader.querySelector('.loading-subtitle');
            if (subtitle) {
                subtitle.textContent = 'Establishing secure connection...';
            }
        }, 3000);
        
        setTimeout(() => {
            const subtitle = loader.querySelector('.loading-subtitle');
            if (subtitle) {
                subtitle.textContent = 'Loading Employee Portal...';
            }
        }, 4500);
        
        setTimeout(() => {
            // Use direct navigation to avoid popup blockers
            window.location.href = 'corporate.html';
        }, 6000);
    }
}

function hideCheckInLoader() {
    const loader = document.getElementById('checkInLoader');
    if (loader) {
        loader.classList.remove('show');
        
        setTimeout(() => {
            const subtitle = loader.querySelector('.loading-subtitle');
            if (subtitle) {
                subtitle.textContent = 'Connecting to Employee Portal...';
            }
        }, 500);
    }
}