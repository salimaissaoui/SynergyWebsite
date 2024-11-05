// Utility function for DOM element selection
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// Debounce function for performance optimization
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Sticky Header on Scroll
const handleScroll = debounce(() => {
  const header = select('.main-header');
  header.classList.toggle('scrolled', window.scrollY > 50);
  
  const backToTopBtn = select('.back-to-top');
  backToTopBtn.classList.toggle('show-back-to-top', window.scrollY > 500);
}, 100);

window.addEventListener('scroll', handleScroll);

// Responsive Navigation Menu
const navToggle = select('.nav-toggle');
const mainNav = select('.main-nav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Smooth Scroll for Anchor Links
const smoothScroll = (targetId) => {
  const targetSection = select(targetId);
  targetSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

selectAll('.main-nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    smoothScroll(targetId);
    
    // Close mobile menu after click
    mainNav.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Typewriter Effect with Multiple Sentences
const typewriterEffect = (element, texts, speed = 100, pause = 2000) => {
  let textIndex = 0;  // Track the current sentence index
  let charIndex = 0;  // Track the current character index

  const type = () => {
    if (charIndex <= texts[textIndex].length) {
      // Display characters one by one
      element.textContent = texts[textIndex].substring(0, charIndex);
      charIndex++;
      setTimeout(type, speed);
    } else {
      // Pause before deleting the text
      setTimeout(deleteText, pause);
    }
  };

  const deleteText = () => {
    if (charIndex > 0) {
      // Delete characters one by one
      element.textContent = texts[textIndex].substring(0, charIndex);
      charIndex--;
      setTimeout(deleteText, speed / 2);
    } else {
      // Move to the next sentence
      textIndex = (textIndex + 1) % texts.length;  // Loop back to the start
      setTimeout(type, speed);
    }
  };

  type();
};

const typewriterText = select('#typewriter-text');
typewriterEffect(typewriterText, [
  "Creating a cleaner environment for future generations.",
  "Innovative solutions for a sustainable future.",
  "Committed to tackling environmental challenges.",
  "Empowering industries with PFAS remediation."
]);


// Initialize Tilt.js
VanillaTilt.init(selectAll(".tilt"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

// Circular Reveal Effect
const addCircularRevealEffect = (containerSelector, radius = 150) => {
  const hoverContainer = select(containerSelector);
  if (!hoverContainer) return;

  const hoverImage = hoverContainer.querySelector('.hover-image');
  if (!hoverImage) return;

  const handleMouseMove = (e) => {
    const rect = hoverContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hoverImage.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
  };

  const handleMouseLeave = () => {
    hoverImage.style.clipPath = 'circle(0% at 0 0)';
  };

  hoverContainer.addEventListener('mousemove', handleMouseMove);
  hoverContainer.addEventListener('mouseleave', handleMouseLeave);
};

addCircularRevealEffect('.hover-effect-container');

particlesJS('particles-js', {
  particles: {
    number: {
      value: 150,  // Increase particle count for a denser effect
      density: {
        enable: true,
        value_area: 800  // Keep density area to avoid overcrowding
      }
    },
    color: {
      value: ["#2a5d41", "#ff6f61", "#f4d35e", "#4a4a4a"]  // Multi-color particles for a vibrant effect
    },
    shape: {
      type: ["circle", "triangle", "edge"],  // Add variety to particle shapes
      stroke: {
        width: 0
      }
    },
    opacity: {
      value: 0.5,
      random: true,  // Random opacity for depth effect
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 4,
      random: true,  // Random size for added visual interest
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.3,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 120,  // Shorter links for a tighter effect
      color: "#c3c3c3",
      opacity: 0.3,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,  // Faster movement speed for a more dynamic feel
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: ["grab", "bubble"],  // Hover effects to engage users
        parallax: {
          enable: true,
          force: 60,
          smooth: 10
        }
      },
      onclick: {
        enable: true,
        mode: "repulse"  // Repulse effect on click for interactivity
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 0.5
        }
      },
      bubble: {
        distance: 150,
        size: 10,
        duration: 2,
        opacity: 0.8,
        speed: 3
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  retina_detect: true
});


// Scroll Reveal Animations
const sr = ScrollReveal();

sr.reveal('.tilt', {
  delay: 100,
  distance: '50px',
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 100
});

sr.reveal('.about-us, .vision-section', {
  delay: 200,
  distance: '50px',
  easing: 'ease-in-out',
  origin: 'bottom',
});