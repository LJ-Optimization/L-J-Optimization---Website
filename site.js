/* L&J Optimization — site.js
   Alt hvad sitet har af JavaScript. Ingen afhængigheder. */

(function () {
  'use strict';

  /* --- År i footeren --- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* --- Header: skygge når man scroller --- */
  var header = document.querySelector('.site-header');
  if (header) {
    var stick = function () {
      header.setAttribute('data-stuck', window.scrollY > 8 ? 'true' : 'false');
    };
    stick();
    window.addEventListener('scroll', stick, { passive: true });
  }

  /* --- Mobilmenu --- */
  var burger = document.querySelector('.burger');
  var nav = document.getElementById('hovedmenu');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      burger.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.setAttribute('data-open', 'false');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        nav.setAttribute('data-open', 'false');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- Reveal ved scroll --- */
  var revealables = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (revealables.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      revealables.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
      revealables.forEach(function (el) { io.observe(el); });
    }
  }

  /* --- Før/efter-skyder --- */
  document.querySelectorAll('.compare').forEach(function (box) {
    var range = box.querySelector('.compare__range');
    if (!range) return;
    var set = function () { box.style.setProperty('--pos', range.value + '%'); };
    range.addEventListener('input', set);
    set();
  });

  /* --- Vægtmåler: hvad vejer denne side rent faktisk? --- */
  var weight = document.querySelector('[data-weight]');
  if (weight && window.performance && performance.getEntriesByType) {
    var report = function () {
      try {
        var navEntry = performance.getEntriesByType('navigation')[0];
        var bytes = navEntry ? (navEntry.transferSize || 0) : 0;
        performance.getEntriesByType('resource').forEach(function (r) {
          bytes += r.transferSize || 0;
        });
        var ms = navEntry ? navEntry.domContentLoadedEventEnd : 0;
        if (!bytes || !ms) { weight.hidden = true; return; }
        var kb = Math.round(bytes / 1024);
        var sec = (ms / 1000).toFixed(2).replace('.', ',');
        weight.textContent = 'Denne side: ' + kb + ' KB · klar på ' + sec + ' s';
        weight.hidden = false;
      } catch (err) {
        weight.hidden = true;
      }
    };
    if (document.readyState === 'complete') { setTimeout(report, 120); }
    else { window.addEventListener('load', function () { setTimeout(report, 120); }); }
  } else if (weight) {
    weight.hidden = true;
  }

  /* --- Formular: send uden at forlade siden (virker også uden JS) --- */
  var form = document.querySelector('form.lead-form');
  if (form) {
    var status = form.querySelector('.form__status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sender …';

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.setAttribute('data-state', 'ok');
        status.textContent = 'Tak. Vi har din besked og vender tilbage inden for en hverdag.';
        btn.textContent = 'Sendt';
      }).catch(function () {
        status.setAttribute('data-state', 'error');
        status.textContent = 'Beskeden gik ikke igennem. Ring til os på 12 34 56 78, eller skriv til hej@ljoptimization.dk.';
        btn.disabled = false;
        btn.textContent = original;
      });
    });
  }
})();
