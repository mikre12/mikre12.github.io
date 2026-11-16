/* =========================================================
   Mikre Hailemariam — portfolio behaviour (no dependencies)
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  /* ---------- footer year ---------- */
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- nav: scrolled state, progress bar, mobile menu ---------- */
  var nav = $('#nav'), bar = $('#progress');
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  var burger = $('#burger'), links = $('#links');
  function closeMenu() { if (!links) return; links.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  if (burger) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', links).forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* highlight the current section in the nav */
  if ('IntersectionObserver' in window) {
    var secs = $$('main section[id]');
    var navMap = {};
    $$('a[href^="#"]', links).forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && navMap[en.target.id]) {
          Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove('on'); });
          navMap[en.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- typed roles ---------- */
  var typed = $('#typed');
  if (typed) {
    var roles = ['Network Security Engineer', 'Full-Stack Developer', 'Pen-Testing Automation', 'UI/UX & Graphic Designer'];
    if (reduceMotion) { typed.textContent = roles[0]; }
    else {
      var ri = 0, ci = 0, del = false;
      (function tick() {
        var word = roles[ri];
        typed.textContent = word.slice(0, ci);
        var wait = del ? 28 : 62;
        if (!del && ci === word.length) { del = true; wait = 1700; }
        else if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; wait = 90; }
        else { ci += del ? -1 : 1; }
        setTimeout(tick, wait);
      })();
    }
  }

  /* ---------- projects ---------- */
  var CAT = { security: 'Security', research: 'Research', web: 'Web & design' };
  var STATUS = { 'planned': 'Planned', 'in-progress': 'In progress', 'completed': 'Completed' };
  var projects = (window.PROJECTS || []).slice();
  var grid = $('#projGrid'), roadmap = $('#roadmap');

  function linkHTML(p) {
    var l = p.links || {}, out = [];
    if (l.repo) out.push('<a href="' + esc(l.repo) + '" target="_blank" rel="noopener">Code ↗</a>');
    if (l.demo) out.push('<a href="' + esc(l.demo) + '" target="_blank" rel="noopener">Live demo ↗</a>');
    if (l.writeup) {
      var ext = /^https?:/i.test(l.writeup);
      out.push('<a href="' + esc(l.writeup) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + (ext ? 'Write-up ↗' : 'Read the paper ↓') + '</a>');
    }
    if (!out.length) {
      out.push('<span class="later">' + (p.status === 'completed' ? 'Repository not public' : 'Repo opens when shipped') + '</span>');
    }
    return out.join('');
  }

  function renderProjects() {
    if (!grid) return;
    grid.innerHTML = projects.map(function (p) {
      var when = p.status === 'completed' ? (p.year || '') : (p.eta || '');
      return '' +
        '<article class="card proj is-' + esc(p.status) + ' reveal" data-cat="' + esc(p.category) + '">' +
          '<div class="proj-top"><span class="cat">' + esc(CAT[p.category] || p.category) + '</span>' +
          '<span class="st st-' + esc(p.status) + '">' + esc(STATUS[p.status] || p.status) + (when ? ' · ' + esc(when) : '') + '</span></div>' +
          '<h3>' + esc(p.title) + '</h3>' +
          '<p>' + esc(p.summary) + '</p>' +
          (p.highlights && p.highlights.length ? '<ul class="bullets">' + p.highlights.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul>' : '') +
          (p.result ? '<p class="meta"><b>Result:</b> ' + esc(p.result) + '</p>' : '') +
          '<ul class="tags">' + (p.stack || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>' +
          '<div class="proj-foot">' + linkHTML(p) + '</div>' +
        '</article>';
    }).join('');
  }

  function renderRoadmap() {
    if (!roadmap) return;
    var upcoming = projects.filter(function (p) { return p.status !== 'completed' && p.month; });
    var months = {};
    upcoming.forEach(function (p) { (months[p.month] = months[p.month] || { eta: p.eta, items: [] }).items.push(p.title); });
    var keys = Object.keys(months).sort();
    if (!keys.length) { roadmap.style.display = 'none'; return; }
    roadmap.style.setProperty('--cols', keys.length);
    roadmap.innerHTML = keys.map(function (k) {
      return '<div class="rm"><b>' + esc(months[k].eta) + '</b>' + months[k].items.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>';
    }).join('');
  }

  renderRoadmap(); renderProjects();

  $$('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      $$('.chip').forEach(function (c) { var on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-selected', on ? 'true' : 'false'); });
      $$('.proj', grid).forEach(function (card) {
        card.classList.toggle('hide', !(f === 'all' || card.getAttribute('data-cat') === f));
      });
    });
  });

  /* ---------- scroll reveal (after dynamic content exists) ---------- */
  var reveals = $$('.reveal');
  reveals.forEach(function (el) {
    var sibs = $$(':scope > .reveal', el.parentElement);
    var i = sibs.indexOf(el);
    el.style.setProperty('--d', Math.min(i * 0.07, 0.35) + 's');
  });
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- CV links: grey out until the PDFs exist ---------- */
  if (location.protocol.indexOf('http') === 0) {
    $$('[data-cv]').forEach(function (a) {
      fetch(a.getAttribute('href'), { method: 'HEAD' }).then(function (r) {
        if (!r.ok) a.classList.add('soon');
      }).catch(function () {});
    });
  }

  /* ---------- contact ---------- */
  var EMAIL = 'mikrehaile321@gmail.com';
  var copy = $('#copyMail');
  if (copy) copy.addEventListener('click', function () {
    var done = function () { copy.textContent = 'Copied'; setTimeout(function () { copy.textContent = 'Copy'; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(EMAIL).then(done, done);
    else {
      var t = document.createElement('textarea'); t.value = EMAIL; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(t); done();
    }
  });

  var form = $('#contactForm');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    ['name', 'email', 'message'].forEach(function (n) {
      var el = f[n], bad = !el.value.trim() || (n === 'email' && !/^\S+@\S+\.\S+$/.test(el.value));
      el.classList.toggle('invalid', bad); if (bad) ok = false;
    });
    if (!ok) { $('#formNote').textContent = 'Please fill in all three fields with a valid email.'; return; }
    var subject = 'Portfolio message from ' + f.name.value.trim();
    var body = f.message.value.trim() + '\n\n— ' + f.name.value.trim() + ' (' + f.email.value.trim() + ')';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    $('#formNote').textContent = 'Opening your email app…';
  });

  /* ---------- cursor glow ---------- */
  var glow = $('#glow');
  if (glow && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    window.addEventListener('pointermove', function (e) {
      glow.style.opacity = '1';
      glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    }, { passive: true });
    document.addEventListener('pointerleave', function () { glow.style.opacity = '0'; });
  }

  /* ---------- network canvas background ---------- */
  var cv = $('#net');
  if (cv && cv.getContext) {
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), nodes = [], raf = 0;
    var COLORS = ['230,185,74', '139,92,246', '201,206,217'];
    function size() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(28, Math.min(70, Math.round(W / 20)));
      nodes = [];
      for (var i = 0; i < n; i++) nodes.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
        r: Math.random() * 1.4 + .6, c: COLORS[i % COLORS.length]
      });
    }
    function frame(move) {
      ctx.clearRect(0, 0, W, H);
      var i, j, a, b, dx, dy, d, max = 140;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (move) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < -10) a.x = W + 10; else if (a.x > W + 10) a.x = -10;
          if (a.y < -10) a.y = H + 10; else if (a.y > H + 10) a.y = -10;
        }
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < max * max) {
            ctx.strokeStyle = 'rgba(' + a.c + ',' + (0.16 * (1 - Math.sqrt(d) / max)).toFixed(3) + ')';
            ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = 'rgba(' + a.c + ',.7)'; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.2832); ctx.fill();
      }
    }
    function loop() { frame(true); raf = requestAnimationFrame(loop); }
    size();
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduceMotion) frame(false); }, 150); });
    if (reduceMotion) frame(false);
    else {
      loop();
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) cancelAnimationFrame(raf); else { cancelAnimationFrame(raf); loop(); }
      });
    }
  }

  /* ---------- mini terminal ---------- */
  var fab = $('#termFab'), panel = $('#termPanel'), log = $('#termLog'), tform = $('#termForm'), tin = $('#termInput'), tclose = $('#termClose');
  var greeted = false;
  function print(html) { var d = document.createElement('div'); d.innerHTML = html; log.appendChild(d); log.scrollTop = log.scrollHeight; }
  function openTerm() {
    panel.hidden = false; fab.setAttribute('aria-expanded', 'true');
    if (!greeted) { greeted = true; print('<span class="k">Welcome.</span> Type <span class="k">help</span> to see what I can do.\n'); }
    tin.focus();
  }
  function closeTerm() { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.focus(); }
  var CMDS = {
    help: function () { return 'Commands:\n  about      who I am\n  skills     what I work with\n  research   what I study\n  projects   what I am building\n  contact    how to reach me\n  goto <x>   jump to a section (about, research, projects, skills, journey, contact)\n  clear      clear the screen\n  exit       close the terminal'; },
    whoami: function () { return 'mikre hailemariam sahle: network security engineer, full-stack developer.'; },
    about: function () { return 'MSc IT (Network Security) scholar at Gujarat University on the ICCR India–Africa Maitri Scholarship. I design secure networks, automate pen testing in Python and build the web products around them.'; },
    skills: function () { return 'Security: network design, pen-testing automation, Python, cryptography, biometrics\nDev: React, Node.js, SQL, JavaScript, Tailwind\nDesign: Figma, UI/UX, graphic design, digital marketing'; },
    research: function () { return 'Explainable phishing detection for Amharic–English messaging (mBERT / XLM-R with SHAP and LIME).\nPublished: "Tracing Authenticity: A Blockchain and NFT-Based Approach to Product Verification", IJSDR, May 2023.'; },
    projects: function () {
      return projects.map(function (p) { return '• ' + p.title + ' [' + (STATUS[p.status] || p.status) + (p.eta ? ', ' + p.eta : '') + ']'; }).join('\n');
    },
    contact: function () { return 'Email   ' + EMAIL + '\nGitHub  github.com/mikre12\nLinkedIn  linkedin.com/in/mikre-hailemariam-s-645a91205'; },
    sudo: function () { return 'Nice try. This site is read-only. 🙂'; },
    ls: function () { return 'about/  research/  projects/  skills/  journey/  contact/'; },
    clear: function () { log.innerHTML = ''; return null; },
    exit: function () { closeTerm(); return null; }
  };
  function run(raw) {
    var line = raw.trim(); if (!line) return;
    print('<span class="u"><span class="g">$</span> ' + esc(line) + '</span>');
    var parts = line.split(/\s+/), cmd = parts[0].toLowerCase(), out;
    if (cmd === 'goto' || cmd === 'cd') {
      var t = (parts[1] || '').replace(/[\/~]/g, '').toLowerCase();
      var target = t && document.getElementById(t);
      if (target && target.tagName === 'SECTION') { print('Jumping to ' + esc(t) + '…'); closeTerm(); target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }); }
      else print('No such section. Try: about, research, projects, skills, journey, contact');
      return;
    }
    if (CMDS[cmd]) { out = CMDS[cmd](); if (out) print(esc(out) + '\n'); }
    else print('command not found: ' + esc(cmd) + '. Type <span class="k">help</span>.\n');
  }
  if (fab && panel) {
    fab.addEventListener('click', function () { panel.hidden ? openTerm() : closeTerm(); });
    tclose.addEventListener('click', closeTerm);
    tform.addEventListener('submit', function (e) { e.preventDefault(); run(tin.value); tin.value = ''; });
    document.addEventListener('keydown', function (e) {
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (e.key === '`' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); panel.hidden ? openTerm() : closeTerm(); }
      else if (e.key === 'Escape' && !panel.hidden) closeTerm();
    });
  }
})();
