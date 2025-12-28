// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.header').offsetHeight;
            const scrollPosition = window.scrollY + headerHeight + 100;
            
            // Check if we're at the bottom of the page
            const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;
            
            if (isAtBottom && section.getAttribute('id') === 'contact') {
                current = 'contact';
            } else if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call once on load

    // Add scroll effect to header
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 41, 59, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#1e293b';
            header.style.backdropFilter = 'none';
        }
    });

    // Scroll animation removed - timeline items display normally

    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Typing effect removed - hero title displays normally

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    });

    // Counter animation removed - text displays normally
});

// Toggle project features visibility
function toggleProjectFeatures() {
    const features = document.getElementById('project-features');
    const button = document.getElementById('expand-button');
    const text = document.getElementById('expand-text');
    const icon = document.getElementById('expand-icon');
    
    if (features.classList.contains('expanded')) {
        // Collapse - get current height first for smooth animation
        const currentHeight = features.scrollHeight;
        features.style.maxHeight = currentHeight + 'px';
        
        // Force reflow
        features.offsetHeight;
        
        // Now animate to collapsed height
        features.style.maxHeight = '300px';
        features.classList.remove('expanded');
        button.classList.remove('expanded');
        text.textContent = 'Show More';
    } else {
        // Expand
        features.classList.add('expanded');
        button.classList.add('expanded');
        text.textContent = 'Show Less';
        
        // Calculate actual height for smooth animation
        const scrollHeight = features.scrollHeight;
        features.style.maxHeight = scrollHeight + 'px';
        
        // Reset to auto after animation completes
        setTimeout(() => {
            if (features.classList.contains('expanded')) {
                features.style.maxHeight = 'none';
            }
        }, 600);
    }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links a.active {
        color: #2563eb;
        font-weight: 600;
    }
`;
document.head.appendChild(style);
