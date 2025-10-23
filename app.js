// Cart functionality
let cart = [];

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Add product to cart
function addToCart(name, price, volume = null) {
    const item = {
        id: Date.now(),
        name: name,
        price: price,
        volume: volume,
        type: 'product'
    };
    
    cart.push(item);
    updateCartCount();
    updateCartDisplay();
    
    // Show success message
    showNotification(`${name} added to cart!`, 'success');
}

// Book service (add to cart)
function bookService(name, price) {
    const item = {
        id: Date.now(),
        name: name,
        price: price,
        type: 'service'
    };
    
    cart.push(item);
    updateCartCount();
    updateCartDisplay();
    
    // Show success message
    showNotification(`${name} consultation booked!`, 'success');
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    updateCartDisplay();
}

// Clear entire cart
function clearCart() {
    cart = [];
    updateCartCount();
    updateCartDisplay();
    showNotification('Cart cleared!', 'info');
}

// Update cart display in modal
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: var(--space-32);">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        total += item.price;
        return `
            <div class="cart-item">
                <div class="cart-item__info">
                    <div class="cart-item__name">${item.name}</div>
                    <div class="cart-item__details">
                        ${item.volume ? `${item.volume} • ` : ''}${item.type === 'service' ? 'Consultation' : 'Product'}
                    </div>
                </div>
                <div class="cart-item__price">₹${item.price}</div>
                <button onclick="removeFromCart(${item.id})" style="background: none; border: none; color: var(--color-error); cursor: pointer; margin-left: var(--space-8);">×</button>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toLocaleString();
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.toggle('hidden');
        updateCartDisplay();
    }
}

// Close cart modal
function closeCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const itemCount = cart.length;
    
    // Simulate checkout process
    showNotification('Redirecting to payment...', 'info');
    
    setTimeout(() => {
        alert(`Thank you for your order!\n\nItems: ${itemCount}\nTotal: ₹${total.toLocaleString()}\n\nYou will receive a confirmation email shortly.`);
        clearCart();
        closeCart();
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        color: var(--color-text);
        padding: var(--space-16) var(--space-20);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--color-${type === 'success' ? 'success' : type === 'error' ? 'error' : 'info'});
        z-index: 3000;
        min-width: 250px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
function addNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .nav__link.active {
            color: var(--color-gold-500) !important;
            position: relative;
        }
        
        .nav__link.active::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--color-gold-500);
            border-radius: 1px;
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animateElements = document.querySelectorAll('.service-card, .product-card, .credential-card');
    animateElements.forEach(el => observer.observe(el));
}

// Handle mobile menu toggle (for future expansion)
function initMobileMenu() {
    // This can be expanded later if a mobile hamburger menu is needed
    const nav = document.querySelector('.nav__menu');
    
    // Close mobile menu when clicking outside (if implemented)
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !e.target.matches('.mobile-menu-toggle')) {
            nav.classList.remove('mobile-menu-open');
        }
    });
}

// Testimonials functionality
let currentTestimonial = 0;
let testimonialInterval;

function showTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.testimonial__indicator');
    
    if (!cards.length) return;
    
    // Remove active class from all
    cards.forEach(card => card.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current
    if (cards[index]) {
        cards[index].classList.add('active');
    }
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

function nextTestimonial() {
    const cards = document.querySelectorAll('.testimonial-card');
    const nextIndex = (currentTestimonial + 1) % cards.length;
    showTestimonial(nextIndex);
    
    // Add ripple effect to next button
    addButtonRipple(event.target);
}

function previousTestimonial() {
    const cards = document.querySelectorAll('.testimonial-card');
    const prevIndex = currentTestimonial === 0 ? cards.length - 1 : currentTestimonial - 1;
    showTestimonial(prevIndex);
    
    // Add ripple effect to prev button
    addButtonRipple(event.target);
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        nextTestimonial();
    }, 5000);
}

function stopTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
    }
}

// Enhanced particle system with premium effects
function createCosmicParticles() {
    const particleContainer = document.getElementById('cosmic-particles');
    if (!particleContainer) return;
    
    // Create enhanced particles dynamically (reduced by 70%)
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        const isGold = Math.random() > 0.6;
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: ${isGold ? 'var(--color-gold-400)' : 'var(--color-purple-500)'};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkleFloat ${Math.random() * 20 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * -12}s;
            box-shadow: 0 0 ${Math.random() * 30 + 10}px currentColor;
            opacity: ${Math.random() * 0.3 + 0.1};
            filter: blur(${Math.random() * 0.5}px);
        `;
        particleContainer.appendChild(particle);
    }
    
    // Add some larger glowing orbs (reduced)
    for (let i = 0; i < 3; i++) {
        const orb = document.createElement('div');
        orb.className = 'cosmic-orb-particle';
        orb.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 15}px;
            height: ${Math.random() * 20 + 15}px;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.4) 0%, transparent 70%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: cosmicFloat ${Math.random() * 25 + 15}s ease-in-out infinite;
            animation-delay: ${Math.random() * -15}s;
            filter: blur(1px);
        `;
        particleContainer.appendChild(orb);
    }
}

// Create enhanced mystical symbols
function createMysticalSymbols() {
    const symbolsContainer = document.getElementById('mystical-symbols');
    if (!symbolsContainer) return;
    
    const symbols = ['✧', '✨', '✦', '★', '⛨', '☯', '⚝', '◊', '◈', '◇', '⬟', '⬢'];
    
    // Reduced mystical symbols count by 70%
    for (let i = 0; i < 6; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'mystical-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const isGoldSymbol = Math.random() > 0.7;
        symbol.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 25 + 18}px;
            color: ${isGoldSymbol ? 'rgba(245, 158, 11, 0.6)' : 'rgba(124, 58, 237, 0.5)'};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: sparkleFloat ${Math.random() * 24 + 14}s ease-in-out infinite;
            animation-delay: ${Math.random() * -16}s;
            pointer-events: none;
            text-shadow: 0 0 20px currentColor;
            filter: drop-shadow(0 0 10px currentColor);
        `;
        symbolsContainer.appendChild(symbol);
    }
}

// Enhanced button ripple effect
function addButtonRipple(button) {
    if (!button) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'button-ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(var(--color-gold-500-rgb), 0.3);
        transform: scale(0);
        left: 50%;
        top: 50%;
        margin-left: ${-size/2}px;
        margin-top: ${-size/2}px;
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Magnetic button effect
function addMagneticEffect() {
    const magneticButtons = document.querySelectorAll('.btn--magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
        
        button.addEventListener('click', (e) => {
            addButtonRipple(button);
        });
    });
}

// Enhanced parallax scrolling with performance optimization
function initAdvancedParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero cosmic background
        const cosmicBg = document.querySelector('.hero__cosmic-bg');
        if (cosmicBg) {
            cosmicBg.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Enhanced parallax for geometric elements
        const geometricCircles = document.querySelector('.geometric-circles');
        if (geometricCircles) {
            geometricCircles.style.transform = `translateY(${scrolled * 0.15}px) rotateZ(${scrolled * 0.02}deg)`;
        }
        
        // Parallax for floating elements
        const floatingElements = document.querySelectorAll('.cosmic-orb');
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrolled * 0.0001}) rotateZ(${scrolled * 0.01}deg)`;
        });
        
        // Enhanced parallax for floating numbers
        const floatingNumbers = document.querySelectorAll('.floating-number');
        floatingNumbers.forEach((number, index) => {
            const speed = 0.08 + (index * 0.02);
            number.style.transform = `translateY(${scrolled * speed}px) rotateZ(${scrolled * 0.005}deg)`;
        });
        
        // Parallax for particles with enhanced movement
        const particles = document.querySelectorAll('.cosmic-particle, .mystical-symbol');
        particles.forEach((particle, index) => {
            const speed = 0.1 + (index % 5) * 0.03;
            const rotationSpeed = (index % 3) * 0.01;
            particle.style.transform = `translateY(${scrolled * speed}px) rotateZ(${scrolled * rotationSpeed}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Intersection Observer for scroll animations
function initAdvancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                    
                    // Add different animation classes based on element type
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.classList.add('slide-in-left');
                    } else if (entry.target.classList.contains('product-card')) {
                        entry.target.classList.add('slide-in-right');
                    }
                    
                    // Add shimmer effect to titles
                    const title = entry.target.querySelector('h4, h3, h2');
                    if (title && !title.classList.contains('shimmer-effect')) {
                        title.classList.add('shimmer-effect');
                    }
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .product-card, .credential-card, .calculator-card, .consultation__form'
    );
    animatedElements.forEach(el => observer.observe(el));
}

// Cursor trail effect (subtle)
function initCursorEffects() {
    let mouseX = 0, mouseY = 0;
    let trail = [];
    
    // Create cursor trail elements (reduced)
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${8 - i}px;
            height: ${8 - i}px;
            background: rgba(var(--color-gold-500-rgb), ${0.8 - i * 0.15});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease-out;
        `;
        document.body.appendChild(dot);
        trail.push({ element: dot, x: 0, y: 0 });
    }
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animate trail
    function animateTrail() {
        trail.forEach((dot, index) => {
            if (index === 0) {
                dot.x = mouseX;
                dot.y = mouseY;
            } else {
                const prevDot = trail[index - 1];
                dot.x += (prevDot.x - dot.x) * 0.3;
                dot.y += (prevDot.y - dot.y) * 0.3;
            }
            
            dot.element.style.transform = `translate(${dot.x - 4}px, ${dot.y - 4}px)`;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Enhanced card 3D tilt effect
function init3DTiltEffect() {
    const tiltCards = document.querySelectorAll('.service-card, .product-card, .credential-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize premium features
    createCosmicParticles();
    createMysticalSymbols();
    addMagneticEffect();
    initAdvancedParallax();
    initAdvancedScrollAnimations();
    init3DTiltEffect();
    initScrollHeader();
    
    // Initialize testimonials
    showTestimonial(0);
    startTestimonialAutoplay();
    
    // Pause testimonial autoplay on hover
    const testimonialContainer = document.querySelector('.testimonials__container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', stopTestimonialAutoplay);
        testimonialContainer.addEventListener('mouseleave', startTestimonialAutoplay);
    }
    
    // Initialize cursor effects (only on desktop)
    if (window.innerWidth > 768) {
        initCursorEffects();
    }
    addNotificationStyles();
    initSmoothScrolling();
    initEnhancedScrollAnimations();
    initParallaxScrolling();
    initActiveNavigation();
    initMobileMenu();
    updateCartCount();
    
    // Initialize calculator form with visibility protection
    const calculatorForm = document.getElementById('calculator-form');
    if (calculatorForm) {
        calculatorForm.addEventListener('submit', handleCalculatorSubmission);
        
        // Ensure form is always visible on page load
        calculatorForm.style.display = 'flex';
        calculatorForm.style.visibility = 'visible';
        calculatorForm.style.opacity = '1';
        calculatorForm.style.transform = 'none';
        calculatorForm.style.position = 'static';
        
        // Protect against any external scripts trying to hide the form
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                    // Reset form visibility if something tries to hide it
                    const form = document.getElementById('calculator-form');
                    if (form) {
                        const computedStyle = window.getComputedStyle(form);
                        if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden' || computedStyle.opacity === '0') {
                            form.style.display = 'flex';
                            form.style.visibility = 'visible';
                            form.style.opacity = '1';
                            form.style.transform = 'none';
                        }
                    }
                }
            });
        });
        
        observer.observe(calculatorForm, {
            attributes: true,
            attributeOldValue: true,
            subtree: true
        });
    }
    
    // Initialize consultation form
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmission);
    }
    
    // Add ripple effect to buttons with ripple class
    const rippleButtons = document.querySelectorAll('.calculator__submit, .consultation__submit');
    rippleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            addRippleEffect(e);
            addButtonRipple(button);
        });
    });
    
    // Add click effects to all buttons
    const allButtons = document.querySelectorAll('.btn');
    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.classList.contains('btn--magnetic')) {
                addButtonRipple(button);
            }
        });
    });
    
    // Close modal when clicking backdrop
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('cart-modal__backdrop')) {
                closeCart();
            }
        });
    }
    
    // Handle escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
});

// Life Path Number Calculator
function calculateLifePath(birthDate) {
    // Extract day, month, year from date
    const date = new Date(birthDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // Reduce each component to single digit
    const reduceToSingleDigit = (num) => {
        while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
            num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return num;
    };
    
    day = reduceToSingleDigit(day);
    month = reduceToSingleDigit(month);
    year = reduceToSingleDigit(year);
    
    // Calculate life path number
    let lifePathNumber = day + month + year;
    lifePathNumber = reduceToSingleDigit(lifePathNumber);
    
    return lifePathNumber;
}

// Get life path meaning
function getLifePathMeaning(number) {
    const meanings = {
        1: {
            title: "The Leader",
            description: "You are a natural born leader with strong independence and pioneering spirit. Your path involves initiating new projects and inspiring others to follow your vision."
        },
        2: {
            title: "The Diplomat",
            description: "You are a natural peacemaker with exceptional intuition and sensitivity. Your path involves cooperation, partnership, and bringing harmony to relationships."
        },
        3: {
            title: "The Creative Communicator",
            description: "You are blessed with creativity, charm, and excellent communication skills. Your path involves self-expression through art, writing, or public speaking."
        },
        4: {
            title: "The Builder",
            description: "You are practical, reliable, and have a strong work ethic. Your path involves creating solid foundations and bringing order to chaos through systematic approaches."
        },
        5: {
            title: "The Freedom Seeker",
            description: "You crave freedom, adventure, and variety in life. Your path involves exploring the world, experiencing different cultures, and inspiring others to embrace change."
        },
        6: {
            title: "The Nurturer",
            description: "You are naturally caring, responsible, and family-oriented. Your path involves healing, teaching, and creating harmony in your community and family."
        },
        7: {
            title: "The Mystic",
            description: "You are introspective, analytical, and spiritually inclined. Your path involves seeking deeper truths, research, and sharing wisdom with others."
        },
        8: {
            title: "The Achiever",
            description: "You are ambitious, organized, and have natural business acumen. Your path involves material success, leadership in business, and creating lasting legacies."
        },
        9: {
            title: "The Humanitarian",
            description: "You are compassionate, generous, and globally minded. Your path involves serving humanity, fighting for justice, and making the world a better place."
        },
        11: {
            title: "The Visionary (Master Number)",
            description: "You possess heightened intuition and spiritual insight. Your path involves inspiring others through your vision and serving as a spiritual guide."
        },
        22: {
            title: "The Master Builder (Master Number)",
            description: "You have the ability to turn dreams into reality on a grand scale. Your path involves creating something of lasting value that benefits humanity."
        },
        33: {
            title: "The Master Teacher (Master Number)",
            description: "You are here to uplift and heal humanity through compassion and teaching. Your path involves selfless service and spiritual guidance."
        }
    };
    
    return meanings[number] || meanings[1];
}

// Handle calculator form submission
function handleCalculatorSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const birthDate = formData.get('birthDate');
    
    // Ensure form stays visible during and after submission
    form.style.display = 'flex';
    form.style.visibility = 'visible';
    form.style.opacity = '1';
    form.style.transform = 'none';
    form.style.position = 'static';
    
    if (!fullName || !birthDate) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Calculate life path number
    const lifePathNumber = calculateLifePath(birthDate);
    const meaning = getLifePathMeaning(lifePathNumber);
    
    // Display results with animation (form stays visible)
    showCalculatorResult(lifePathNumber, meaning, fullName);
}

// Show calculator result with animation
function showCalculatorResult(number, meaning, name) {
    const resultDiv = document.getElementById('calculator-result');
    const numberDisplay = document.getElementById('life-path-number');
    const titleDisplay = document.getElementById('result-title');
    const descriptionDisplay = document.getElementById('result-description');
    const calculatorForm = document.getElementById('calculator-form');
    
    if (!resultDiv || !numberDisplay || !titleDisplay || !descriptionDisplay) return;
    
    // Ensure form always stays visible and in place
    if (calculatorForm) {
        calculatorForm.style.display = 'flex';
        calculatorForm.style.visibility = 'visible';
        calculatorForm.style.opacity = '1';
        calculatorForm.style.transform = 'none';
        calculatorForm.style.position = 'static';
    }
    
    // Animate number appearance
    numberDisplay.textContent = number;
    titleDisplay.textContent = `${name.split(' ')[0]}, you are ${meaning.title}`;
    descriptionDisplay.textContent = meaning.description;
    
    // Show result with fade-in animation (only the result, not the form)
    resultDiv.classList.remove('hidden');
    resultDiv.style.opacity = '0';
    resultDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        resultDiv.style.transition = 'all 0.6s ease-out';
        resultDiv.style.opacity = '1';
        resultDiv.style.transform = 'translateY(0)';
        
        // Gentle scroll to show result without hiding form
        resultDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest'
        });
    }, 100);
    
    showNotification('Your Life Path Number has been calculated!', 'success');
}

// Reset calculator
function resetCalculator() {
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('calculator-result');
    
    // Ensure form always stays visible during reset
    if (form) {
        form.reset();
        form.style.display = 'flex';
        form.style.visibility = 'visible';
        form.style.opacity = '1';
        form.style.transform = 'none';
        form.style.position = 'static';
    }
    
    // Only hide the result section, never the form
    if (resultDiv) {
        resultDiv.style.transition = 'all 0.3s ease-in';
        resultDiv.style.opacity = '0';
        resultDiv.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            resultDiv.classList.add('hidden');
        }, 300);
    }
}

// Scroll to consultation section
function scrollToConsultation() {
    const consultationSection = document.getElementById('consultation');
    if (consultationSection) {
        consultationSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight the consultation form
        const form = document.getElementById('consultation-form');
        if (form) {
            setTimeout(() => {
                form.style.transform = 'scale(1.02)';
                form.style.transition = 'transform 0.3s ease-out';
                
                setTimeout(() => {
                    form.style.transform = 'scale(1)';
                }, 600);
            }, 800);
        }
    }
}

// Handle consultation form submission
function handleConsultationSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Basic validation
    const requiredFields = ['clientName', 'clientEmail', 'clientPhone', 'consultationType', 'clientDob'];
    const missingFields = requiredFields.filter(field => !formData.get(field));
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.querySelector('.btn-text').textContent;
    
    submitButton.disabled = true;
    submitButton.querySelector('.btn-text').textContent = 'Booking...';
    
    // Show loading animation
    showNotification('Processing your consultation booking...', 'info');
    
    setTimeout(() => {
        // Hide form and show success message
        form.style.transition = 'all 0.5s ease-out';
        form.style.opacity = '0';
        form.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            form.classList.add('hidden');
            
            const successDiv = document.getElementById('consultation-success');
            if (successDiv) {
                successDiv.classList.remove('hidden');
                successDiv.style.opacity = '0';
                successDiv.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    successDiv.style.transition = 'all 0.6s ease-out';
                    successDiv.style.opacity = '1';
                    successDiv.style.transform = 'translateY(0)';
                }, 100);
            }
            
            showNotification('Consultation booked successfully!', 'success');
        }, 500);
        
        // Reset button state
        submitButton.disabled = false;
        submitButton.querySelector('.btn-text').textContent = originalText;
        
    }, 2000);
}

// Add ripple effect to buttons
function addRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = button.querySelector('.btn-ripple');
    
    if (!ripple) return;
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    ripple.style.animation = 'rippleEffect 0.6s linear';
    
    setTimeout(() => {
        ripple.style.animation = '';
    }, 600);
}

// Enhanced scroll animations with stagger effect
function initEnhancedScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections with stagger
    const animateElements = document.querySelectorAll('.service-card, .product-card, .credential-card');
    animateElements.forEach(el => observer.observe(el));
}

// Add parallax scrolling effect
function initParallaxScrolling() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .services::before');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Enhanced scroll spy navigation with Intersection Observer
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Map to track section visibility ratios
    const sectionVisibility = new Map();
    
    // Initialize all sections as not visible
    sections.forEach(section => {
        sectionVisibility.set(section.id, 0);
    });
    
    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -20% 0px', // Only trigger when section is 20% visible
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            
            // Update visibility ratio for this section
            sectionVisibility.set(sectionId, entry.intersectionRatio);
            
            // Find the section with highest visibility ratio
            let maxVisibility = 0;
            let mostVisibleSection = 'about'; // Default to about
            
            sectionVisibility.forEach((visibility, id) => {
                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    mostVisibleSection = id;
                }
            });
            
            // If no section is significantly visible, check scroll position for fallback
            if (maxVisibility < 0.1) {
                const scrollTop = window.pageYOffset;
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                        mostVisibleSection = section.id;
                    }
                });
            }
            
            // Update navigation active states with smooth transition
            updateActiveNavLink(mostVisibleSection);
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Function to update active navigation link
    function updateActiveNavLink(activeSection) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href === `#${activeSection}`;
            
            // Remove existing active classes
            link.classList.remove('nav__link--active', 'active');
            
            // Add active class to current section link
            if (isActive) {
                link.classList.add('nav__link--active');
            }
        });
    }
    
    // Initialize with 'about' as active on page load
    setTimeout(() => {
        updateActiveNavLink('about');
    }, 100);
}

// Enhanced form interactivity
function addFloatingLabels() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('.form-control');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            // Add floating label class
            group.classList.add('floating-label');
            
            // Move label after input for CSS sibling selector to work
            input.parentNode.insertBefore(label, input.nextSibling);
            
            // Add placeholder for floating effect
            if (!input.placeholder) {
                input.placeholder = ' ';
            }
        }
    });
}

// Enhanced scroll-to-section with easing
function scrollToSection(sectionId, offset = 80) {
    const section = document.querySelector(sectionId);
    if (!section) return;
    
    const targetPosition = section.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;
    
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Enhanced scroll header effect
function initScrollHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on slower devices
    if (navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
        
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.5s !important;
                transition-duration: 0.2s !important;
            }
            .reduced-motion .cosmic-particle,
            .reduced-motion .mystical-symbol {
                opacity: 0.3 !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeAnimations();
addFloatingLabels();

// Export functions for global access
window.addToCart = addToCart;
window.bookService = bookService;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.toggleCart = toggleCart;
window.closeCart = closeCart;
window.checkout = checkout;
window.resetCalculator = resetCalculator;
window.scrollToConsultation = scrollToConsultation;
window.showTestimonial = showTestimonial;
window.nextTestimonial = nextTestimonial;
window.previousTestimonial = previousTestimonial;
window.scrollToSection = scrollToSection;