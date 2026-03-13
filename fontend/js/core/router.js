export class Router {
  constructor({ defaultRoute = 'dashboard', onRouteChange } = {}) {
    this.defaultRoute = defaultRoute;
    this.onRouteChange = onRouteChange;
    this.current = null;
  }

  navigate(route) {
    const normalized = (route || this.defaultRoute).toString().trim() || this.defaultRoute;
    this.current = normalized;

    window.history.pushState({ route: normalized }, '', `#${normalized}`);
    if (typeof this.onRouteChange === 'function') {
      this.onRouteChange(normalized);
    }
  }

  start() {
    const initial = (window.location.hash || `#${this.defaultRoute}`).slice(1);
    this.navigate(initial);

    window.addEventListener('popstate', (event) => {
      const route = (event.state && event.state.route) || (window.location.hash || `#${this.defaultRoute}`).slice(1);
      this.navigate(route);
    });
  }
}
