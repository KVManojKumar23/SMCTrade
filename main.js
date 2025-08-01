// script.js - Enhanced with EmailJS for sending emails

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize all features
    initTypingEffect();
    initNavigationFeatures();
    initReadMoreFunction();
    initContactForm();
    initScrollAnimations();
    initCounterAnimation();
    initMobileMenu();
});

// Initialize EmailJS
function initEmailJS() {
    // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
    emailjs.init('MghDdKB4TvBqrWGPc'); // Get this from EmailJS dashboard
}

// Typing Effect for Headline
function initTypingEffect() {
    const headline = "Master The Art of Trading";
    const subtext = " Get Started Today!";
    let i = 0;
    let isMainComplete = false;
    const typedElement = document.getElementById("typed-headline");
    
    function type() {
        if (!isMainComplete && i < headline.length) {
            typedElement.innerHTML += headline.charAt(i);
            i++;
            setTimeout(type, 100);
        } else if (!isMainComplete) {
            isMainComplete = true;
            i = 0;
            setTimeout(typeSubtext, 500);
        }
    }
    
    function typeSubtext() {
        if (i < subtext.length) {
            typedElement.innerHTML += subtext.charAt(i);
            i++;
            setTimeout(typeSubtext, 80);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(type, 1000);
}

// Navigation Features
function initNavigationFeatures() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(17, 24, 39, 0.98)';
        } else {
            navbar.style.background = 'rgba(17, 24, 39, 0.95)';
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        this.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Read More Functionality
function initReadMoreFunction() {
    const readMoreBtn = document.getElementById("read-more");
    const moreText = document.getElementById("about-more");
    
    readMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "inline";
            this.textContent = "Read Less";
            moreText.style.animation = "fadeInUp 0.5s ease";
        } else {
            moreText.style.display = "none";
            this.textContent = "Read More";
        }
    });
}

// Enhanced Contact Form with EmailJS
function initContactForm() {
    const form = document.getElementById("contact-form");
    const submitBtn = form.querySelector('.submit-btn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (validateForm(formObject)) {
            sendEmail(formObject, submitBtn);
        }
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Send Email using EmailJS
function sendEmail(formData, submitBtn) {
    // Show loading state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Email template parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        course_interest: formData.course,
        message: formData.message,
        to_email: 'manojkv2399@gmail.com', // Trainer's email
        reply_to: formData.email
    };
    
    // Send email using EmailJS
    emailjs.send(
        'service_i7hmyq8',    // Replace with your EmailJS service ID
        'template_nlbq8vq',   // Replace with your EmailJS template ID
        templateParams
    ).then(function(response) {
        console.log('Email sent successfully!', response.status, response.text);
        showSuccessMessage();
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Send auto-reply to user
        // sendAutoReply(formData);
        
    }).catch(function(error) {
        console.error('Failed to send email:', error);
        showErrorMessage('Failed to send message. Please try again or contact us directly.');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Send auto-reply to user
// function sendAutoReply(formData) {
//     const autoReplyData = {
//         service_id: 'service_i7hmyq8',
//         template_id: 'template_py7gyp7',
//         user_id: 'MghDdKB4TvBqrWGPc', // Add your EmailJS public key
//         template_params: {
//             to_email: formData.email,
//             user_name: formData.name,
//             course_name: formData.course,
//             company_name: 'ProMax Trading Academy',
//             contact_email: 'manojkv2399@gmail.com'
//         }
//     };
    
//     emailjs.send(
//         autoReplyData.service_id,
//         autoReplyData.template_id,
//         autoReplyData.template_params
//     ).then(function(response) {
//         console.log('✅ Auto-reply sent successfully!', response.status);
//     }).catch(function(error) {
//         console.error('❌ Auto-reply failed:', error);
//     });
// }

function validateForm(data) {
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Course selection validation
    if (!data.course) {
        showFieldError('course', 'Please select a course');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remove existing error styling
    field.style.borderColor = '';
    
    switch(field.name) {
        case 'name':
            if (value.length < 2) {
                showFieldError(field.name, 'Name must be at least 2 characters');
                isValid = false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field.name, 'Please enter a valid email');
                isValid = false;
            }
            break;
        case 'message':
            if (value.length < 10) {
                showFieldError(field.name, 'Message must be at least 10 characters');
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        field.style.borderColor = '#10b981';
    }
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    field.style.borderColor = '#ef4444';
    
    // You can add a tooltip or error message display here
    console.log(`${fieldName}: ${message}`);
}

function showSuccessMessage() {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2em;">✅</span>
            <div>
                <strong>Message Sent Successfully!</strong><br>
                <small>We'll get back to you within 24 hours. Check your email for confirmation.</small>
            </div>
        </div>
    `;
    
    // Insert before the form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(successDiv, form);
    
    // Show with animation
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    // Remove after 7 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 7000);
}

function showErrorMessage(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2em;">❌</span>
            <div>
                <strong>Error!</strong><br>
                <small>${message}</small>
            </div>
        </div>
    `;
    
    // Insert before the form
    const form = document.getElementById('contact-form');
    form.parentNode.insertBefore(errorDiv, form);
    
    // Show with animation
    setTimeout(() => {
        errorDiv.classList.add('show');
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Animated Counters
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.goal-card, .feature, .contact-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// Smooth scroll to section function (used by CTA button)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add loading effect for images
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Enhanced mobile experience
function handleTouchGestures() {
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // Add any swipe-based functionality here if needed
    }, { passive: true });
}

// Initialize touch gestures on mobile
if ('ontouchstart' in window) {
    handleTouchGestures();
}
