
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    setupNavigation();
    setupAuditModal();
    setupContactForm();
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function updateDateTime() {
    const now = new Date();
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    if (timeElement) {
        const timeStr = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        timeElement.textContent = timeStr;
    }
    
    if (dateElement) {
        const dateStr = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        dateElement.textContent = dateStr;
    }
}

function setupAuditModal() {
    const auditBtn = document.getElementById('auditbutton');
    const modal = document.getElementById('auditModal');
    
    if (!auditBtn) {
        console.error('Audit button not found with ID: auditbutton');
        return;
    }
    
    if (!modal) {
        console.error('Modal not found with ID: auditModal');
        return;
    }
    
    const closeBtn = modal.querySelector('.close');
    
    if (!closeBtn) {
        console.error('Close button not found');
        return;
    }

    console.log('Audit modal setup complete - button and modal found');
    
    // Open modal when audit button is clicked
    auditBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Audit button clicked - opening modal');
        
        modal.style.display = 'block';
        modal.style.opacity = '1';
        document.body.style.overflow = 'hidden';
        
        setupRecognizeButton();
        performAudit();
    });
    
    closeBtn.addEventListener('click', function() {
        closeModal();
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    function performAudit() {
        auditBtn.textContent = 'PROCESSING...';
        auditBtn.disabled = true;
        
        // Record audit activity
        recordAuditActivity();
        
        setTimeout(() => {
            auditBtn.textContent = 'AUDIT COMPLETE';
            updateEmotionBars();
        }, 2000);
        
        setTimeout(() => {
            auditBtn.textContent = 'Subject File Audit';
            auditBtn.disabled = false;
        }, 4000);
    }
}

function setupRecognizeButton() {
    const modal = document.getElementById('auditModal');
    const recognizeBtn = modal.querySelector('.button2');
    
    if (recognizeBtn) {
        const newBtn = recognizeBtn.cloneNode(true);
        recognizeBtn.parentNode.replaceChild(newBtn, recognizeBtn);
        
        newBtn.addEventListener('click', function() {
            this.textContent = 'PROCESSING...';
            this.disabled = true;
            this.style.opacity = '0.6';
            
            setTimeout(() => {
                // Update emotion bars with new values
                updateEmotionBarsRecognition();
                
                // Record recognition activity
                recordRecognitionActivity();
                
                // Reset button
                this.textContent = 'RECOGNIZE';
                this.disabled = false;
                this.style.opacity = '1';
            }, 1500);
        });
    }
}

function updateEmotionBars() {
    const modal = document.getElementById('auditModal');
    const emotionItems = modal.querySelectorAll('.item');
    
    const newEmotions = [
        { value: 92, color: '#4CAF50' },
        { value: 38, color: '#FF9800' },
        { value: 81, color: '#2196F3' },
        { value: 59, color: '#F44336' }
    ];
    
    emotionItems.forEach((item, index) => {
        if (index < newEmotions.length) {
            const emotionFill = item.querySelector('.fill');
            const emotionValue = item.querySelector('.emotionvalue');
            const emotion = newEmotions[index];
            
            if (emotionFill && emotionValue) {
                emotionFill.style.width = emotion.value + '%';
                emotionFill.style.background = emotion.color;
                emotionValue.textContent = emotion.value + '%';
                
                // Add pulse effect
                emotionFill.style.animation = 'auditPulse 0.5s ease-in-out';
                setTimeout(() => {
                    emotionFill.style.animation = '';
                }, 500);
            }
        }
    });
}

function updateEmotionBarsRecognition() {
    const modal = document.getElementById('auditModal');
    const emotionItems = modal.querySelectorAll('.item');
    
    const recognitionEmotions = [
        { value: 88, color: '#4CAF50' },  
        { value: 52, color: '#FF9800' },  
        { value: 76, color: '#2196F3' }, 
        { value: 45, color: '#F44336' }  
    ];
    
    emotionItems.forEach((item, index) => {
        if (index < recognitionEmotions.length) {
            const emotionFill = item.querySelector('.fill');
            const emotionValue = item.querySelector('.emotionvalue');
            const emotion = recognitionEmotions[index];
            
            if (emotionFill && emotionValue) {
                emotionFill.style.transition = 'width 1s ease-in-out, background-color 0.5s ease';
                emotionFill.style.width = emotion.value + '%';
                emotionFill.style.background = emotion.color;
                emotionValue.textContent = emotion.value + '%';
                
                // Add recognition pulse effect
                emotionFill.style.animation = 'auditPulse 1s ease-in-out';
                setTimeout(() => {
                    emotionFill.style.animation = '';
                    emotionFill.style.transition = '';
                }, 1000);
            }
        }
    });
}


function recordAuditActivity() {
    const modal = document.getElementById('auditModal');
    const historyLog = modal.querySelector('.logs');
    
    if (historyLog) {
        const now = new Date();
        const timestamp = `[${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
        
        const newEntry = document.createElement('div');
        newEntry.className = 'entry';
        newEntry.innerHTML = `
            <span>${timestamp}</span>
            <span>Neural audit initiated - emotional recalibration in progress</span>
        `;
        
        newEntry.style.opacity = '0';
        newEntry.style.transform = 'translateX(-20px)';
        
        historyLog.insertBefore(newEntry, historyLog.firstChild);
        
        setTimeout(() => {
            newEntry.style.transition = 'all 0.5s ease';
            newEntry.style.opacity = '1';
            newEntry.style.transform = 'translateX(0)';
        }, 100);
        
        const entries = historyLog.querySelectorAll('.entry');
        if (entries.length > 8) {
            entries[entries.length - 1].remove();
        }
    }
}

function recordRecognitionActivity() {
    const modal = document.getElementById('auditModal');
    const historyLog = modal.querySelector('.logs');
    
    if (historyLog) {
        const now = new Date();
        const timestamp = `[${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
        
        const newEntry = document.createElement('div');
        newEntry.className = 'entry';
        newEntry.innerHTML = `
            <span>${timestamp}</span>
            <span>Recognition protocol activated - emotional profile updated</span>
        `;
        
        newEntry.style.opacity = '0';
        newEntry.style.transform = 'translateX(-20px)';
        
        historyLog.insertBefore(newEntry, historyLog.firstChild);
        
        setTimeout(() => {
            newEntry.style.transition = 'all 0.5s ease';
            newEntry.style.opacity = '1';
            newEntry.style.transform = 'translateX(0)';
        }, 100);
        
        const entries = historyLog.querySelectorAll('.entry');
        if (entries.length > 8) {
            entries[entries.length - 1].remove();
        }
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const employeeId = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            
            if (!employeeId || !email) {
                alert('Please fill in your Employee ID and work email.');
                return;
            }
            
            const submitBtn = this.querySelector('.submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Request submitted successfully! Ticket #' + Math.floor(Math.random() * 10000) + ' has been created.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}
