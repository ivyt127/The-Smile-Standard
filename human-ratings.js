function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupSyncActiveButton() {
    const syncBtn = document.getElementById('syncbutton');
    const status = document.getElementById('status');
    
    console.log('Setting up sync button:', { syncBtn, status });
    
    if (!syncBtn || !status) {
        console.error('Sync button or status element not found!', { syncBtn, status });
        return;
    }
    
    syncBtn.addEventListener('click', function() {
        console.log('Sync button clicked!');
        if (this.disabled) return;
        
        this.textContent = 'SYNCING...';
        this.disabled = true;
        this.className = 'syncbutton syncing';
        status.textContent = 'SYNCHRONIZING NEURAL LINK...';
        status.className = 'status syncing';
        
        setTimeout(() => {
            this.textContent = 'SYNC COMPLETE';
            this.className = 'syncbutton complete';
            status.textContent = 'REAL-TIME MONITORING SYNCHRONIZED';
            status.className = 'status synchronized';
        }, 3000);
        
        setTimeout(() => {
            this.textContent = 'SYNCHRONIZED ✓';
            this.className = 'syncbutton synchronized';
            status.textContent = 'REAL-TIME MONITORING SYNCHRONIZED ✓';
        }, 5000);
    });
}

function setupCreditConversion() {
    const creditConvertBtn = document.getElementById('convertbutton');
    const creditScoreDisplay = document.getElementById('creditScoreDisplay');
    
    console.log('Setting up credit conversion...', {
        creditConvertBtn,
        creditScoreDisplay
    });
    
    if (!creditScoreDisplay) {
        console.error('creditScoreDisplay element not found!');
        return;
    }
    
    function performConversion(button) {
        console.log('Starting conversion...', button);
        
        if (button.disabled) return;
        
        const originalText = button.textContent;
        
        button.textContent = 'CONVERTING...';
        button.disabled = true;
        button.className = 'convertbutton converting';
        
        setTimeout(() => {
            // Calculate emotional credit score based on current ratings
            const overallRating = parseFloat(document.querySelector('.ratingnumber')?.textContent) || 4.62;
            const totalReviews = parseInt(document.querySelector('.statnumber')?.textContent) || 47;
            const positivePercentage = parseInt(document.querySelectorAll('.statnumber')[1]?.textContent) || 94;
            
            const baseScore = Math.round(overallRating * 150 + Math.random() * 100);
            const reviewBonus = Math.min(totalReviews * 2, 50);
            const positiveBonus = Math.round(positivePercentage * 0.5);
            const finalScore = Math.min(baseScore + reviewBonus + positiveBonus, 850);
            
            let rating = 'POOR';
            if (finalScore >= 800) rating = 'EXCELLENT';
            else if (finalScore >= 700) rating = 'GOOD';
            else if (finalScore >= 600) rating = 'FAIR';
            
            // Calculate sub-scores
            const stabilityScore = Math.min(Math.round(85 + Math.random() * 15), 100);
            const empathyScore = Math.min(Math.round(80 + Math.random() * 20), 100);
            const collaborationScore = Math.min(Math.round(90 + Math.random() * 10), 100);
            
            const scoreNumber = document.getElementById('creditScoreNumber');
            const scoreRating = document.getElementById('creditRating');
            const stability = document.getElementById('stabilityScore');
            const empathy = document.getElementById('empathyScore');
            const collaboration = document.getElementById('collaborationScore');
            
            if (scoreNumber) scoreNumber.textContent = finalScore;
            if (scoreRating) scoreRating.textContent = rating;
            if (stability) stability.textContent = stabilityScore + '%';
            if (empathy) empathy.textContent = empathyScore + '%';
            if (collaboration) collaboration.textContent = collaborationScore + '%';
            
            creditScoreDisplay.style.display = 'block';
            
            button.textContent = 'CONVERSION COMPLETE ✓';
            button.className = 'convertbutton complete';
            
            setTimeout(() => {
                button.textContent = 'UPDATE CREDIT SCORE';
                button.className = 'convertbutton';
                button.disabled = false;
            }, 3000);
            
        }, 2000);
    }
    
    if (creditConvertBtn) {
        creditConvertBtn.addEventListener('click', () => performConversion(creditConvertBtn));
    }
}

function initializeLiveFeedback() {
    function initializeReviewForm() {
        const ratingStars = document.querySelectorAll('.ratingstar');
        const reviewText = document.getElementById('reviewText');
        const charCount = document.getElementById('charCount');
        const submitBtn = document.getElementById('submitReview');
        const clearBtn = document.getElementById('clearForm');
        const reviewerName = document.getElementById('reviewerName');
        
        let selectedRating = 0;

        ratingStars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                highlightStars(index + 1);
            });
            
            star.addEventListener('mouseleave', () => {
                highlightStars(selectedRating);
            });
            
            star.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectedRating = index + 1;
                console.log('Star clicked, rating set to:', selectedRating);
                highlightStars(selectedRating);
                validateForm();
                
                star.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    star.style.transform = 'scale(1)';
                }, 150);
            });
        });

        function highlightStars(rating) {
            console.log('Highlighting stars for rating:', rating);
            ratingStars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('active');
                    star.style.color = '#FFD700'; 
                } else {
                    star.classList.remove('active');
                    star.style.color = '#666'; 
                }
            });
        }

        if (reviewText && charCount) {
            reviewText.addEventListener('input', () => {
                const count = reviewText.value.length;
                charCount.textContent = count;
                
                const counter = charCount.parentElement;
                counter.classList.remove('warning', 'danger');
                
                if (count > 250) {
                    counter.classList.add('danger');
                } else if (count > 200) {
                    counter.classList.add('warning');
                }
                
                validateForm();
            });
        }

        // Form validation
        function validateForm() {
            const nameValid = reviewerName && reviewerName.value.trim().length > 0;
            const ratingValid = selectedRating > 0;
            const textValid = reviewText && reviewText.value.trim().length > 3;
            
            const isValid = nameValid && ratingValid && textValid;
            
            console.log('Form validation:', {
                nameValid,
                ratingValid, 
                textValid,
                isValid,
                nameValue: reviewerName ? reviewerName.value.trim() : 'N/A',
                rating: selectedRating,
                textValue: reviewText ? reviewText.value.trim() : 'N/A'
            });
            
            if (submitBtn) {
                submitBtn.disabled = !isValid;
                if (isValid) {
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, rgba(0, 150, 255, 0.4) 100%)';
                } else {
                    submitBtn.style.opacity = '0.6';
                    submitBtn.style.cursor = 'not-allowed';
                    submitBtn.style.background = 'linear-gradient(135deg, rgba(100, 100, 100, 0.2) 0%, rgba(80, 80, 80, 0.3) 100%)';
                }
            }
        }

        if (reviewerName) {
            reviewerName.addEventListener('input', () => {
                console.log('Reviewer name changed:', reviewerName.value);
                validateForm();
            });
        }
        
        if (reviewText) {
            reviewText.addEventListener('input', () => {
                console.log('Review text changed:', reviewText.value);
                validateForm();
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Submit button clicked!');
                console.log('Button disabled state:', submitBtn.disabled);
                console.log('Selected rating:', selectedRating);
                console.log('Reviewer name:', reviewerName ? reviewerName.value.trim() : 'N/A');
                console.log('Review text:', reviewText ? reviewText.value.trim() : 'N/A');
                
                const nameValue = reviewerName ? reviewerName.value.trim() : '';
                const textValue = reviewText ? reviewText.value.trim() : '';
                
                if (selectedRating > 0 && nameValue.length > 0 && textValue.length > 3) {
                    console.log('Validation passed, adding review...');
                    
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Submitting...';
                    
                    addUserReview({
                        name: nameValue,
                        rating: selectedRating,
                        text: textValue
                    });
                    
                    // Clear form
                    setTimeout(() => {
                        clearForm();
                        
                        showSubmissionFeedback();
                        
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Submit Review';
                    }, 500);
                    
                } else {
                    console.log('Validation failed!');
                    console.log('Rating valid:', selectedRating > 0);
                    console.log('Name valid:', nameValue.length > 0);
                    console.log('Text valid:', textValue.length > 3);
                    
                    // Show validation error
                    alert('Please fill in all fields:\n- Name/ID (required)\n- Rating (click stars)\n- Review text (at least 4 characters)');
                }
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', clearForm);
        }

        function clearForm() {
            if (reviewerName) reviewerName.value = '';
            if (reviewText) reviewText.value = '';
            if (charCount) charCount.textContent = '0';
            
            selectedRating = 0;
            highlightStars(0);
            
            if (charCount && charCount.parentElement) {
                charCount.parentElement.classList.remove('warning', 'danger');
            }
            
            validateForm();
            console.log('Form cleared, rating reset to:', selectedRating);
        }

        validateForm();
    }

    function addUserReview(review) {
        const reviewsFeed = document.getElementById('reviewsFeed');
        if (!reviewsFeed) return;

        const reviewItem = document.createElement('div');
        reviewItem.className = 'reviewitem userreview';
        
        reviewItem.innerHTML = `
            <div class="reviewheader">
                <span class="reviewername">${review.name}</span>
                <div class="reviewrating">
                    ${generateStars(review.rating)}
                </div>
                <span class="reviewtime">Just now</span>
            </div>
            <div class="reviewtext">"${review.text}"</div>
        `;

        reviewsFeed.insertBefore(reviewItem, reviewsFeed.firstChild);

        setTimeout(() => {
            reviewItem.classList.add('show');
        }, 100);

        updateOverallRating();
    }

    function showSubmissionFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'submission-feedback';
        feedback.innerHTML = '✅ Review Submitted Successfully';
        
        document.body.appendChild(feedback);
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 1000);
    }

    function generateStars(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<span class="star filled">★</span>';
            } else {
                starsHTML += '<span class="star">★</span>';
            }
        }
        return starsHTML;
    }

    function updateOverallRating() {
        const reviewItems = document.querySelectorAll('.reviewitem');
        if (reviewItems.length === 0) return;

        let totalRating = 0;
        let count = 0;

        reviewItems.forEach(item => {
            const filledStars = item.querySelectorAll('.reviewrating .star.filled');
            totalRating += filledStars.length;
            count++;
        });

        const baseRating = totalRating / count;
        const variation = (Math.random() - 0.5) * 0.4;
        const finalRating = Math.max(3.0, Math.min(5.0, baseRating + variation));
        
        const ratingElement = document.querySelector('.ratingnumber');
        if (ratingElement) {
            ratingElement.textContent = finalRating.toFixed(2);
        }

        const totalReviewsElement = document.querySelector('.feedbackstats .statnumber');
        if (totalReviewsElement) {
            totalReviewsElement.textContent = count;
        }

        let positiveCount = 0;
        reviewItems.forEach(item => {
            const filledStars = item.querySelectorAll('.reviewrating .star.filled');
            if (filledStars.length >= 4) {
                positiveCount++;
            }
        });

        const positivePercentage = Math.round((positiveCount / count) * 100);
        const positiveElement = document.querySelectorAll('.feedbackstats .statnumber')[1];
        if (positiveElement) {
            positiveElement.textContent = positivePercentage + '%';
        }
    }

    initializeReviewForm();
}

function openImageModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeImageModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Video modal functions
function openVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('monitoringVideo');
    
    if (videoModal && video) {
        videoModal.style.display = 'flex';
        // Reset video to beginning when modal opens
        video.currentTime = 0;
        console.log('Video modal opened');
    }
}

function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('monitoringVideo');
    
    if (videoModal && video) {
        videoModal.style.display = 'none';
        // Pause video when modal closes
        video.pause();
        console.log('Video modal closed');
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('imagemodal')) {
        event.target.style.display = 'none';
        
        // If it's the video modal, also pause the video
        if (event.target.id === 'videoModal') {
            const video = document.getElementById('monitoringVideo');
            if (video) {
                video.pause();
            }
        }
    }
}

function setupAssessmentForm() {
    const form = document.getElementById('assessmentForm');
    const modal = document.getElementById('assessmentModal');
    const closeModal = document.getElementById('closeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    console.log('Setting up assessment form:', { form, modal, closeModal, closeModalBtn });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit');
            const originalText = submitBtn.textContent;
            
            const subjectId = document.getElementById('subjectId').value;
            const assessmentType = document.getElementById('assessmentType').value;
            
            console.log('Form submitted with:', { subjectId, assessmentType });
            
            submitBtn.textContent = 'Generating...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const subjectElement = document.getElementById('assessmentSubject');
                const typeElement = document.getElementById('assessmentType');
                const idElement = document.getElementById('generatedId');
                
                if (subjectElement) subjectElement.textContent = subjectId || 'YR-459921';
                if (typeElement) typeElement.textContent = assessmentType || 'Full Assessment';
                
                // Generate assessment ID
                const now = new Date();
                const assessmentId = `ASS-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 999) + 1).padStart(3, '0')}`;
                
                if (idElement) idElement.textContent = assessmentId;
                
                console.log('Generated assessment ID:', assessmentId);
                
                // Show modal
                if (modal) {
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                }
                
                // Reset form button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                form.reset();
            }, 1500);
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModalHandler);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
    }
    
    function closeModalHandler() {
        console.log('Closing modal...');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                resetModalState();
            }, 300);
        }
    }
    
    function resetModalState() {
        const downloadBtn = document.getElementById('downloadReport');
        if (downloadBtn) {
            downloadBtn.textContent = 'Download';
            downloadBtn.disabled = false;
            downloadBtn.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.2) 0%, rgba(0, 150, 255, 0.3) 100%)';
            downloadBtn.style.borderColor = 'rgba(0, 255, 255, 0.4)';
            downloadBtn.style.color = 'rgba(0, 255, 255, 0.9)';
        }
    }
    
    const downloadBtn = document.getElementById('downloadReport');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            this.textContent = 'Downloading...';
            this.disabled = true;
            
            const assessmentId = document.getElementById('generatedId').textContent;
            const subjectId = document.getElementById('assessmentSubject').textContent;
            const assessmentType = document.getElementById('assessmentType').textContent;
            
            console.log('Starting download for:', { assessmentId, subjectId, assessmentType });
            
            // Create assessment report content
            const reportContent = generateAssessmentReport(assessmentId, subjectId, assessmentType);
            
            setTimeout(() => {
                downloadAssessmentReport(reportContent, assessmentId);
                
                this.textContent = 'Downloaded ✓';
                this.style.background = 'linear-gradient(135deg, rgba(0, 255, 0, 0.2) 0%, rgba(0, 200, 0, 0.3) 100%)';
                this.style.borderColor = 'rgba(0, 255, 0, 0.5)';
                this.style.color = 'rgba(0, 255, 0, 0.9)';
                
                console.log('Download completed');
                
                if (closeModal) closeModal.style.pointerEvents = 'auto';
                if (closeModalBtn) {
                    closeModalBtn.disabled = false;
                    closeModalBtn.style.opacity = '1';
                    closeModalBtn.style.cursor = 'pointer';
                }
            }, 1500);
        });
    }
}

// Generate assessment report content
function generateAssessmentReport(assessmentId, subjectId, assessmentType) {
    const currentDate = new Date().toLocaleString();
    
    const reportContent = `
DEPARTMENT OF HUMAN RATINGS
CONFIDENTIAL ASSESSMENT REPORT
=====================================

Assessment ID: ${assessmentId}
Subject ID: ${subjectId}
Assessment Type: ${assessmentType}
Generated: ${currentDate}
Status: COMPLETE

=====================================
EXECUTIVE SUMMARY
=====================================

Subject ${subjectId} has been evaluated using advanced neural monitoring 
and emotional profiling systems. This assessment provides comprehensive 
analysis of workplace performance, emotional stability, and compliance metrics.

=====================================
ASSESSMENT RESULTS
=====================================

Overall Performance Rating: 4.62/5.0
Emotional Stability Score: 92%
Empathy Index: 89%
Collaboration Rating: 95%
Productivity Index: 73%

Risk Classification: LOW RISK
Compliance Level: HIGH

=====================================
BEHAVIORAL ANALYSIS
=====================================

• Consistent performance patterns observed
• Anxiety levels elevated but within normal operational range
• Demonstrates above-average compliance metrics
• Standard deviation within acceptable parameters
• High compliance with workplace protocols

=====================================
RECOMMENDATIONS
=====================================

• Continue current monitoring protocols
• Maintain quarterly assessment schedule
• Consider for leadership development programs
• Monitor stress indicators during peak periods

=====================================
TECHNICAL DETAILS
=====================================

Neural Link Status: ACTIVE
Monitoring System: HUMAN_RATINGS_OS v3.1.2
Data Collection Period: Last 30 days
Assessment Algorithm: Advanced Emotional Profiling v2.1

=====================================
CONFIDENTIALITY NOTICE
=====================================

This document contains confidential and proprietary information.
Distribution is restricted to authorized personnel only.

© 2025 Department of Human Ratings
All assessments confidential.
`;

    return reportContent;
}

function downloadAssessmentReport(content, assessmentId) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `Assessment_Report_${assessmentId}.txt`;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
}


function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = `submission-feedback ${type}`;
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 3000);
}

function activatePrivilege() {
    const audio = document.getElementById('privilegeAudio');
    const button = document.querySelector('.exclusive-btn');
    const panel = document.querySelector('.exclusive-privilege');
    
    if (!audio || !button) {
        console.error('Privilege elements not found');
        return;
    }
    
    if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        button.textContent = 'Activate Protocol';
        button.classList.remove('active');
        panel.classList.remove('protocol-active');
        console.log('Neural Enhancement Protocol deactivated');
        return;
    }
    
    // Activate the privilege
    button.textContent = 'Protocol Active...';
    button.classList.add('active');
    panel.classList.add('protocol-active');
    
    // Play the audio
    audio.play().then(() => {
        console.log('Neural Enhancement Protocol activated - Binaural audio playing');
        
        // Update button text
        button.textContent = 'Deactivate Protocol';
        
        // Show feedback
        showFeedback('Neural Enhancement Protocol Activated', 'success');
    }).catch(error => {
        console.error('Failed to play privilege audio:', error);
        button.textContent = 'Audio Failed';
        setTimeout(() => {
            button.textContent = 'Activate Protocol';
            button.classList.remove('active');
            panel.classList.remove('protocol-active');
        }, 2000);
    });
    
    // Handle audio end
    audio.addEventListener('ended', function() {
        button.textContent = 'Activate Protocol';
        button.classList.remove('active');
        panel.classList.remove('protocol-active');
        showFeedback('Neural Enhancement Protocol Complete', 'info');
        console.log('Neural Enhancement Protocol session completed');
    });
}

function setupCreditActionButtons() {
    console.log('Credit action buttons setup complete');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Human Ratings Terminal...');
    
    setupSmoothScrolling();           // Header navigation
    setupSyncActiveButton();          // Terminal controls
    setupCreditConversion();          // Credit score system
    initializeLiveFeedback();         // Live feedback & reviews
    setupAssessmentForm();            // Assessment form & modals
    setupCreditActionButtons();       // Additional utility functions
    
    // Add subtle animation to stats items
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
    
    console.log('Human Ratings Terminal initialization complete!');
});
