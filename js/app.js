// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form Validation
document.querySelector("form").addEventListener("submit", function (e) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  let formIsValid = true;

  if (!name.value.trim()) {
    formIsValid = false;
    alert("Please enter your name.");
  }

  if (!email.value.trim() || !validateEmail(email.value)) {
    formIsValid = false;
    alert("Please enter a valid email address.");
  }

  if (!message.value.trim()) {
    formIsValid = false;
    alert("Please enter a message.");
  }

  if (!formIsValid) {
    e.preventDefault(); // Stop form from submitting
  }
});

// Email Validation Function
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}

// Sticky Navigation Bar
window.addEventListener("scroll", function () {
  const header = document.querySelector(".main-header");
  const hero = document.querySelector(".hero");
  const sticky = hero.offsetHeight;

  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

const hero = document.querySelector(".hero");
const reveal = document.createElement("div");
reveal.classList.add("hover-reveal");
hero.appendChild(reveal);

let clipPathPositions = []; // Store all previous hover areas
let currentClipPath = ""; // Track the current mouse hover area

// Add event listener for mousemove to track the cursor's position
hero.addEventListener("mousemove", function (e) {
  const rect = hero.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // Store the current circle's position based on the mouse move
  currentClipPath = `circle(15% at ${x}px ${y}px)`;

  // Join the current hover area with previously hovered areas
  reveal.style.clipPath = [...clipPathPositions, currentClipPath].join(", ");
});

// Store the position permanently when the user clicks
hero.addEventListener("click", function () {
  // Add the current hover area to the list of permanently visible clip paths
  clipPathPositions.push(currentClipPath);
});
