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

  // --- Main nav behavior ---
  function initMainNav() {
    var navToggle = document.querySelector('.nav__toggle');
    var navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      navMenu.classList.toggle('nav__menu--open', !expanded);
    });

    navMenu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav__menu--open');
      });
    });
  }

  // --- Highlight current page link ---
  function initActiveNavLink() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '') {
      path = 'index.html';
    }

    document.querySelectorAll('.nav__link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (href === 'index.html' && path === 'index.html')) {
        link.classList.add('is-active');
      }
    });
  }

  // --- Formspree AJAX submission ---
  function initFormspreeForms() {
    var forms = document.querySelectorAll('.js-formspree');

    forms.forEach(function (form) {
      var statusEl = form.querySelector('.form__status');
      if (!statusEl) return;

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var action = form.action;
        if (!action || action.indexOf('YOUR_FORM_ID') !== -1) {
          statusEl.textContent = 'Please replace YOUR_FORM_ID in the form action with your Formspree form ID.';
          statusEl.classList.remove('is-success');
          return;
        }

        var formData = new FormData(form);
        statusEl.textContent = 'Sending...';

        fetch(action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        })
          .then(function (response) {
            if (response.ok) {
              form.reset();
              statusEl.textContent = '✓ Message sent. We will contact you soon.';
              statusEl.classList.add('is-success');
            } else {
              return response.json().then(function (data) {
                throw new Error(data.error || 'Submission failed');
              });
            }
          })
          .catch(function () {
            statusEl.textContent = 'Something went wrong. Please try again or email hello@avolo.in.';
            statusEl.classList.remove('is-success');
          });
      });
    });
  }

  function getQueryParameter(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function updateWhatsAppLink() {
    var link = document.getElementById('whatsapp-link');
    if (!link) return;

    var select = document.getElementById('service-interested');
    var service = select ? select.options[select.selectedIndex].text : 'a service';
    var message = 'Hi, I\'m interested in ' + service + ' for my business.';
    link.setAttribute('href', 'https://wa.me/917328060281?text=' + encodeURIComponent(message));
  }

  function initOrderForm() {
    var select = document.getElementById('service-interested');
    if (!select) return;

    var service = getQueryParameter('service');
    if (service) {
      var option = select.querySelector('option[value="' + service + '"]');
      if (option) {
        select.value = service;
      }
    }

    select.addEventListener('change', updateWhatsAppLink);
    updateWhatsAppLink();
  }

  // --- Initialize ---
  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initSignupForm();
    initCardHoverGlow();
    initMainNav();
    initActiveNavLink();
    initFormspreeForms();
    initOrderForm();
  });
})();
