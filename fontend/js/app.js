import { ModuleManager } from './core/moduleManager.js';
import { Router } from './core/router.js';
import { qs, qsa } from './core/dom.js';
import { ui } from './core/ui.js';
import { authService } from './services/authService.js';

import { DashboardModule } from './modules/dashboard.js';
import { ListeningModule } from './modules/listening.js';
import { LoginModule } from './modules/auth/login.js';
import { RegisterModule } from './modules/auth/register.js';
import { ProfileModule } from './modules/auth/profile.js';

const NAV_SELECTOR = '.nav-item';
const CONTENT_SELECTOR = '#content-area';

export class App {
  constructor() {
    this.container = ui.mount(CONTENT_SELECTOR);
    this.navItems = qsa(NAV_SELECTOR);

    this.moduleManager = new ModuleManager({
      container: this.container,
      modules: {
        dashboard: DashboardModule,
        listening: ListeningModule,
        login: LoginModule,
        register: RegisterModule,
        profile: ProfileModule,
      },
      defaultModule: 'dashboard',
    });

    this.router = new Router({
      defaultRoute: 'dashboard',
      onRouteChange: (route) => this.renderRoute(route),
    });

    this._attachNavEvents();
    this._syncNavWithAuth();

    this.router.start();
  }

  _attachNavEvents() {
    this.navItems.forEach((nav) => {
      nav.addEventListener('click', (event) => {
        event.preventDefault();
        const skill = nav.dataset.skill;
        this.router.navigate(skill);
      });
    });

    const logo = qs('.logo');
    if (logo) {
      logo.addEventListener('click', (event) => {
        event.preventDefault();
        this.router.navigate('dashboard');
      });
    }
  }

  _syncNavWithAuth() {
    const isAuth = authService.isAuthenticated();
    const loginNav = qs('[data-skill="login"]');
    const registerNav = qs('[data-skill="register"]');
    const profileNav = qs('[data-skill="profile"]');
    const logoutNav = qs('[data-skill="logout"]');

    const show = (el) => el && el.classList.remove('hidden');
    const hide = (el) => el && el.classList.add('hidden');

    if (isAuth) {
      hide(loginNav);
      hide(registerNav);
      show(profileNav);
      show(logoutNav);
    } else {
      show(loginNav);
      show(registerNav);
      hide(profileNav);
      hide(logoutNav);
    }
  }

  renderRoute(route) {
    if (route === 'logout') {
      authService.logout();
      this._syncNavWithAuth();
      this.router.navigate('login');
      return;
    }

    this.moduleManager.load(route, {
      navigate: (target) => this.router.navigate(target),
    });

    this.navItems.forEach((nav) => {
      ui.toggleClass(nav, 'active', nav.dataset.skill === route);
    });

    this._syncNavWithAuth();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new App();
});
