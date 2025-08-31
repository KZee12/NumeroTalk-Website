// Application data
const appData = {
  services: [
    {
      title: "Personal Numerology Reading",
      description: "Comprehensive analysis of your life path, destiny, and soul numbers",
      price: "$150",
      icon: "1"
    },
    {
      title: "Business Numerology",
      description: "Optimize your business name and launch dates for success",
      price: "$200",
      icon: "B"
    },
    {
      title: "Relationship Compatibility",
      description: "Discover numerical harmony between partners",
      price: "$125",
      icon: "♥"
    },
    {
      title: "Name Analysis & Correction",
      description: "Find the perfect name vibration for positive energy",
      price: "$100",
      icon: "N"
    }
  ],
  products: [
    {
      name: "Numerology Guide Book",
      price: "$29.99",
      category: "Books",
      icon: "📚"
    },
    {
      name: "Crystal Set for Numbers 1-9",
      price: "$89.99",
      category: "Crystals",
      icon: "💎"
    },
    {
      name: "Personal Number Chart",
      price: "$49.99",
      category: "Charts",
      icon: "📊"
    },
    {
      name: "Digital Numerology Course",
      price: "$199.99",
      category: "Digital",
      icon: "💻"
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

// Life path number meanings
const lifePathMeanings = {
  1: "The Leader - You are independent, pioneering, and ambitious. Natural born leaders with strong willpower.",
  2: "The Peacemaker - You are cooperative, diplomatic, and sensitive. You work best in partnerships.",
  3: "The Creative - You are expressive, optimistic, and artistic. Communication and creativity are your strengths.",
  4: "The Builder - You are practical, hardworking, and organized. You excel at building solid foundations.",
  5: "The Adventurer - You are energetic, curious, and freedom-loving. You thrive on variety and change.",
  6: "The Nurturer - You are caring, responsible, and family-oriented. You have a natural desire to help others.",
  7: "The Seeker - You are analytical, introspective, and spiritual. You seek deeper truths and knowledge.",
  8: "The Achiever - You are ambitious, business-minded, and authoritative. Material success comes naturally.",
  9: "The Humanitarian - You are compassionate, generous, and idealistic. You work for the greater good."
};

// Shopping cart state
let cart = [];

// DOM elements
let navToggle, navMenu, calculatorForm, calculatorResult, consultationForm;
let servicesGrid, productsGrid, testimonialsCarousel, cartCount;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  navToggle = document.getElementById('navToggle');
  navMenu = document.getElementById('navMenu');
  calculatorForm = document.getElementById('calculatorForm');
  calculatorResult = document.getElementById('calculatorResult');
  consultationForm = document.getElementById('consultationForm');
  servicesGrid = document.getElementById('servicesGrid');
  productsGrid = document.getElementById('productsGrid');
  testimonialsCarousel = document.getElementById('testimonialsCarousel');
  cartCount = document.querySelector('.cart-count');
  
  initializeNavigation();
  populateServices();
  populateProducts();
  populateTestimonials();
  initializeCalculator();
  initializeForms();
  initializeScrollAnimations();
  initializeSmoothScroll();
  updateCartCount();
});

// Navigation functionality
function initializeNavigation() {
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
        
        // Handle smooth scrolling
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
      });
    });
  }

  // Header background on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(13, 13, 43, 0.98)';
      } else {
        header.style.background = 'rgba(13, 13, 43, 0.95)';
      }
    }
  });
}

// Populate services section
function populateServices() {
  if (servicesGrid) {
    const servicesHTML = appData.services.map(service => `
      <div class="service-card" data-aos="fade-up">
        <div class="service-card__icon">${service.icon}</div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <div class="service-card__price">${service.price}</div>
        <button class="btn btn--primary" onclick="bookService('${service.title}')">Learn More</button>
      </div>
    `).join('');
    
    servicesGrid.innerHTML = servicesHTML;
  }
}

// Populate products section
function populateProducts() {
  if (productsGrid) {
    const productsHTML = appData.products.map((product, index) => `
      <div class="product-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="product-card__image">${product.icon}</div>
        <div class="product-card__content">
          <div class="product-card__category">${product.category}</div>
          <h3>${product.name}</h3>
          <div class="product-card__price">${product.price}</div>
          <button class="btn btn--primary btn--full-width" onclick="addToCart('${product.name}', '${product.price}')">
            Add to Cart
          </button>
        </div>
      </div>
    `).join('');
    
    productsGrid.innerHTML = productsHTML;
  }
}

// Populate testimonials section
function populateTestimonials() {
  if (testimonialsCarousel) {
    const testimonialsHTML = appData.testimonials.map((testimonial, index) => `
      <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 100}">
        <div class="testimonial-rating">
          ${'★'.repeat(testimonial.rating)}
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">- ${testimonial.name}</div>
      </div>
    `).join('');
    
    testimonialsCarousel.innerHTML = testimonialsHTML;
  }
}

// Life path number calculator
function initializeCalculator() {
  if (calculatorForm && calculatorResult) {
    calculatorForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById('fullName').value.trim();
      const birthDate = document.getElementById('birthDate').value;
      
      if (!fullName || !birthDate) {
        showNotification('Please fill in all fields');
        return;
      }
      
      // Add loading animation
      const submitBtn = calculatorForm.querySelector('button');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Calculating...';
      submitBtn.disabled = true;
      
      // Simulate calculation delay for better UX
      setTimeout(() => {
        const lifePathNumber = calculateLifePathNumber(birthDate);
        displayResult(lifePathNumber, fullName);
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

// Calculate life path number
function calculateLifePathNumber(birthDate) {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  // Sum all digits
  let sum = reduceToSingleDigit(day) + reduceToSingleDigit(month) + reduceToSingleDigit(year);
  
  // Reduce to single digit (except master numbers 11, 22, 33)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = reduceToSingleDigit(sum);
  }
  
  return sum;
}

// Helper function to reduce number to single digit
function reduceToSingleDigit(num) {
  while (num > 9) {
    num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  }
  return num;
}

// Display calculation result
function displayResult(lifePathNumber, fullName) {
  const meaning = lifePathMeanings[lifePathNumber] || "A unique and special path awaits you.";
  
  if (calculatorResult) {
    calculatorResult.innerHTML = `
      <h4>Hello ${fullName}!</h4>
      <div class="result-number">${lifePathNumber}</div>
      <div class="result-meaning">${meaning}</div>
      <p style="margin-top: 16px; font-size: 14px; opacity: 0.8;">
        For a complete reading with personalized insights, book a consultation with Pranjali.
      </p>
      <button class="btn btn--outline" onclick="scrollToSection('consultation')" style="margin-top: 16px;">
        Book Full Reading
      </button>
    `;
    
    calculatorResult.classList.add('show');
    
    // Smooth scroll to result
    setTimeout(() => {
      calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}

// Form handling
function initializeForms() {
  if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const clientName = document.getElementById('clientName').value.trim();
      const clientEmail = document.getElementById('clientEmail').value.trim();
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const serviceType = document.getElementById('serviceType').value;
      const preferredDate = document.getElementById('preferredDate').value;
      
      // Basic validation
      if (!clientName || !clientEmail || !clientPhone || !serviceType || !preferredDate) {
        showNotification('Please fill in all required fields');
        return;
      }
      
      if (!isValidEmail(clientEmail)) {
        showNotification('Please enter a valid email address');
        return;
      }
      
      // Simulate form submission
      const submitBtn = consultationForm.querySelector('button');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Scheduling...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showNotification('Thank you! Your consultation request has been submitted. Pranjali will contact you within 24 hours.');
        consultationForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }
  
  // Newsletter subscription
  const newsletterForm = document.querySelector('.newsletter');
  if (newsletterForm) {
    const newsletterBtn = newsletterForm.querySelector('button');
    if (newsletterBtn) {
      newsletterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input');
        const email = emailInput.value.trim();
        
        if (email && isValidEmail(email)) {
          showNotification('Thank you for subscribing to our newsletter!');
          emailInput.value = '';
        } else {
          showNotification('Please enter a valid email address.');
        }
      });
    }
  }
}

// Email validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Shopping cart functionality
function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  updateCartCount();
  
  // Show success message
  showNotification(`${productName} added to cart!`);
}

function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
    
    if (cart.length > 0) {
      cartCount.style.display = 'flex';
      cartCount.style.opacity = '1';
    } else {
      cartCount.style.display = 'none';
      cartCount.style.opacity = '0';
    }
  }
}

// Notification system
function showNotification(message) {
  // Remove any existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notif => notif.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #4A148C, #7B1FA2);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(138, 43, 226, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    border: 1px solid rgba(255, 215, 0, 0.3);
    max-width: 300px;
    font-size: 14px;
    line-height: 1.4;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Book service function
function bookService(serviceName) {
  const serviceSelect = document.getElementById('serviceType');
  if (serviceSelect) {
    const serviceOptions = serviceSelect.querySelectorAll('option');
    
    // Find and select the matching service
    for (let option of serviceOptions) {
      if (option.textContent.includes(serviceName.split(' ')[0])) {
        serviceSelect.value = option.value;
        break;
      }
    }
  }
  
  // Scroll to consultation section
  scrollToSection('consultation');
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements with data-aos attribute
  const animatedElements = document.querySelectorAll('[data-aos]');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Smooth scrolling for navigation links
function initializeSmoothScroll() {
  // Handle hero section buttons
  const heroButtons = document.querySelectorAll('.hero__buttons a');
  heroButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        scrollToSection(targetId);
      }
    });
  });
  
  // Handle all anchor links
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  allAnchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
}

// Scroll to section function
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId);
  if (targetElement) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 80;
    const targetPosition = targetElement.offsetTop - headerHeight - 20;
    
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  }
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero && scrolled < window.innerHeight) {
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to buttons
  setTimeout(() => {
    const buttons = document.querySelectorAll('.btn--primary');
    
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, 600);
      });
    });
  }, 1000);
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    from {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);