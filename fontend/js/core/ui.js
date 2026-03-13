import { qs, qsa } from './dom.js';

export const ui = {
  mount: (selector) => qs(selector),

  clear: (container) => {
    if (!container) return;
    while (container.firstChild) container.removeChild(container.firstChild);
  },

  loadStyle: (href) => {
    if (!href) return;
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  },

  toggleClass: (el, className, condition) => {
    if (!el) return;
    if (condition) el.classList.add(className);
    else el.classList.remove(className);
  },

  on: (selector, event, handler, opts = {}) => {
    qs(selector)?.addEventListener(event, handler, opts);
  },

  onAll: (selector, event, handler, opts = {}) => {
    qsa(selector).forEach((el) => el.addEventListener(event, handler, opts));
  },
};
