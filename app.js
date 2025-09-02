// Application data
const appData = {
    exchangeRate: 83,
    currentCurrency: 'USD',
    services: [
        {
            title: "Personal Numerology Reading",
            description: "Comprehensive analysis of your life path, destiny, and soul numbers",
            priceUSD: 150,
            priceINR: 12450
        },
        {
            title: "Business Numerology",
            description: "Optimize your business name and launch dates for success",
            priceUSD: 200,
            priceINR: 16600
        },
        {
            title: "Relationship Compatibility",
            description: "Discover numerical harmony between partners",
            priceUSD: 125,
            priceINR: 10375
        },
        {
            title: "Name Analysis & Correction",
            description: "Find the perfect name vibration for positive energy",
            priceUSD: 100,
            priceINR: 8300
        }
    ],
    testimonials: [
        {
            name: "Sarah M.",
            text: "Pranjali's numerology reading changed my perspective on life completely!",
            rating: 5
        },
        {
            name: "David L.",
            text: "Professional, accurate, and incredibly insightful. Highly recommended!",
            rating: 5
        },
        {
            name: "Maria R.",
            text: "The business numerology consultation helped me choose the perfect company name.",
            rating: 5
        }
    ]
};

// Currency conversion functions
function formatPrice(amount, currency) {
    if (currency === 'USD') {
        return `$${amount}`;
    } else {
        return `₹${amount.toLocaleString('en-IN')}`;
    }
}

function updateAllPrices(newCurrency) {
    const priceElements = document.querySelectorAll('.price');
    
    priceElements.forEach(element => {
        const usdPrice = parseFloat(element.getAttribute('data-usd'));
        const inrPrice = parseFloat(element.getAttribute('data-inr'));
        
        // Add updating class for animation
        element.classList.add('updating');
        
        setTimeout(() => {
            if (newCurrency === 'USD') {
                element.textContent = formatPrice(usdPrice, 'USD');
            } else {
                element.textContent = formatPrice(inrPrice, 'INR');
            }
            
            // Remove updating class after animation
            setTimeout(() => {
                element.classList.remove('updating');
            }, 300);
        }, 150);
    });
    
    // Update service select options
    updateServiceSelectPrices(newCurrency);
}

function updateServiceSelectPrices(currency) {
    const serviceSelect = document.getElementById('serviceSelect');
    const options = serviceSelect.querySelectorAll('option[value]:not([value=""])');
    
    options.forEach((option, index) => {
        const service = appData.services[index];
        const price = currency === 'USD' ? 
            formatPrice(service.priceUSD, 'USD') : 
            formatPrice(service.priceINR, 'INR');
        
        const serviceTitle = service.title.replace('Numerology Reading', 'Reading')
                                      .replace('& Correction', '');
        option.innerHTML = `${serviceTitle} - ${price}`;
    });
}

// Numerology calculation functions
function calculateLifePathNumber(birthDate) {
    const date = new Date(birthDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    let sum = day + month + year;
    
    // Reduce to single digit (except master numbers 11, 22, 33)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
}

function calculateDestinyNumber(fullName) {
    const nameMap = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };
    
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    let sum = 0;
    
    for (let char of cleanName) {
        sum += nameMap[char] || 0;
    }
    
    // Reduce to single digit (except master numbers)
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    
    return sum;
}

function getNumberInterpretation(number, type) {
    const interpretations = {
        lifePath: {
            1: "You are a natural leader with strong independence and pioneering spirit.",
            2: "You are diplomatic, cooperative, and work well in partnerships.",
            3: "You are creative, expressive, and have excellent communication skills.",
            4: "You are practical, organized, and value stability and hard work.",
            5: "You are adventurous, freedom-loving, and embrace change.",
            6: "You are nurturing, responsible, and focused on home and family.",
            7: "You are analytical, spiritual, and seek deeper truths.",
            8: "You are ambitious, business-minded, and focused on material success.",
            9: "You are humanitarian, generous, and focused on serving others.",
            11: "You are intuitive, inspirational, and have strong spiritual awareness.",
            22: "You are a master builder with the ability to turn dreams into reality.",
            33: "You are a master teacher with exceptional healing and teaching abilities."
        },
        destiny: {
            1: "Your destiny involves leadership and breaking new ground.",
            2: "Your destiny involves cooperation and bringing people together.",
            3: "Your destiny involves creative expression and inspiring others.",
            4: "Your destiny involves building solid foundations for others.",
            5: "Your destiny involves promoting freedom and progressive ideas.",
            6: "Your destiny involves nurturing and caring for others.",
            7: "Your destiny involves research, analysis, and spiritual teaching.",
            8: "Your destiny involves business leadership and material achievement.",
            9: "Your destiny involves humanitarian service and global awareness.",
            11: "Your destiny involves spiritual enlightenment and inspiration.",
            22: "Your destiny involves creating lasting change on a large scale.",
            33: "Your destiny involves healing and uplifting humanity."
        }
    };
    
    return interpretations[type][number] || "This number carries special significance in your life.";
}

// Testimonial carousel functionality
let currentTestimonial = 0;

function showTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialBtns.forEach(btn => btn.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    testimonialBtns[index].classList.add('active');
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % appData.testimonials.length;
    showTestimonial(nextIndex);
}

// Form validation and submission
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2d4a2b' : '#4a2d2b'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        border: 1px solid ${type === 'success' ? '#4ade80' : '#ef4444'};
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize application
function initializeApp() {
    // Set minimum date for booking form to today
    const today = new Date().toISOString().split('T')[0];
    const preferredDateInput = document.getElementById('preferredDate');
    if (preferredDateInput) {
        preferredDateInput.setAttribute('min', today);
    }
    
    // Currency selector event listener
    const currencySelect = document.getElementById('currencySelect');
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            appData.currentCurrency = this.value;
            updateAllPrices(this.value);
        });
        
        // Initialize with default currency
        updateAllPrices(appData.currentCurrency);
    }
    
    // Calculator functionality
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const fullName = document.getElementById('fullName').value.trim();
            const birthDate = document.getElementById('birthDate').value;
            
            if (!fullName || !birthDate) {
                showNotification('Please enter both your name and birth date.', 'error');
                return;
            }
            
            const lifePathNumber = calculateLifePathNumber(birthDate);
            const destinyNumber = calculateDestinyNumber(fullName);
            
            const resultContent = document.getElementById('resultContent');
            const resultDiv = document.getElementById('calculatorResult');
            
            resultContent.innerHTML = `
                <div class="number-result">
                    <h5>Life Path Number: ${lifePathNumber}</h5>
                    <p>${getNumberInterpretation(lifePathNumber, 'lifePath')}</p>
                </div>
                <div class="number-result" style="margin-top: 20px;">
                    <h5>Destiny Number: ${destinyNumber}</h5>
                    <p>${getNumberInterpretation(destinyNumber, 'destiny')}</p>
                </div>
                <div class="consultation-cta" style="margin-top: 24px; text-align: center; padding: 20px; background: rgba(255, 215, 0, 0.1); border-radius: 8px; border: 1px solid var(--mystical-gold);">
                    <p style="color: var(--mystical-gold); margin-bottom: 16px;">Want a detailed analysis?</p>
                    <button class="btn btn--primary" onclick="scrollToSection('#services')">
                        Book Full Reading - ${appData.currentCurrency === 'USD' ? '$150' : '₹12,450'}
                    </button>
                </div>
            `;
            
            resultDiv.classList.remove('hidden');
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Testimonial navigation
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    testimonialBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-rotate testimonials
    setInterval(nextTestimonial, 5000);
    
    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                service: document.getElementById('serviceSelect').value,
                date: document.getElementById('preferredDate').value,
                name: document.getElementById('clientName').value.trim(),
                email: document.getElementById('clientEmail').value.trim(),
                phone: document.getElementById('clientPhone').value.trim(),
                notes: document.getElementById('clientNotes').value.trim()
            };
            
            // Validation
            if (!formData.service) {
                showNotification('Please select a service.', 'error');
                return;
            }
            
            if (!formData.date) {
                showNotification('Please select a preferred date.', 'error');
                return;
            }
            
            if (!formData.name) {
                showNotification('Please enter your full name.', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!validatePhone(formData.phone)) {
                showNotification('Please enter a valid phone number.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! Your consultation request has been submitted. I will contact you within 24 hours to confirm your appointment.');
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Hero buttons functionality
    document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Free Calculator')) {
                scrollToSection('#tools');
            } else if (this.textContent.includes('Book Consultation')) {
                scrollToSection('.booking');
            }
        });
    });
    
    // Header consultation button
    document.querySelector('.header .btn--primary').addEventListener('click', function() {
        scrollToSection('.booking');
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            if (nav.style.display === 'flex') {
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'var(--cosmic-dark)';
                nav.style.flexDirection = 'column';
                nav.style.padding = '20px';
                nav.style.borderTop = '1px solid var(--mystical-gold)';
            }
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing to my newsletter!');
            this.reset();
        });
    }
    
    // Add to cart functionality
    document.querySelectorAll('.product-card .btn--outline').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const priceElement = productCard.querySelector('.price');
            const price = priceElement.textContent;
            
            showNotification(`${productName} (${price}) added to cart!`);
            
            // Update cart icon with animation
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartIcon.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Service booking buttons
    document.querySelectorAll('.service-card .btn--primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            // Pre-select the service in booking form
            const serviceSelect = document.getElementById('serviceSelect');
            const options = Array.from(serviceSelect.options);
            const matchingOption = options.find(option => 
                option.textContent.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0].toLowerCase())
            );
            
            if (matchingOption) {
                serviceSelect.value = matchingOption.value;
            }
            
            // Scroll to booking section
            scrollToSection('.booking');
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);