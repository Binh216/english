export class ModuleManager {
  constructor({ container, modules = {}, defaultModule = 'dashboard' } = {}) {
    this.container = container;
    this.modules = modules;
    this.defaultModule = defaultModule;
  }

  load(name, context = {}) {
    const moduleKey = name in this.modules ? name : this.defaultModule;
    const module = this.modules[moduleKey];

    if (!module || typeof module.render !== 'function') {
      throw new Error(`Module '${moduleKey}' is not valid or missing render()`);
    }

    this.container.innerHTML = module.render(context);

    if (typeof module.init === 'function') {
      module.init(context);
    }

    return moduleKey;
  }
}
