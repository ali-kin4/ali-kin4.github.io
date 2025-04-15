// ==============================
// Google Analytics (gtag) Setup
// ==============================
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-PF85DJLT1P');


// ==============================
// Footer Year Update
// ==============================
document.getElementById('year').textContent = new Date().getFullYear();


// ==============================
// Fade-In Animation using IntersectionObserver
// ==============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section, .subject-card, .step, .resource-card').forEach((el) => {
  el.classList.add('fade');
  observer.observe(el);
});


// ==============================
// Subjects Slider Functionality
// ==============================
const slider = document.querySelector('.subjects-slider');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let autoScrollInterval;

function scrollToNext() {
  const cardWidth = slider.querySelector('.subject-card').offsetWidth + 32; // card width plus gap
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - cardWidth) {
    slider.scrollTo({ left: 0, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
}

function scrollToPrev() {
  const cardWidth = slider.querySelector('.subject-card').offsetWidth + 32;
  if (slider.scrollLeft === 0) {
    slider.scrollTo({ left: slider.scrollWidth, behavior: 'smooth' });
  } else {
    slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }
}

nextBtn.addEventListener('click', () => {
  clearInterval(autoScrollInterval);
  scrollToNext();
  startAutoScroll();
});

prevBtn.addEventListener('click', () => {
  clearInterval(autoScrollInterval);
  scrollToPrev();
  startAutoScroll();
});

function startAutoScroll() {
  autoScrollInterval = setInterval(scrollToNext, 4000); // Auto-scroll every 4 seconds
}
startAutoScroll();


// ==============================
// Back-To-Top Button Functionality
// ==============================
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});


// ==============================
// PayPal Button Integration
// ==============================
paypal.Buttons({
  style: {
    shape: 'pill',
    color: 'blue',
    layout: 'vertical',
    label: 'paypal'
  },
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        description: "1-on-1 Tutoring: Machine Learning & AI",
        amount: {
          value: '60.00'
        }
      }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert('✅ Payment completed by ' + details.payer.name.given_name + '!');
      // Optional redirect:
      // window.location.href = "/thank-you.html";
    });
  }
}).render('#paypal-button-container-ml');
