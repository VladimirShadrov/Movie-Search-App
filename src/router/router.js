import { NotFound } from '../components/notFound.component';

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentComponent = null;

    window.addEventListener('popstate', () => this.setCurrentComponent());

    this.setCurrentComponent();
  }

  /**
   *
   * @returns Текущий путь в адресной строке
   */
  getCurrentRoutePath() {
    return window.location.pathname;
  }

  /**
   * Задает компонент для текущего роута
   */
  setCurrentComponent() {
    const path = this.getCurrentRoutePath();
    let route = this.routes.find((route) => route.path === path);

    if (!route) {
      route = {
        component: NotFound,
        rootElement: document.querySelector('.not-found-page'),
      };
    } else if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = new route.component({
      rootElement: route.rootElement,
      router: this,
    });
    this.render();
  }

  /**
   * Производит навигацию
   * @param {String} path - Путь
   */
  navigate(path) {
    if (path !== this.getCurrentRoutePath()) {
      window.history.pushState({}, '', path);
      this.setCurrentComponent();
    }
  }

  /**
   * Делает отрисовку контента при переключении роута
   */
  render() {
    document.body.innerHTML = '';
    document.body.append(this.currentComponent.element);
  }
}
