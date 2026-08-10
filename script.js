(function () {
  'use strict';

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

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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

  function initFilterControls() {
    var buttons = document.querySelectorAll('.filter-pill');
    var cards = document.querySelectorAll('.work-card, .blog-card');

    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');

        buttons.forEach(function (item) {
          item.classList.toggle('is-active', item === button);
        });

        cards.forEach(function (card) {
          var cardCategory = card.getAttribute('data-category') || 'all';
          var shouldShow = filter === 'all' || cardCategory === filter;
          card.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
  }

  function initPricingToggle() {
    var buttons = document.querySelectorAll('.pricing-toggle button');
    var priceEls = document.querySelectorAll('.pricing-card__price');

    if (!buttons.length || !priceEls.length) return;

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var mode = button.getAttribute('data-mode');

        buttons.forEach(function (item) {
          item.classList.toggle('is-active', item === button);
        });

        priceEls.forEach(function (priceEl) {
          var value = priceEl.getAttribute(mode === 'yearly' ? 'data-yearly' : 'data-monthly');
          if (value) {
            priceEl.innerHTML = '<strong>' + value + '</strong><small>' + (mode === 'yearly' ? 'Billed annually' : 'Billed monthly') + '</small>';
          }
        });
      });
    });
  }

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

  document.addEventListener('DOMContentLoaded', function () {
    initFadeAnimations();
    initSignupForm();
    initCardHoverGlow();
    initMainNav();
    initActiveNavLink();
    initFilterControls();
    initPricingToggle();
    initFormspreeForms();
    initOrderForm();
  });
})();
