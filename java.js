document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const loginBtn = document.getElementById('loginBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const gridLocationSelect = document.getElementById('gridLocation');
    const rememberDeviceCheckbox = document.getElementById('rememberDevice');
    const biometricAuthCheckbox = document.getElementById('biometricAuth');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingStage = document.getElementById('loadingStage');
    const progressBar = document.getElementById('progressBar');
    const securityLevelDisplay = document.getElementById('securityLevel');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const newRegistrationLink = document.getElementById('newRegistration');

    const validCredentials = {
        'sarah_99': {
            password: 'neural2025',
            grid: 'east-sydney',
            name: 'Sarah_99'
        },
        'admin': {
            password: 'system_override',
            grid: 'central-adelaide',
            name: 'Administrator'
        },
        'user_001': {
            password: 'standard_key',
            grid: 'west-melbourne',
            name: 'User_001'
        }
    };

    function updateSecurityLevel() {
        let level = 'BASIC';
        let completedFields = 0;

        if (usernameInput.value.trim()) completedFields++;
        if (passwordInput.value.trim()) completedFields++;
        if (gridLocationSelect.value) completedFields++;
        if (biometricAuthCheckbox.checked) completedFields++;

        if (completedFields >= 4) level = 'MAXIMUM';
        else if (completedFields >= 3) level = 'HIGH';
        else if (completedFields >= 2) level = 'STANDARD';

        securityLevelDisplay.textContent = level;
        securityLevelDisplay.className = `info-value security-${level.toLowerCase()}`;
    }

    [usernameInput, passwordInput, gridLocationSelect, biometricAuthCheckbox].forEach(element => {
        element.addEventListener('input', updateSecurityLevel);
        element.addEventListener('change', updateSecurityLevel);
    });

    const loadingStages = [
        { text: 'INITIALIZING...', progress: 20 },
        { text: 'VERIFYING CREDENTIALS...', progress: 40 },
        { text: 'SCANNING NEURAL PATTERNS...', progress: 60 },
        { text: 'ESTABLISHING SECURE CONNECTION...', progress: 80 },
        { text: 'ACCESS GRANTED...', progress: 100 }
    ];

    function showLoading() {
        loadingOverlay.classList.add('active');
        let currentStage = 0;

        function nextStage() {
            if (currentStage < loadingStages.length) {
                const stage = loadingStages[currentStage];
                loadingStage.textContent = stage.text;
                progressBar.style.width = stage.progress + '%';
                
                currentStage++;
                
                if (currentStage < loadingStages.length) {
                    setTimeout(nextStage, Math.random() * 1000 + 800);
                } else {
                    setTimeout(() => {
                        window.location.href = 'Main.html';
                    }, 1500);
                }
            }
        }

        setTimeout(nextStage, 500);
    }

    function hideLoading() {
        loadingOverlay.classList.remove('active');
        progressBar.style.width = '0%';
        loadingStage.textContent = 'INITIALIZING...';
    }

    function showError(message) {
        hideLoading();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <div class="error-icon">⚠</div>
                <div class="error-message">${message}</div>
                <button class="error-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(255, 50, 50, 0.9), rgba(200, 0, 0, 0.9));
            border: 2px solid rgba(255, 100, 100, 0.5);
            border-radius: 10px;
            padding: 15px 20px;
            color: white;
            font-family: 'Courier New', monospace;
            z-index: 2000;
            animation: errorSlideIn 0.5s ease-out;
            max-width: 300px;
        `;
        
        // Add animation keyframes
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes errorSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .error-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .error-icon {
                font-size: 1.2em;
                animation: errorPulse 1s ease-in-out infinite alternate;
            }
            @keyframes errorPulse {
                from { opacity: 0.8; }
                to { opacity: 1; }
            }
            .error-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2em;
                cursor: pointer;
                margin-left: auto;
                padding: 0 5px;
            }
            .error-close:hover {
                color: #ffcccc;
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
        
        // Close button functionality
        errorDiv.querySelector('.error-close').addEventListener('click', () => {
            errorDiv.remove();
        });
    }

    // Handle form submission
    function handleLogin(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim().toLowerCase();
        const password = passwordInput.value;
        const grid = gridLocationSelect.value;
        
        if (!username) {
            showError('USER DESIGNATION REQUIRED');
            usernameInput.focus();
            return;
        }
        
        if (!password) {
            showError('NEURAL KEY REQUIRED');
            passwordInput.focus();
            return;
        }
        
        if (!validCredentials[username]) {
            showError('INVALID USER DESIGNATION');
            return;
        }
        
        if (validCredentials[username].password !== password) {
            showError('INVALID NEURAL KEY');
            return;
        }
        
        if (grid && validCredentials[username].grid !== grid) {
            showError('GRID LOCATION MISMATCH');
            return;
        }
        
        // Store login data for main page
        const loginData = {
            username: validCredentials[username].name,
            grid: grid || validCredentials[username].grid,
            loginTime: new Date().toISOString(),
            rememberDevice: rememberDeviceCheckbox.checked,
            biometricEnabled: biometricAuthCheckbox.checked
        };
        
        localStorage.setItem('smileStandardLogin', JSON.stringify(loginData));
        
        // Show loading and redirect
        showLoading();
    }

    loginBtn.addEventListener('click', handleLogin);
    loginForm.addEventListener('submit', handleLogin);

    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showError('NEURAL KEY RECOVERY NOT AVAILABLE IN DEMO MODE');
    });

    newRegistrationLink.addEventListener('click', function(e) {
        e.preventDefault();
        showError('NEW REGISTRATIONS SUSPENDED BY ADMINISTRATION');
    });

    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.02)';
            this.parentNode.style.transition = 'transform 0.3s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });

    function typeEffect(element, text, speed = 100) {
        element.placeholder = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.placeholder += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    setTimeout(() => {
        typeEffect(usernameInput, 'Enter your designation...', 80);
    }, 1000);

    setTimeout(() => {
        typeEffect(passwordInput, 'Enter neural key...', 80);
    }, 2500);

    updateSecurityLevel();

    console.log('Demo Credentials:');
    console.log('Username: sarah_99, Password: neural2024');
    console.log('Username: admin, Password: system_override');
    console.log('Username: user_001, Password: standard_key');
});
