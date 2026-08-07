/* ============================================================
   Avolo — Coming Soon Landing Page
   Vanilla JavaScript
   ============================================================ */

(function () {
  'use strict';

  // --- Fade-in on scroll / load ---
  function initFadeAnimations() {
    var fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );

      fadeElements.forEach(function (el) { observer.observe(el); });
    } else {
      fadeElements.forEach(function (el) { el.classList.add('is-visible'); });
    }
  }

  // --- Email signup form ---
  function initSignupForm() {
    var form = document.getElementById('signup-form');
    var input = document.getElementById('email-input');
    var btn = document.getElementById('notify-btn');
    var confirmation = document.getElementById('signup-confirmation');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = input.value.trim();
      if (!email || !isValidEmail(email)) {
        shakeElement(input);
        return;
      }

      btn.disabled = true;
      btn.querySelector('.signup__btn-text').textContent = 'Sending…';

      setTimeout(function () {
        confirmation.classList.add('is-visible');
        input.value = '';
        btn.querySelector('.signup__btn-text').textContent = 'Notify Me';
        btn.disabled = false;

        form.querySelector('.signup__wrapper').style.opacity = '0.5';
        form.querySelector('.signup__wrapper').style.pointerEvents = 'none';
      }, 800);
    });
  }

  // --- Email validation ---
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --- Shake animation for invalid input ---
  function shakeElement(el) {
    el.style.transition = 'transform 0.08s ease';
    var shakes = [6, -6, 4, -4, 2, 0];
    var i = 0;

    function nextShake() {
      if (i < shakes.length) {
        el.style.transform = 'translateX(' + shakes[i] + 'px)';
        i++;
        setTimeout(nextShake, 80);
      } else {
        el.style.transform = '';
      }
    }

    nextShake();
  }

  // --- Card hover glow effect (mouse tracking) ---
  function initCardHoverGlow() {
    var cards = document.querySelectorAll('.card');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initSignupForm();
    initCardHoverGlow();
  });
})();
