/* ==========================================================================
   Portfolio Scripts - Aayush Kumar Yadav
   ========================================================================== */

// DOM Helper Selectors
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const root = document.documentElement;

// Current Year in Footer
const yearEl = $('#yr');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   Dynamic Typed Role Effect
   -------------------------------------------------------------------------- */
const roles = [
  'SOC analyst in the making',
  'threat hunting learner',
  'data science enthusiast',
  'full-stack developer'
];

(function initTyped() {
  const el = $('#typed');
  if (!el) return;

  let r = 0;
  let i = 0;
  let del = false;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) {
    el.textContent = roles[0];
    return;
  }

  function tick() {
    const w = roles[r];
    el.textContent = w.slice(0, i);

    if (!del && i === w.length) {
      del = true;
      return setTimeout(tick, 1500);
    }

    if (del && i === 0) {
      del = false;
      r = (r + 1) % roles.length;
    }

    i += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 70);
  }

  tick();
})();

/* --------------------------------------------------------------------------
   Scroll Progress Indicator Bar
   -------------------------------------------------------------------------- */
window.addEventListener('scroll', () => {
  const bar = $('#bar');
  if (!bar) return;
  const h = document.documentElement;
  const total = h.scrollHeight - h.clientHeight;
  const progress = total > 0 ? (h.scrollTop / total) * 100 : 0;
  bar.style.width = progress + '%';
}, { passive: true });

/* --------------------------------------------------------------------------
   Copy Email to Clipboard
   -------------------------------------------------------------------------- */
const copyEmailBtn = $('#copy');
if (copyEmailBtn) {
  copyEmailBtn.onclick = async () => {
    try {
      await navigator.clipboard.writeText('aayushyadav2051@gmail.com');
      show('Email copied.');
    } catch (e) {
      show('Copy failed. Email: aayushyadav2051@gmail.com');
    }
  };
}

/* --------------------------------------------------------------------------
   Theme & Accent Color Preferences (with localStorage persistence)
   -------------------------------------------------------------------------- */
const ls = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }
};

if (ls.get('theme')) root.dataset.theme = ls.get('theme');
if (ls.get('accent')) root.dataset.accent = ls.get('accent');

const themeBtn = $('#theme');
if (themeBtn) {
  themeBtn.onclick = () => {
    const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = t;
    ls.set('theme', t);
  };
}

const ac = ['violet', 'cyan', 'lime'];
const accentBtn = $('#accent');
if (accentBtn) {
  accentBtn.onclick = () => {
    const a = ac[(ac.indexOf(root.dataset.accent) + 1) % ac.length];
    root.dataset.accent = a;
    ls.set('accent', a);
  };
}

/* --------------------------------------------------------------------------
   Mobile Navigation Menu
   -------------------------------------------------------------------------- */
const menu = $('#menu');
const bg = $('#burger');

if (bg && menu) {
  bg.onclick = () => {
    const isHidden = menu.classList.toggle('hidden');
    menu.classList.toggle('flex', !isHidden);
    bg.setAttribute('aria-expanded', String(!isHidden));
  };

  $$('#menu a').forEach((a) => {
    a.onclick = () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
      bg.setAttribute('aria-expanded', 'false');
    };
  });
}

/* --------------------------------------------------------------------------
   Scroll-Spy Navigation (IntersectionObserver)
   -------------------------------------------------------------------------- */
const links = $$('.nav a');
const secs = $$('main section');

if (links.length && secs.length && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((l) =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id)
        );
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secs.forEach((s) => spy.observe(s));
}

/* --------------------------------------------------------------------------
   Certificates Data & Lightbox Modal
   -------------------------------------------------------------------------- */
const CERTS = [
  {
    t: 'Exploring Networking with Cisco Packet Tracer',
    m: 'Cisco Networking Academy, 13 Oct 2026',
    d: 'Completed the Cisco Networking Academy course on building and exploring networks in Cisco Packet Tracer.',
    img: 'assets/certificates/cisco-packet-tracer.jpg'
  },
  {
    t: 'AI & Machine Learning Vocational Training',
    m: 'Aimaxa Tech, 01 to 28 Jul 2026',
    d: 'One month of vocational training in Artificial Intelligence and Machine Learning, with the assigned project completed on time.',
    img: 'assets/certificates/aimaxa-ai-ml.jpg'
  },
  {
    t: 'Learn Java',
    m: 'IBM SkillsBuild, 09 Oct 2025, 25 learning hours',
    d: 'Completion certificate for the IBM SkillsBuild Learn Java course.',
    img: 'assets/certificates/ibm-learn-java.jpg'
  },
  {
    t: 'ReactNext Workshop',
    d: 'Hands-on workshop covering modern front-end development with React and Next.js.'
  },
  {
    t: 'Flutter Workshop',
    d: 'Practical training in building cross-platform applications using Flutter and Dart.'
  },
  {
    t: 'Campus to Corporate',
    d: 'Career-readiness program focused on industry expectations and professional skills.'
  }
];

function drawCerts() {
  const certsContainer = $('#certs');
  if (!certsContainer) return;

  certsContainer.innerHTML = CERTS.map(
    (c, i) => `
    <article class='glass p-5 flex flex-col ${c.img ? 'cert-click' : ''}' ${
      c.img ? `data-i='${i}' role='button' tabindex='0' aria-label='Open ${c.t} certificate'` : ''
    }>
      <h3 class='font-semibold'>${c.t}</h3>
      ${c.m ? `<div class='text-xs mt-1' style='color:var(--a)'>${c.m}</div>` : ''}
      <p class='text-sm mu mt-2 flex-1'>${c.d}</p>
      <div class='flex gap-4 mt-4 text-sm'>
        ${c.img ? `<span class='font-semibold' style='color:var(--a)'>View certificate</span>` : ''}
        ${c.l ? `<a class='hover:text-[var(--a)]' href='${c.l}' target='_blank' rel='noopener'>Verify online</a>` : ''}
      </div>
    </article>`
  ).join('');
}
drawCerts();

const lb = $('#lb');
const lbImg = $('#lbimg');

function openCert(el) {
  if (!lb || !lbImg) return;
  const c = CERTS[+el.dataset.i];
  if (!c || !c.img) return;
  lbImg.src = c.img;
  lbImg.alt = c.t + ' certificate';
  lb.classList.add('open');
}

const certsEl = $('#certs');
if (certsEl) {
  certsEl.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const el = e.target.closest('.cert-click');
    if (el) openCert(el);
  });

  certsEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const el = e.target.closest('.cert-click');
      if (el) {
        e.preventDefault();
        openCert(el);
      }
    }
  });
}

if (lb) {
  lb.onclick = () => lb.classList.remove('open');
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lb.classList.remove('open');
  });
}

/* --------------------------------------------------------------------------
   Project Filtering Logic
   -------------------------------------------------------------------------- */
$$('.filter').forEach((b) => {
  b.onclick = () => {
    $$('.filter').forEach((x) => x.classList.toggle('on', x === b));
    $$('.proj').forEach((p) => {
      const categoryMatches =
        b.dataset.f === 'all' ||
        (p.dataset.c && p.dataset.c.split(' ').includes(b.dataset.f));
      p.classList.toggle('hide', !categoryMatches);
    });
  };
});

/* --------------------------------------------------------------------------
   Toast Notification Utility
   -------------------------------------------------------------------------- */
const toast = $('#toast');
let toastTimer;

function show(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* --------------------------------------------------------------------------
   Contact Form Submission & Options
   -------------------------------------------------------------------------- */
// Optional: paste a Formspree (or similar) endpoint here when you host the site
const FORM_ENDPOINT = '';
const sendBtn = $('#send');

if (sendBtn) {
  sendBtn.onclick = async () => {
    const nameInput = $('#n');
    const emailInput = $('#e');
    const msgInput = $('#m');

    const n = nameInput ? nameInput.value.trim() : '';
    const e = emailInput ? emailInput.value.trim() : '';
    const m = msgInput ? msgInput.value.trim() : '';

    if (!n || !/^\S+@\S+\.\S+$/.test(e) || !m) {
      show('Add your name, a valid email and a message.');
      return;
    }

    const to = 'aayushyadav2051@gmail.com';
    const sub = 'Portfolio message from ' + n;
    const txt = m + '\n\nFrom: ' + n + ' (' + e + ')';
    const btn = sendBtn;

    if (FORM_ENDPOINT) {
      btn.disabled = true;
      try {
        const r = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({ name: n, email: e, message: m })
        });
        if (r.ok) {
          btn.disabled = false;
          show('Message sent. Thanks, ' + n.split(' ')[0] + '!');
          ['#n', '#e', '#m'].forEach((s) => {
            const field = $(s);
            if (field) field.value = '';
          });
          return;
        }
      } catch (x) {}
      btn.disabled = false;
      show('Could not send directly. Use one of the options below.');
    } else {
      show('Your message is ready. Choose how to send it below.');
    }

    const mailtoLink = $('#mailto');
    const gmailLink = $('#gmail');
    const copyMsgBtn = $('#copymsg');
    const sendOpts = $('#sendopts');

    if (mailtoLink) {
      mailtoLink.href = 'mailto:' + to + '?subject=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(txt);
    }
    if (gmailLink) {
      gmailLink.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + to + '&su=' + encodeURIComponent(sub) + '&body=' + encodeURIComponent(txt);
    }
    if (copyMsgBtn) {
      copyMsgBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(txt);
          show('Message copied.');
        } catch (x) {
          show('Copy failed. Email ' + to);
        }
      };
    }
    if (sendOpts) {
      sendOpts.classList.remove('hidden');
    }
  };
}
